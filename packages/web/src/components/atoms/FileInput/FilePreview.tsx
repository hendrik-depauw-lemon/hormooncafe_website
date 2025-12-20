import { Download, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import prettyBytes from 'pretty-bytes';

import { ListFileReadModelsQuery } from '../../../gql/generated/graphql';
import { Button } from '../../../shadcn/components/ui/button';
import { formatDateTime } from '../../../utils/formatDate';
import { Muted } from '../typography/Muted';
import { Small } from '../typography/Small';

type FilePreviewProps = {
    file: ListFileReadModelsQuery['ListFileReadModels']['items'][0];
    onDelete?: () => void;
};

export function FilePreview({ file, onDelete }: FilePreviewProps) {
    return (
        <div className="rounded-md border flex flex-row overflow-hidden h-24 w-full max-w-2xl">
            {file.contentType?.startsWith('image/') && (
                <Image
                    src={file.signedDownloadUrl}
                    alt={file.filename}
                    width={96}
                    height={96}
                    className="object-contain w-24 h-24"
                />
            )}
            <div className="flex flex-col p-3 gap-3 justify-between w-full">
                <Small>{file.filename}</Small>
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <Muted>{formatDateTime(file.createdAt)}</Muted>
                        {!!file.contentLength && <Muted>{prettyBytes(file.contentLength)}</Muted>}
                    </div>
                    <div>
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={file.signedDownloadUrl} target="_blank">
                                <Download />
                            </Link>
                        </Button>
                        {!!onDelete && (
                            <Button variant="ghost" size="icon" onClick={onDelete}>
                                <Trash2 />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
