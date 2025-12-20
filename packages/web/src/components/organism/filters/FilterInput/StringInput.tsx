import { Input } from '../../../../shadcn/components/ui/input';
import { FilterInputProps } from './FilterInput';

export function StringInput({
    value,
    onChange,
    onFinished,
}: Omit<FilterInputProps, 'filterModel' | 'filterOperation'>) {
    return (
        <Input
            type="text"
            value={(value || '') as string}
            onChange={(e) => onChange(e.currentTarget.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    onFinished();
                }
            }}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
        />
    );
}
