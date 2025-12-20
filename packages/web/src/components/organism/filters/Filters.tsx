import { isEqual } from 'lodash-es';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useDebounce } from 'use-debounce';

import { Badge } from '../../../shadcn/components/ui/badge';
import { Button } from '../../../shadcn/components/ui/button';
import { allowedOperations, FilterModel, InternalFilterState } from './filter-model';
import { FilterBadge } from './FilterBadge';
import { NewFilterBadge } from './NewFilterBadge';
import { useArrayState } from './useArrayState';

type FiltersProps = {
    filterModels: FilterModel[];
    initial: InternalFilterState[];
    value: InternalFilterState[];
    onChange: (newValue: InternalFilterState[]) => void;
};

export function Filters({ filterModels, initial, value, onChange }: FiltersProps) {
    const t = useTranslations('common.filters');
    const {
        value: filters,
        push,
        remove,
        replace,
        replaceAll,
    } = useArrayState<InternalFilterState>(value);

    useEffect(() => {
        if (!isEqual(value, filters)) replaceAll(value);
    }, [value]);

    const [debouncedFilters] = useDebounce(filters, 500);

    useEffect(() => {
        if (!isEqual(value, filters)) onChange(filters);
    }, [debouncedFilters]);

    const getFilterModel = (key: string): FilterModel | undefined =>
        filterModels.find((f) => f.key === key);

    const reset = () => {
        replaceAll(initial);
    };

    return (
        <div className="flex flex-row gap-1 justify-between items-end mb-2">
            <div className="flex flex-row gap-1 flex-wrap">
                {filters.map((field, index) => {
                    const filterModel = getFilterModel(field.key);
                    if (!filterModel) return null;

                    return (
                        <FilterBadge
                            key={index}
                            filterModel={filterModel}
                            value={field}
                            onChange={(value) => replace(index, value)}
                            onRemove={() => remove(index)}
                            isLast={index === filters.length - 1}
                        />
                    );
                })}
                <NewFilterBadge
                    attributeOptions={filterModels.map((filterModel) => ({
                        label: filterModel.label,
                        key: filterModel.key,
                    }))}
                    onSelect={(attribute) => {
                        const filterModel = filterModels.find((f) => f.key === attribute);
                        if (!filterModel) return;
                        push({
                            key: filterModel.key,
                            operation: allowedOperations[filterModel.type][0],
                            type: filterModel.type,
                            input: undefined,
                        });
                    }}
                />
            </div>

            <Badge variant="ghost" asChild>
                <Button variant="ghost" size="sm" className="h-6 has-[>svg]:px-2" onClick={reset}>
                    {t('clear')}
                </Button>
            </Badge>
        </div>
    );
}
