import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { useMutation, useQuery } from 'urql';

import { cn } from '../../../shadcn/lib/utils';
import { Muted } from '../typography/Muted';
import { Small } from '../typography/Small';
import { createFileMutation } from './_actions/createFile';
import { getFilesQuery } from './_queries/getFiles';
import { FilePreview } from './FilePreview';
import { FilePreviewError } from './FilePreviewError';

type FileInputProps = {
    value: string[];
    onChange: (fileIds: string[]) => void;
    multiple?: boolean;
} & Pick<DropzoneOptions, 'accept' | 'maxSize' | 'minSize' | 'disabled' | 'maxFiles'>;

export function FileInput({ value, onChange, multiple = true, ...options }: FileInputProps) {
    const t = useTranslations('common.file-input');
    const [_, createFile] = useMutation(createFileMutation);

    const supportedFileExtensions = Object.values(options.accept || {}).flat();

    const onDropAccepted = async (acceptedFiles: File[]) => {
        const createdFileIds: string[] = [];
        await Promise.all(
            acceptedFiles.map(async (file) => {
                const result = await createFile({ input: { filename: file.name } });
                if (!result.data) {
                    toast.error(
                        'Failed to upload file: ' + result.error?.graphQLErrors[0]?.message ||
                            result.error?.message,
                    );
                    return;
                }
                const fetchResponse = await fetch(result.data.CreateFile.signedUrl, {
                    method: 'PUT',
                    body: file,
                    headers: { 'Content-Type': file.type },
                });
                if (fetchResponse.ok) {
                    createdFileIds.push(result.data.CreateFile.createdFileId);
                }
            }),
        );

        onChange([...value, ...createdFileIds]);
    };

    const onDelete = (index: number) => {
        const newValue = value.filter((_, i) => i !== index);
        onChange(newValue);
    };

    const [{ fetching, data }] = useQuery({
        query: getFilesQuery,
        variables: { ids: value },
    });

    const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
        multiple,
        ...options,
        onDropAccepted,
    });

    return (
        <div className="flex flex-col gap-2 w-full">
            {(multiple || !value.length) && (
                <div
                    {...getRootProps()}
                    className={cn(
                        'rounded-md border border-dashed p-4 w-full flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-muted hover:opacity-80 transition-colors h-24',
                        { 'bg-muted': isDragAccept },
                        { 'bg-destructive/20': isDragReject },
                    )}
                >
                    <input {...getInputProps()} />
                    <div className="flex flex-row gap-2 items-center">
                        <Upload />
                        <Small>
                            {t('call-to-action')}
                            <span className="text-primary hover:underline">{t('browse')}</span>
                        </Small>
                    </div>
                    {!!supportedFileExtensions.length && (
                        <Muted>
                            {t('supported-formats', {
                                formats: supportedFileExtensions.join(', '),
                            })}
                        </Muted>
                    )}
                </div>
            )}
            <div className="grid grid-cols-1 gap-2">
                {value.map((fileId, index) => {
                    const file = data?.ListFileReadModels.items.find((f) => f.id === fileId);
                    if (file)
                        return (
                            <FilePreview
                                key={file.id}
                                file={file}
                                onDelete={() => onDelete(index)}
                            />
                        );
                    if (fetching) return <Fragment key={fileId}></Fragment>;
                    return <FilePreviewError key={fileId} onDelete={() => onDelete(index)} />;
                })}
            </div>
        </div>
    );
}
