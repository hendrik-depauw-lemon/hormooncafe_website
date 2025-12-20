'use client';

import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import { DataTable } from '@/src/components/organism/tables/DataTable';

import { CalendarEvent } from '../calendar-types';
import { useColumns } from './CalendarEventTableColumns';

interface CalendarEventTableProps {
    events: CalendarEvent[];
}

export function CalendarEventTable({ events }: CalendarEventTableProps) {
    const columns = useColumns();
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: events,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        manualSorting: false,
        manualFiltering: false,
        onColumnFiltersChange: setColumnFilters,
        state: {
            pagination,
            sorting,
            columnFilters,
        },
    });

    return <DataTable table={table} isLoading={false} onRowClick={() => {}} />;
}
