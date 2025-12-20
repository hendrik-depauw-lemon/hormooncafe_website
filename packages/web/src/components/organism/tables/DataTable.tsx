'use client';

import { flexRender, Row, SortDirection, type Table as ITable } from '@tanstack/react-table';
import { ArrowDownAZ, ArrowUpAZ, ArrowUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../../../shadcn/components/ui/button';
import { Skeleton } from '../../../shadcn/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../shadcn/components/ui/table';
import { cn } from '../../../shadcn/lib/utils';
import { Pagination } from './Pagination';

export interface DataTableProps<TData> {
    table: ITable<TData>;
    isLoading?: boolean;
    onRowClick?: (row: Row<TData>) => void;
}
export const DataTable = <TData,>({
    table,
    isLoading = false,
    onRowClick,
}: DataTableProps<TData>) => {
    const t = useTranslations('common.table');

    const getSortingIcon = (isSorted: false | SortDirection) => {
        switch (isSorted) {
            case 'asc':
                return <ArrowDownAZ />;
            case 'desc':
                return <ArrowUpAZ />;
            default:
                return <ArrowUpDown />;
        }
    };

    return (
        <>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headergroup) => (
                            <TableRow key={headergroup.id}>
                                {headergroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className={cn('pl-4', {
                                            [`sticky z-10 bg-background`]:
                                                header.column.getIsPinned(),
                                        })}
                                        style={{
                                            left:
                                                header.column.getIsPinned() === 'left'
                                                    ? header.column.getStart('left')
                                                    : undefined,
                                            right:
                                                header.column.getIsPinned() === 'right'
                                                    ? header.column.getAfter('right')
                                                    : undefined,
                                            width: header.column.getSize(),
                                            minWidth: header.column.getSize(),
                                        }}
                                    >
                                        <div className="flex flex-row items-center">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef.header,
                                                      header.getContext(),
                                                  )}
                                            {header.column.getCanSort() && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        header.column.toggleSorting(
                                                            header.column.getIsSorted() === 'asc',
                                                        )
                                                    }
                                                >
                                                    {getSortingIcon(header.column.getIsSorted())}
                                                </Button>
                                            )}
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    onClick={() => onRowClick?.(row)}
                                    className={cn({ onRowClick: 'cursor-pointer' })}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            title={String(cell.getValue() || '')}
                                            className={cn(
                                                'pl-4 h-14 truncate max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[800px]',
                                                {
                                                    [`sticky z-10 bg-background`]:
                                                        cell.column.getIsPinned(),
                                                },
                                            )}
                                            style={{
                                                left:
                                                    cell.column.getIsPinned() === 'left'
                                                        ? cell.column.getStart('left')
                                                        : undefined,
                                                right:
                                                    cell.column.getIsPinned() === 'right'
                                                        ? cell.column.getAfter('right')
                                                        : undefined,
                                                width: cell.column.getSize(),
                                                minWidth: cell.column.getSize(),
                                            }}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : isLoading ? (
                            new Array(Math.min(table.getState().pagination.pageSize, 5))
                                .fill(null)
                                .map((_, index) => (
                                    <TableRow key={`loading-${index}`}>
                                        <TableCell
                                            className="justify-center"
                                            colSpan={table.getAllColumns().length}
                                        >
                                            <Skeleton className="ml-2 my-3 h-4 w-3xs md:w-sm" />
                                        </TableCell>
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    className="h-24 text-center"
                                    colSpan={table.getAllColumns().length}
                                >
                                    {t('no-data')}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-2">
                <Pagination
                    currentPageIndex={table.getState().pagination.pageIndex}
                    pageSize={table.getState().pagination.pageSize}
                    totalItems={table.getRowCount()}
                    totalPages={table.getPageCount()}
                    onPreviousPage={table.previousPage}
                    onNextPage={table.nextPage}
                    onSetPage={table.setPageIndex}
                />
            </div>
        </>
    );
};
