'use client';

import { DataTable } from '@/src/components/organism/tables/DataTable';
import SearchParamControlledTable from '@/src/components/organism/tables/SearchParamControlledDataTable';
import { useRouter } from '@/src/i18n/navigation';
import { SSRPaginatedQuery } from '@/src/types/DataTable/SSRPaginatedQuery';

import { createTableQuery } from '../../../../../../../src/components/organism/tables/create-table-query';
import { getJobExecutionsQuery } from '../_queries/getJobExecutions';
import { JobExecutionsFilter } from './JobExecutionsFilter';
import { JobExecutionsTableEntry, useColumns } from './JobExecutionsTableColumns';

export function JobExecutionsTable() {
    const columns = useColumns();
    const router = useRouter();

    const query: SSRPaginatedQuery<JobExecutionsTableEntry> = createTableQuery(
        getJobExecutionsQuery,
        'ListJobExecutionReadModels',
    );

    return (
        <SearchParamControlledTable
            columns={columns}
            query={query}
            initialSorting={[{ id: 'createdAt', desc: true }]}
            initialColumnPinning={{ left: ['name'] }}
            refetchInterval={1000}
            render={(table, isPending) => (
                <>
                    <JobExecutionsFilter table={table} />
                    <DataTable
                        table={table}
                        isLoading={isPending}
                        onRowClick={(row) => router.push(`/job-monitor/${row.original.id}`)}
                    />
                </>
            )}
        />
    );
}
