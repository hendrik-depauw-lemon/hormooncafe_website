'use client';

import { DataTable } from '@/src/components/organism/tables/DataTable';
import SearchParamControlledTable from '@/src/components/organism/tables/SearchParamControlledDataTable';
import { useRouter } from '@/src/i18n/navigation';
import { SSRPaginatedQuery } from '@/src/types/DataTable/SSRPaginatedQuery';

import { createTableQuery } from '../../../../../../../src/components/organism/tables/create-table-query';
import { getScheduledJobsQuery } from '../_queries/getScheduledJobs';
import { ScheduledJobsFilter } from './ScheduledJobsFilter';
import { ScheduledJobsTableEntry, useColumns } from './ScheduledJobsTableColumns';

export function ScheduledJobsTable() {
    const columns = useColumns();
    const router = useRouter();

    const query: SSRPaginatedQuery<ScheduledJobsTableEntry> = createTableQuery(
        getScheduledJobsQuery,
        'ListScheduledJobReadModels',
    );

    return (
        <SearchParamControlledTable
            columns={columns}
            query={query}
            render={(table, isPending) => (
                <>
                    <ScheduledJobsFilter table={table} />
                    <DataTable
                        table={table}
                        isLoading={isPending}
                        onRowClick={(row) => router.push(`/scheduled-jobs/${row.original.id}`)}
                    />
                </>
            )}
        />
    );
}
