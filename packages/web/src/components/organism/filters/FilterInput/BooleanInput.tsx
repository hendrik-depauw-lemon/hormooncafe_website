import { useTranslations } from 'next-intl';

import { Command, CommandItem, CommandList } from '../../../../shadcn/components/ui/command';
import { FilterInputProps } from './FilterInput';

export function BooleanInput({
    onChange,
    onFinished,
}: Omit<FilterInputProps, 'filterModel' | 'filterOperation'>) {
    const t = useTranslations('common.filters');

    return (
        <Command>
            <CommandList>
                <CommandItem
                    onSelect={() => {
                        onChange(true, t('true'));
                        onFinished();
                    }}
                >
                    {t('true')}
                </CommandItem>
                <CommandItem
                    onSelect={() => {
                        onChange(false, t('false'));
                        onFinished();
                    }}
                >
                    {t('false')}
                </CommandItem>
            </CommandList>
        </Command>
    );
}
