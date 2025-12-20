import { Table } from '@tanstack/react-table';
import { useMemo } from 'react';

import {
    FilterModel,
    InternalFilterState,
    internalFilterStateToTanstackFilter,
    tanstackFilterToInternalFilterState,
} from './filter-model';
import { Filters } from './Filters';

type TableFilterProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: Table<any>;
    filterModels: FilterModel[];
};

export function TableFilters({ table, filterModels }: TableFilterProps) {
    const columnFilters = table.getState().columnFilters;
    const initial = tanstackFilterToInternalFilterState(table.initialState.columnFilters);

    const value = useMemo(
        () => tanstackFilterToInternalFilterState(columnFilters),
        [columnFilters],
    );

    const onChange = (newValue: InternalFilterState[]) =>
        table.setColumnFilters(internalFilterStateToTanstackFilter(newValue));

    return (
        <Filters filterModels={filterModels} initial={initial} value={value} onChange={onChange} />
    );
}
