import { Projects, ReadModel } from '@boostercloud/framework-core';
import { ProjectionResult, ReadModelAction, UUID } from '@boostercloud/framework-types';

import { BaseReadModel } from '../../../common/base-models';
import { S3StorageService } from '../../../services/storage/s3/s3-storage.service';
import { File } from '../entities/file.entity';

@ReadModel({ authorize: 'all' })
export class FileReadModel extends BaseReadModel<FileReadModel> {
    readonly id!: UUID;
    readonly filename!: string;
    readonly contentType?: string;
    readonly storageKey!: string;
    readonly externalId?: string;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    constructor(init: Omit<FileReadModel, 'signedDownloadUrl' | 'contentLength'>) {
        super(init as FileReadModel);
    }

    public get signedDownloadUrl(): Promise<string> {
        return S3StorageService.getSignedDownloadUrl(this.storageKey);
    }

    public get contentLength(): Promise<number | undefined> {
        return S3StorageService.headObject(this.storageKey).then((head) => head.contentLength);
    }

    @Projects(File, 'id')
    static projectFile(entity: File): ProjectionResult<FileReadModel> {
        if (entity.deletedAt) return ReadModelAction.Delete;

        return new FileReadModel({
            id: entity.id,
            filename: entity.filename,
            contentType: entity.contentType,
            storageKey: entity.storageKey,
            externalId: entity.externalId,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
}
