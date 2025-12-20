import { DropzoneOptions } from 'react-dropzone';

import { FileInput } from './FileInput';

type FileInputSingleProps = {
    value: string | undefined;
    onChange: (fileId: string | undefined) => void;
} & Pick<DropzoneOptions, 'accept' | 'maxSize' | 'minSize' | 'disabled'>;

export function FileInputSingle({ value, onChange, ...options }: FileInputSingleProps) {
    return (
        <FileInput
            value={value ? [value] : []}
            onChange={(fileIds) => onChange(fileIds[0])}
            {...options}
            multiple={false}
        />
    );
}
