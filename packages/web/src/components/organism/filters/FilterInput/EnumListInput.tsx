import { useTranslations } from 'next-intl';

import { Checkbox } from '../../../../shadcn/components/ui/checkbox';
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from '../../../../shadcn/components/ui/command';
import { FilterModelWithEnum } from '../filter-model';
import { FilterInputProps } from './FilterInput';

export function EnumListInput({
    filterModel,
    value,
    onChange,
}: Omit<FilterInputProps, 'filterModel' | 'filterOperation'> & {
    filterModel: FilterModelWithEnum;
}) {
    const t = useTranslations('common.filters');

    const displayValue = (values: string[]) =>
        values.map((v) => filterModel.enumValues.find((e) => e.value === v)?.label).join(', ');

    const handleItemSelect = (enumValue: string) => () => {
        const values = (value || []) as string[];
        const isSelected = values.includes(enumValue);
        if (!isSelected) {
            const newValues = [...values, enumValue];
            onChange(newValues, displayValue(newValues));
        } else {
            const newValues = values.filter((v) => v !== enumValue);
            onChange(newValues, displayValue(newValues));
        }
    };

    return (
        <Command>
            <CommandInput placeholder={t('search')} />
            <CommandList>
                <CommandEmpty>{t('no-results')}</CommandEmpty>
                {filterModel.enumValues.map(({ value: enumValue, label }) => (
                    <CommandItem
                        key={enumValue}
                        value={label}
                        onSelect={handleItemSelect(enumValue)}
                    >
                        <Checkbox
                            checked={!!((value || []) as string[]).find((v) => v === enumValue)}
                        />
                        {label}
                    </CommandItem>
                ))}
            </CommandList>
        </Command>
    );
}
