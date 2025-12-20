'use client';

import { ChevronsUpDownIcon, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Button } from '@/src/shadcn/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/src/shadcn/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/shadcn/components/ui/popover';

import { Badge } from '../../../shadcn/components/ui/badge';
import { Checkbox } from '../../../shadcn/components/ui/checkbox';

type Item = {
    value: string;
    label: string;
};

type ComboBoxMultiProps = {
    value: Item[];
    onSearchTermChanges: (searchTerm: string) => void;
    items: Item[];
    placeholder?: string;
    noResultsMessage?: string;
    onChange: (value: string[]) => void;
    disabled?: boolean;
    hideBadges?: boolean;
    showAmountBadge?: boolean;
};

export function ComboBoxMulti({
    value,
    onSearchTermChanges,
    items,
    placeholder,
    noResultsMessage,
    onChange,
    disabled,
    hideBadges = false,
    showAmountBadge = false,
}: ComboBoxMultiProps) {
    const t = useTranslations('common.combo-box');
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    placeholder = placeholder ?? t('placeholder');
    noResultsMessage = noResultsMessage ?? t('noResultsMessage');

    useEffect(() => {
        onSearchTermChanges(searchTerm);
    }, [searchTerm]);

    const handleRemoveItem = (index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const newValues = value.filter((_, i) => i !== index);
        onChange(newValues.map((v) => v.value));
    };

    const handleItemSelect = (item: Item) => () => {
        const isSelected = !!value.find((v) => v.value === item.value);
        if (!isSelected) {
            const newValues = [...value, item];
            onChange(newValues.map((v) => v.value));
        } else {
            const newValues = value.filter((v) => v.value !== item.value);
            onChange(newValues.map((v) => v.value));
        }
        setSearchTerm('');
    };

    const handleCheckboxChange = (item: Item) => (checked: boolean | string) => {
        if (checked) {
            const newValues = [...value, item];
            onChange(newValues.map((v) => v.value));
        } else {
            const newValues = value.filter((v) => v.value !== item.value);
            onChange(newValues.map((v) => v.value));
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                    disabled={disabled}
                >
                    <span className="flex items-center gap-2">
                        {showAmountBadge && value.length > 0 && <Badge>{value.length}</Badge>}
                        {placeholder}
                    </span>
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            {!hideBadges && (
                <div className="flex flex-wrap gap-1">
                    {value.map((v, index) => (
                        <Badge key={index} variant="secondary">
                            {v.label}
                            <Button
                                variant="ghost"
                                type="button"
                                onClick={handleRemoveItem(index)}
                                size="sm"
                                className="h-4 has-[>svg]:px-0"
                            >
                                <X className="size-3" />
                            </Button>
                        </Badge>
                    ))}
                </div>
            )}
            <PopoverContent className="w-full p-0" align="start">
                <Command shouldFilter={false}>
                    <CommandInput
                        value={searchTerm}
                        placeholder={placeholder}
                        onValueChange={setSearchTerm}
                    />
                    <CommandList>
                        <CommandEmpty>{noResultsMessage}</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={handleItemSelect(item)}
                                >
                                    <Checkbox
                                        onClick={(e) => e.stopPropagation()}
                                        checked={!!value.find((v) => v.value === item.value)}
                                        onCheckedChange={handleCheckboxChange(item)}
                                    />
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
