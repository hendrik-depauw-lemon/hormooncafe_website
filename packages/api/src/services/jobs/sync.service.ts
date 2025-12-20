import { EventInterface, Register, UUID } from '@boostercloud/framework-types';
import { groupBy } from 'lodash';
import { z, ZodEffects, ZodPipeline, ZodTypeAny } from 'zod';

import { FileCreated } from '../../modules/file/events/file-created';
import { S3StorageService } from '../storage/s3/s3-storage.service';
import { ProgressReportService } from './progress-report.service';

export abstract class SyncService<ExistingItemType extends { externalId?: string }> {
    protected abstract schema:
        | ZodEffects<ZodTypeAny, { externalId: string }>
        | ZodPipeline<
              ZodEffects<ZodTypeAny, { externalId: string }>,
              z.ZodObject<Record<string, ZodTypeAny>>
          >;

    constructor(
        private progressReportService: ProgressReportService,
        private register: Register,
    ) {}

    public static async sync<
        ExistingItemType extends { externalId?: string },
        T extends SyncService<ExistingItemType>,
    >(
        syncClass: new (progressReportService: ProgressReportService, register: Register) => T,
        register: Register,
        progressReportService: ProgressReportService,
        data?: string,
    ): Promise<void> {
        // Do not call `this` in this static method.
        const service = new syncClass(progressReportService, register);
        await service.syncHelper(data);
    }

    private async syncHelper(data?: string): Promise<void> {
        await this.progressReportService.start();

        const extractOutput = await this.extract(data);
        const events = await this.transform(extractOutput);
        await this.load(events);

        const summary = this.generateSummary(events);
        await this.progressReportService.complete(true, summary);
    }

    private generateSummary(events: EventInterface[][]): string {
        const groupedEvents = groupBy(events.flat(), (event) => event.constructor.name);
        const groupedEventsCounts = Object.entries(groupedEvents).reduce<Record<string, number>>(
            (acc, [eventName, events]) => {
                acc[eventName] = events.length;
                return acc;
            },
            {},
        );

        const content = Object.entries(groupedEventsCounts)
            .map(([eventName, numberOfEvents]) => `${eventName}: ${numberOfEvents}`)
            .join('\n');

        return content;
    }

    protected async extract(data?: string): Promise<z.infer<typeof this.schema>[]> {
        let externalData: unknown[] = [];

        externalData = await this.extractFromExternalSource(data);
        await this.progressReportService.updateTotalItems(externalData.length);

        const parsedData: z.infer<typeof this.schema>[] = [];
        for (const object of externalData) {
            const parsedObject = this.schema.safeParse(object);
            if (parsedObject.success) {
                parsedData.push(parsedObject.data);
            } else {
                await this.progressReportService.itemProcessed(
                    false,
                    `[Extract] Failed to parse ${JSON.stringify(object)}. Error: ${parsedObject.error.message}`,
                );
            }
        }

        return parsedData;
    }

    protected async transform(
        input: z.infer<typeof this.schema>[],
    ): Promise<Array<Array<EventInterface>>> {
        const existingItems = await this.getExistingItems(input);
        const events: Array<Array<EventInterface>> = [];

        for (const object of input) {
            const existingItem = existingItems.find(
                (existingItem) => existingItem.externalId === object.externalId,
            );

            if (!existingItem) {
                try {
                    const createEvents = await this.generateCreateEvents(object);
                    events.push(createEvents);
                } catch (error) {
                    await this.progressReportService.itemProcessed(
                        false,
                        `[Transform - create] Failed to generate create events for ${JSON.stringify(object)}. Error: ${(error as Error).message} ${(error as Error).stack}`,
                    );
                    continue;
                }
            } else {
                try {
                    const updateEvents = await this.generateUpdateEvents(object, existingItem);
                    events.push(updateEvents);
                } catch (error) {
                    await this.progressReportService.itemProcessed(
                        false,
                        `[Transform - update] Failed to generate update events for ${JSON.stringify(object)}. Error: ${(error as Error).message}`,
                    );
                    continue;
                }
            }
        }

        const inputExternalIds = new Set(input.map((item) => item.externalId));
        const removedExistingItems = existingItems.filter(
            (existingItem) =>
                !existingItem.externalId || !inputExternalIds.has(existingItem.externalId),
        );

        for (const existingItem of removedExistingItems) {
            try {
                const deleteEvents = await this.generateDeleteEvents(existingItem);
                events.push(deleteEvents);
            } catch (error) {
                await this.progressReportService.itemProcessed(
                    false,
                    `[Transform - delete] Failed to generate delete events for ${JSON.stringify(existingItem)}. Error: ${(error as Error).message}`,
                );
            }
        }

        return events;
    }

    protected async load(events: Array<Array<EventInterface>>): Promise<void> {
        for (const eventArray of events) {
            try {
                this.register.events(...eventArray);
                await this.register.flush();
                await this.progressReportService.itemProcessed(true);
            } catch (error) {
                await this.progressReportService.itemProcessed(
                    false,
                    `[Load] Failed to load events for ${JSON.stringify(eventArray)}. Error: ${(error as Error).message}`,
                );
            }
        }
    }

    protected async createNewFile(
        externalId: string,
        fileName: string,
        fromUrl: string,
        contentType?: string,
    ): Promise<{
        fileId: UUID;
        fileCreatedEvent: FileCreated;
    }> {
        const fileResponse = await fetch(fromUrl);
        if (!fileResponse.ok) throw new Error(`Failed to fetch file from URL: ${fromUrl}`);
        const fileBlob = await fileResponse.blob();

        const id = UUID.generate();
        const { signedUrl, fullPath } = await S3StorageService.getSignedUploadUrl({
            filename: `${id.toString()}${contentType?.includes('epub') ? '.epub' : ''}`,
            ...(contentType && { contentType: contentType }),
        });

        const putResponse = await fetch(signedUrl, {
            method: 'PUT',
            body: fileBlob,
        });
        if (!putResponse.ok) {
            throw new Error(`Failed to upload file to S3: ${putResponse.statusText}`);
        }

        return {
            fileId: id,
            fileCreatedEvent: new FileCreated({
                id: id,
                filename: fileName,
                storageKey: fullPath,
                contentType: fileBlob.type || undefined,
                externalId: externalId,
            }),
        };
    }

    protected abstract extractFromExternalSource(data?: string): Promise<unknown[]>;
    protected abstract getExistingItems(
        input: z.infer<typeof this.schema>[],
    ): Promise<ExistingItemType[]>;

    protected abstract generateCreateEvents(
        object: z.infer<typeof this.schema>,
    ): Promise<EventInterface[]>;
    protected abstract generateUpdateEvents(
        object: z.infer<typeof this.schema>,
        existingItem: ExistingItemType,
    ): Promise<EventInterface[]>;
    protected abstract generateDeleteEvents(
        existingItem: ExistingItemType,
    ): Promise<EventInterface[]>;
}
