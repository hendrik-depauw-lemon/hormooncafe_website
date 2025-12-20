'use client';

import * as React from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/src/shadcn/components/ui/select';

type Option = Record<'value' | 'label', string>;

interface CustomSelectProps {
    options: Option[];
    placeholder?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
    ariaInvalid?: boolean | 'true' | 'false' | 'grammar' | 'spelling' | undefined;
}

export function CustomSelect({
    options,
    placeholder = 'Select an option...',
    value,
    onValueChange,
    disabled = false,
    className,
    ariaInvalid,
}: CustomSelectProps) {
    return (
        <Select value={value} onValueChange={onValueChange} disabled={disabled}>
            <SelectTrigger className={className} aria-invalid={ariaInvalid}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
