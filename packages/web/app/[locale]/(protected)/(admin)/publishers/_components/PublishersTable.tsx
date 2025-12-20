'use client';

import { DataTable } from '@/src/components/organism/tables/DataTable';
import SearchParamControlledTable from '@/src/components/organism/tables/SearchParamControlledDataTable';
import { useRouter } from '@/src/i18n/navigation';
import { SSRPaginatedQuery } from '@/src/types/DataTable/SSRPaginatedQuery';

import { createTableQuery } from '../../../../../../src/components/organism/tables/create-table-query';
import { getPublishersQuery } from '../_queries/getPublishers';
import { PublishersTableEntry, useColumns } from './PublishersTableColumns';

export function PublishersTable() {
    const columns = useColumns();
    const router = useRouter();

    const query: SSRPaginatedQuery<PublishersTableEntry> = createTableQuery(
        getPublishersQuery,
        'ListPublisherReadModels',
    );

    return (
        <SearchParamControlledTable
            columns={columns}
            query={query}
            render={(table, isPending) => (
                <DataTable
                    table={table}
                    isLoading={isPending}
                    onRowClick={(row) => router.push(`/publishers/${row.original.id}`)}
                />
            )}
        />
    );
}
