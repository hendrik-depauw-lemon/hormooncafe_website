import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Badge } from '../../../shadcn/components/ui/badge';
import { Button } from '../../../shadcn/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../../../shadcn/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../../../shadcn/components/ui/popover';

type NewFilterBadgeProps = {
    attributeOptions: { key: string; label: string }[];
    onSelect: (value: string) => void;
};

export function NewFilterBadge({ attributeOptions, onSelect }: NewFilterBadgeProps) {
    const t = useTranslations('common.filters');
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Badge variant="outline" asChild>
                    <Button variant="ghost" size="sm" className="h-6 has-[>svg]:px-2">
                        {t('new-filter')}
                    </Button>
                </Badge>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder={t('search')} />
                    <CommandList>
                        <CommandEmpty>{t('no-results')}</CommandEmpty>
                        <CommandGroup>
                            {attributeOptions.map((attribute) => (
                                <CommandItem
                                    key={attribute.key}
                                    value={attribute.label}
                                    onSelect={() => {
                                        onSelect(attribute.key);
                                        setOpen(false);
                                    }}
                                >
                                    {attribute.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
