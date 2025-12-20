import { UUID } from '@boostercloud/framework-types';

import { ReadModelValidators } from '../../../common/validators/read-model-validators';
import { AppDomain } from '../../../error-handling/error-code';
import { FailedToDownloadFileError } from '../errors/failed-to-download-file.error';
import { FileReadModel } from '../read-models/file.read-model';

type DownloadFileResponse = {
    file: FileReadModel;
    content: ArrayBuffer;
};

export async function downloadFile(fileId: UUID): Promise<DownloadFileResponse> {
    const file = await ReadModelValidators.ReadModelExists(FileReadModel, fileId, AppDomain.File);
    const downloadUrl = await file.signedDownloadUrl;
    const fileContent = await fetch(downloadUrl);
    if (!fileContent.ok) {
        throw new FailedToDownloadFileError(file.id, file.storageKey, await fileContent.text());
    }
    const content = await fileContent.arrayBuffer();
    return { file, content };
}
