import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../../../../shadcn/components/ui/button';
import { Input } from '../../../../shadcn/components/ui/input';
import { FilterInputProps } from './FilterInput';

export function NumberListInput({
    value,
    onChange,
}: Omit<FilterInputProps, 'filterModel' | 'filterOperation'>) {
    const [newValue, setNewValue] = useState(0);

    const displayValue = (value: number[]) => value.join(', ');

    const onChangeInternal = (newValue: number, index: number) => {
        const newArray = ((value || []) as number[]).map((v, i) => (i === index ? newValue : v));
        onChange(newArray, displayValue(newArray));
    };

    const onRemoveInternal = (index: number) => {
        const newArray = ((value || []) as number[]).filter((_, i) => i !== index);
        onChange(newArray, displayValue(newArray));
    };

    const onAddInternal = (newValue: number) => {
        const newArray = [...((value || []) as number[]), newValue];
        setNewValue(0);
        onChange(newArray, displayValue(newArray));
    };

    return (
        <>
            {((value || []) as number[]).map((v: number, i: number) => (
                <div className="flex flex-row" key={i}>
                    <Input
                        type="text"
                        value={(v || 0) as number}
                        onChange={(e) => onChangeInternal(+e.currentTarget.value, i)}
                    />
                    <Button variant="ghost" size="icon" onClick={() => onRemoveInternal(i)}>
                        <Trash2 />
                    </Button>
                </div>
            ))}
            <div className="flex flex-row">
                <Input
                    type="text"
                    value={newValue}
                    onChange={(e) => setNewValue(+e.currentTarget.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onAddInternal(newValue);
                        }
                    }}
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                />
                <Button variant="ghost" size="icon" onClick={() => onAddInternal(newValue)}>
                    <Plus />
                </Button>
            </div>
        </>
    );
}
