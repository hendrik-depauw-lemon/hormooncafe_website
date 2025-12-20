import { Funnel, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Badge } from '../../../shadcn/components/ui/badge';
import { Button } from '../../../shadcn/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../../shadcn/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../../shadcn/components/ui/select';
import { Muted } from '../../atoms/typography/Muted';
import {
    allowedOperations,
    FilterModel,
    FilterOperation,
    InternalFilterState,
} from './filter-model';
import { FilterInput } from './FilterInput/FilterInput';

type FilterBadgeProps = {
    filterModel: FilterModel;
    value: InternalFilterState;
    onChange: (newValue: InternalFilterState) => void;
    onRemove?: () => void;
    isLast?: boolean;
};

export function FilterBadge({ filterModel, value, onChange, onRemove, isLast }: FilterBadgeProps) {
    const t = useTranslations('common.filters');
    const filterOperations = allowedOperations[filterModel.type];

    const isDefaultOpen = () => {
        if (
            value.operation === FilterOperation.isEmpty ||
            value.operation === FilterOperation.isNotEmpty
        )
            return false;
        if (isLast && value.input == undefined) return true;
        return false;
    };

    const [open, setOpen] = useState(isDefaultOpen());

    const getBadgeLabel = (value: InternalFilterState): string => {
        if (
            value.operation === FilterOperation.isEmpty ||
            value.operation === FilterOperation.isNotEmpty
        )
            return `${filterModel.label} ${t(`operations.${value.operation}`)}`;
        if (!value.input) return `${filterModel.label}`;
        return `${filterModel.label} ${t(`operations.${value.operation}`)} ${value.inputDisplayValue || value.input}`;
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Badge variant="outline">
                    <Funnel />
                    {getBadgeLabel(value)}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 has-[>svg]:px-0"
                        onClick={onRemove}
                    >
                        <X className="size-3" />
                    </Button>
                </Badge>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <div className="p-2 flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-4">
                        <Muted>{filterModel.label}</Muted>
                        <Select
                            value={value?.operation}
                            onValueChange={(operation) =>
                                onChange({
                                    ...value,
                                    operation: operation as FilterOperation,
                                    input: undefined,
                                    inputDisplayValue: undefined,
                                })
                            }
                        >
                            <SelectTrigger size="sm" className="py-1 px-2 gap-1 data-[size=sm]:h-6">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {filterOperations.map((operation) => (
                                    <SelectItem key={operation} value={operation}>
                                        {t(`operations.${operation}`)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {value?.operation && (
                        <FilterInput
                            filterModel={filterModel}
                            filterOperation={value.operation}
                            value={value.input}
                            onChange={(input, inputDisplayValue) =>
                                onChange({ ...value, input, inputDisplayValue })
                            }
                            onFinished={() => setOpen(false)}
                        />
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
