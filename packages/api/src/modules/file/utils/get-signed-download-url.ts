import { UUID } from '@boostercloud/framework-types';

import { EntityValidators } from '../../../common/validators/entity-validators';
import { AppDomain } from '../../../error-handling/error-code';
import { S3StorageService } from '../../../services/storage/s3/s3-storage.service';
import { File } from '../entities/file.entity';

export async function getSignedDownloadUrl(fileId: UUID): Promise<string> {
    const file = await EntityValidators.entityIsNotDeleted(File, fileId, AppDomain.File);
    const url = await S3StorageService.getSignedDownloadUrl(file.storageKey);
    return url;
}
