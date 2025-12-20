import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from '../../../../shadcn/components/ui/command';
import { FilterModelWithEnum } from '../filter-model';
import { FilterInputProps } from './FilterInput';

export function EnumInput({
    filterModel,
    value,
    onChange,
    onFinished,
}: Omit<FilterInputProps, 'filterModel' | 'filterOperation'> & {
    filterModel: FilterModelWithEnum;
}) {
    const t = useTranslations('common.filters');

    return (
        <Command>
            <CommandInput placeholder={t('search')} />
            <CommandList>
                <CommandEmpty>{t('no-results')}</CommandEmpty>
                {filterModel.enumValues.map(({ value: enumValue, label }) => (
                    <CommandItem
                        key={enumValue}
                        value={label}
                        onSelect={() => {
                            onChange(enumValue, label);
                            onFinished();
                        }}
                    >
                        {label} {enumValue === value && <Check />}
                    </CommandItem>
                ))}
            </CommandList>
        </Command>
    );
}
