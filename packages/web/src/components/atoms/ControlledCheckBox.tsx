import { Checkbox } from '../../shadcn/components/ui/checkbox';
import { cn } from '../../shadcn/lib/utils';

interface ControlledCheckBoxProps {
    value: boolean;
    onChange: (value: boolean) => void;
    className?: string;
}

export function ControlledCheckBox({
    value,
    onChange,
    className,
    ...fieldProps
}: ControlledCheckBoxProps) {
    return (
        <Checkbox
            className={cn('size-6', className)}
            checked={value}
            onCheckedChange={onChange}
            {...fieldProps}
        />
    );
}
