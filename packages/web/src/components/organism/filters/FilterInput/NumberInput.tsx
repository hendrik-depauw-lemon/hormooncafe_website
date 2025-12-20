import { Input } from '../../../../shadcn/components/ui/input';
import { FilterInputProps } from './FilterInput';

export function NumberInput({
    value,
    onChange,
    onFinished,
}: Omit<FilterInputProps, 'filterModel' | 'filterOperation'>) {
    return (
        <Input
            type="number"
            value={(value || 0) as number}
            onChange={(e) => onChange(+e.currentTarget.value)}
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
