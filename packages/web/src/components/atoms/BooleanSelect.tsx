'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/src/shadcn/components/ui/select';

interface BooleanSelectProps {
    placeholder?: string;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    disabled?: boolean;
    className?: string;
}

export function BooleanSelect({
    placeholder,
    value,
    onValueChange,
    disabled,
    className,
}: BooleanSelectProps) {
    const t = useTranslations('common.boolean-select');

    const options = [
        { value: 'true', label: t('true') },
        { value: 'false', label: t('false') },
    ];

    return (
        <Select
            value={new Boolean(value).toString()}
            onValueChange={(value) => onValueChange?.(value === 'true')}
            disabled={disabled}
        >
            <SelectTrigger className={className}>
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
