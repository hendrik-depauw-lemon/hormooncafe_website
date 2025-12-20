import { Entity, Reduces } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEntity } from '../../../common/base-models';
import { FileCreated } from '../events/file-created';

@Entity
export class File extends BaseEntity<File> {
    readonly id!: UUID;
    readonly filename!: string;
    readonly contentType?: string;
    readonly storageKey!: string;
    readonly externalId?: string;

    @Reduces(FileCreated)
    public static reduceFileCreated(event: FileCreated): File {
        return new File({
            id: event.id,
            filename: event.filename,
            contentType: event.contentType,
            storageKey: event.storageKey,
            externalId: event.externalId,
            createdAt: event.eventTime,
            updatedAt: event.eventTime,
            deletedAt: undefined,
        });
    }
}
