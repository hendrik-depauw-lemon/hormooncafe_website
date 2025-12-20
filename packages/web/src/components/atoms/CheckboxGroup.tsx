import { Checkbox } from '../../shadcn/components/ui/checkbox';
import { cn } from '../../shadcn/lib/utils';

export interface CheckboxGroupOption {
    value: string;
    label: string;
}

interface CheckboxGroupProps {
    options: CheckboxGroupOption[];
    value: string[];
    onChange: (value: string[]) => void;
    className?: string;
}

export function CheckboxGroup({
    options,
    value,
    onChange,
    className,
    ...fieldProps
}: CheckboxGroupProps) {
    return (
        <div className={cn('grid grid-cols-1', className)}>
            {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                        checked={value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                onChange([...value, option.value]);
                            } else {
                                onChange(value.filter((v) => v !== option.value));
                            }
                        }}
                        {...fieldProps}
                    />
                    <span className="truncate">{option.label}</span>
                </div>
            ))}
        </div>
    );
}
