'use client';

import { useQuery } from '@tanstack/react-query';
import {
    ColumnDef,
    ColumnFilter,
    ColumnFiltersState,
    ColumnPinningState,
    getCoreRowModel,
    PaginationState,
    SortingState,
    Table,
    Updater,
    useReactTable,
} from '@tanstack/react-table';
import { useQueryState } from 'nuqs';
import { z } from 'zod';

import type { SSRPaginatedQuery, TBaseFilter } from '@/src/types/DataTable/SSRPaginatedQuery';

import { OrderProperty } from '../../../gql/generated/graphql';
import { parseBase64 } from '../../../utils/nuqs/parseBase64';
import { InternalFilterState, tanstackFilterToBoosterFilter } from '../filters/filter-model';
import { DataTableProps } from './DataTable';

const paginationSchema = z.object({ pageIndex: z.number(), pageSize: z.number() });
const sortingSchema = z.array(z.object({ id: z.string(), desc: z.boolean() }));
const filteringSchema = z.array(z.object({ id: z.string(), value: z.any() }));

interface SearchParamControlledTableProps<TData, TValue, TFilter extends TBaseFilter>
    extends Omit<DataTableProps<TData>, 'table'> {
    name?: string;
    columns: ColumnDef<TData, TValue>[];
    query: SSRPaginatedQuery<TData, TFilter>;
    initialPagination?: PaginationState;
    initialSorting?: SortingState;
    initialColumnFiltering?: { id: string; value: InternalFilterState }[];
    initialColumnPinning?: ColumnPinningState;
    render: (table: Table<TData>, isPending: boolean) => React.ReactNode;
    refetchInterval?: number;
}

const SearchParamControlledTable = <TData, TValue, TFilter extends TBaseFilter>({
    name,
    columns,
    query,
    initialPagination = { pageIndex: 0, pageSize: 20 },
    initialSorting = [],
    initialColumnFiltering = [],
    initialColumnPinning = {},
    render,
    refetchInterval,
}: SearchParamControlledTableProps<TData, TValue, TFilter>) => {
    const [pagination, onPaginationChange] = useQueryState(
        name ? `${name}-pagination` : 'pagination',
        parseBase64(paginationSchema).withDefault(initialPagination),
    );

    const [sorting, onSortingChange] = useQueryState(
        name ? `${name}-sorting` : 'sorting',
        parseBase64(sortingSchema).withDefault(initialSorting),
    );

    const [columnFilters, onColumnFiltersChangeInternal] = useQueryState(
        name ? `${name}-columnFiltering` : 'columnFiltering',
        parseBase64(filteringSchema).withDefault(initialColumnFiltering),
    );

    const onColumnFiltersChange = (updater: Updater<ColumnFiltersState>) => {
        if (typeof updater === 'function') {
            onColumnFiltersChangeInternal(updater(columnFilters as ColumnFiltersState));
        } else {
            onColumnFiltersChangeInternal(updater);
        }

        table.setPagination({
            pageIndex: 0,
            pageSize: pagination.pageSize,
        });
    };

    const { data, isLoading } = useQuery({
        queryKey: [pagination, sorting, columnFilters],
        queryFn: async () => {
            return query({
                limit: pagination.pageSize,
                skip: pagination.pageIndex * pagination.pageSize,
                sort: sorting.reduce(
                    (acc, { id, desc }) => ({
                        ...acc,
                        [id]: desc ? OrderProperty.Desc : OrderProperty.Asc,
                    }),
                    {} as Record<keyof TData, OrderProperty>,
                ),
                filter: tanstackFilterToBoosterFilter(
                    columnFilters as ColumnFilter[],
                ) as unknown as TFilter,
            });
        },
        refetchInterval,
    });

    const table = useReactTable({
        data: data?.items ?? [],
        rowCount: data?.count,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        onPaginationChange,
        manualSorting: true,
        onSortingChange,
        manualFiltering: true,
        onColumnFiltersChange,
        state: {
            pagination,
            sorting,
            // Zod typing is wrong https://github.com/colinhacks/zod/issues/3730
            columnFilters: columnFilters as ColumnFiltersState,
            columnPinning: initialColumnPinning,
        },
        initialState: {
            columnFilters: initialColumnFiltering,
            pagination: initialPagination,
            sorting: initialSorting,
            columnPinning: initialColumnPinning,
        },
    });

    return render(table, isLoading);
};

export default SearchParamControlledTable;
