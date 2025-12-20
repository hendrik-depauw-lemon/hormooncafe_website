import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../../../../shadcn/components/ui/button';
import { Input } from '../../../../shadcn/components/ui/input';
import { FilterInputProps } from './FilterInput';

export function StringListInput({
    value,
    onChange,
}: Omit<FilterInputProps, 'filterModel' | 'filterOperation'>) {
    const [newValue, setNewValue] = useState('');

    const displayValue = (value: string[]) => value.join(', ');

    const onChangeInternal = (newValue: string, index: number) => {
        const newArray = ((value || []) as string[]).map((v, i) => (i === index ? newValue : v));
        onChange(newArray, displayValue(newArray));
    };

    const onRemoveInternal = (index: number) => {
        const newArray = ((value || []) as string[]).filter((_, i) => i !== index);
        onChange(newArray, displayValue(newArray));
    };

    const onAddInternal = (newValue: string) => {
        const newArray = [...((value || []) as string[]), newValue];
        setNewValue('');
        onChange(newArray, displayValue(newArray));
    };

    return (
        <>
            {((value || []) as string[]).map((v: string, i: number) => (
                <div className="flex flex-row" key={i}>
                    <Input
                        type="text"
                        value={(v || '') as string}
                        onChange={(e) => onChangeInternal(e.currentTarget.value, i)}
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
                    onChange={(e) => setNewValue(e.currentTarget.value)}
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
