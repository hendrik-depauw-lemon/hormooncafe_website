'use client';

import { DataTable } from '@/src/components/organism/tables/DataTable';
import SearchParamControlledTable from '@/src/components/organism/tables/SearchParamControlledDataTable';
import { useRouter } from '@/src/i18n/navigation';
import { SSRPaginatedQuery } from '@/src/types/DataTable/SSRPaginatedQuery';

import { createTableQuery } from '../../../../../../src/components/organism/tables/create-table-query';
import { getAuthorsQuery } from '../_queries/getAuthors';
import { AuthorsTableEntry, useColumns } from './AuthorsTableColumns';
import { AuthorsTableFilters } from './AuthorsTableFilters';

export function AuthorsTable() {
    const columns = useColumns();
    const router = useRouter();

    const query: SSRPaginatedQuery<AuthorsTableEntry> = createTableQuery(
        getAuthorsQuery,
        'ListAuthorReadModels',
    );

    return (
        <SearchParamControlledTable
            columns={columns}
            query={query}
            render={(table, isPending) => (
                <>
                    <AuthorsTableFilters table={table} />
                    <DataTable
                        table={table}
                        isLoading={isPending}
                        onRowClick={(row) => router.push(`/authors/${row.original.id}`)}
                    />
                </>
            )}
        />
    );
}
