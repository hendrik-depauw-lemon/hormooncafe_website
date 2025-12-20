'use client';

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
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

import { cn } from '../../../shadcn/lib/utils';

type Item = {
    value: string;
    label: string;
};

type ComboBoxProps = {
    value?: Item | undefined | null;
    onSearchTermChanges: (searchTerm: string) => void;
    items: Item[];
    placeholder?: string;
    unselectMessage?: string;
    noResultsMessage?: string;
    onChange: (item: string | undefined | null) => void;
    disabled?: boolean;
};

export function ComboBox({
    value,
    onSearchTermChanges,
    items,
    placeholder,
    onChange,
    unselectMessage,
    noResultsMessage,
    disabled,
}: ComboBoxProps) {
    const t = useTranslations('common.combo-box');
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    placeholder = placeholder ?? t('placeholder');
    unselectMessage = unselectMessage ?? t('unselect-message');
    noResultsMessage = noResultsMessage ?? t('no-results-message');

    useEffect(() => {
        onSearchTermChanges(searchTerm);
    }, [searchTerm]);

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
                    <span className="truncate">{value ? value.label : placeholder}</span>
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
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
                            <CommandItem
                                key="unselect"
                                value={undefined}
                                onSelect={() => {
                                    onChange(null);
                                    setOpen(false);
                                }}
                            >
                                {unselectMessage}
                            </CommandItem>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={() => {
                                        onChange(item.value);
                                        setSearchTerm('');
                                        setOpen(false);
                                    }}
                                    className="justify-between"
                                >
                                    {item.label}
                                    <CheckIcon
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value?.value === item.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
