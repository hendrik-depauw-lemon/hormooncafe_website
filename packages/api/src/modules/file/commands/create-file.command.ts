import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';
import * as mime from 'mime-types';
import * as path from 'path';

import { BaseCommand, BaseValueObject } from '../../../common/base-models';
import { S3StorageService } from '../../../services/storage/s3/s3-storage.service';
import { FileCreated } from '../events/file-created';

class CreateSignedUrlForFileUploadReturnType extends BaseValueObject<CreateSignedUrlForFileUploadReturnType> {
    readonly createdFileId!: UUID;
    readonly signedUrl!: string;
    readonly filename!: string;
    readonly contentType?: string;
}

@Command({ authorize: 'all' })
export class CreateFile extends BaseCommand<CreateFile> {
    readonly filename!: string;

    static async handle(
        command: CreateFile,
        register: Register,
    ): Promise<CreateSignedUrlForFileUploadReturnType> {
        const { filename } = command;
        const extension = path.parse(filename).ext;

        const contentTypeOrFalse = mime.contentType(extension);
        const contentType = contentTypeOrFalse || undefined;
        const id = UUID.generate();

        const { signedUrl, fullPath } = await S3StorageService.getSignedUploadUrl({
            filename: `${id.toString()}${extension}`,
            ...(contentType && { contentType: contentType }),
        });

        register.events(
            new FileCreated({
                id: id,
                filename: filename,
                storageKey: fullPath,
                contentType: contentType,
            }),
        );

        return {
            createdFileId: id,
            filename: filename,
            signedUrl: signedUrl,
            contentType: contentType,
        };
    }
}
