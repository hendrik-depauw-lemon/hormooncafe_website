'use client';

import { DataTable } from '@/src/components/organism/tables/DataTable';
import SearchParamControlledTable from '@/src/components/organism/tables/SearchParamControlledDataTable';
import { useRouter } from '@/src/i18n/navigation';
import { SSRPaginatedQuery } from '@/src/types/DataTable/SSRPaginatedQuery';

import { createTableQuery } from '../../../../../../../src/components/organism/tables/create-table-query';
import { getCalendarGroupsQuery } from '../_queries/getCalendarGroups';
import { CalendarGroupsTableEntry, useColumns } from './CalendarGroupsTableColumns';
import { CalendarGroupsTableFilters } from './CalendarGroupsTableFilters';

export function CalendarGroupsTable() {
    const columns = useColumns();
    const router = useRouter();

    const query: SSRPaginatedQuery<CalendarGroupsTableEntry> = createTableQuery(
        getCalendarGroupsQuery,
        'ListCalendarGroupReadModels',
    );

    return (
        <SearchParamControlledTable
            columns={columns}
            query={query}
            render={(table, isPending) => (
                <>
                    <CalendarGroupsTableFilters table={table} />
                    <DataTable
                        table={table}
                        isLoading={isPending}
                        onRowClick={(row) => router.push(`/calendar/groups/${row.original.id}`)}
                    />
                </>
            )}
        />
    );
}
