import { UUID } from '@boostercloud/framework-types';

import { EntityValidators } from '../../../common/validators/entity-validators';
import { AppDomain } from '../../../error-handling/error-code';
import { S3StorageService } from '../../../services/storage/s3/s3-storage.service';
import { File } from '../entities/file.entity';
import { FileDoesNotExistWithStorageProvider } from '../errors/file-does-not-exist-with-storage-provider.error';

export class FileValidators {
    static async existsWithStorageProvider(file: File): Promise<void> {
        const head = await S3StorageService.headObject(file.storageKey);
        if (!head.exists) {
            throw new FileDoesNotExistWithStorageProvider(file.id, file.storageKey);
        }
    }

    static async areNotDeletedAndExistWithStorageProvider(fileIds: UUID[]): Promise<File[]> {
        const files = await EntityValidators.entitiesAreNotDeleted(File, fileIds, AppDomain.File);
        await Promise.all(files.map((file) => FileValidators.existsWithStorageProvider(file)));
        return files;
    }
}
