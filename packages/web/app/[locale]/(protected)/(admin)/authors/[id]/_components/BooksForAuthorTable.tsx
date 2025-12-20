'use client';

import { useTranslations } from 'next-intl';

import { DataTable } from '@/src/components/organism/tables/DataTable';
import SearchParamControlledTable from '@/src/components/organism/tables/SearchParamControlledDataTable';
import { useRouter } from '@/src/i18n/navigation';
import { SSRPaginatedQuery } from '@/src/types/DataTable/SSRPaginatedQuery';

import {
    FilterModel,
    FilterOperation,
    FilterType,
} from '../../../../../../../src/components/organism/filters/filter-model';
import { TableFilters } from '../../../../../../../src/components/organism/filters/TableFilters';
import { createTableQuery } from '../../../../../../../src/components/organism/tables/create-table-query';
import { BookReadModel } from '../../../../../../../src/gql/generated/graphql';
import { getBooksForAuthorQuery } from '../_queries/getBooksForAuthorQuery';
import { BookForAuthorTableEntry, useColumns } from './BooksForAuthorTableColumns';

interface BooksForAuthorTableProps {
    authorId: string;
}

export function BooksForAuthorTable({ authorId }: BooksForAuthorTableProps) {
    const columns = useColumns();
    const router = useRouter();
    const t = useTranslations('book.common.fields');

    const query: SSRPaginatedQuery<BookForAuthorTableEntry> = createTableQuery(
        getBooksForAuthorQuery,
        'ListBookReadModels',
    );

    const filterModels: FilterModel<BookReadModel>[] = [
        {
            key: 'title',
            label: t('title.label'),
            type: FilterType.string,
        },
    ];

    return (
        <SearchParamControlledTable
            columns={columns}
            query={query}
            initialColumnFiltering={[
                {
                    id: 'author-id-default',
                    value: {
                        key: 'authorIds',
                        operation: FilterOperation.includes,
                        type: FilterType.string_array,
                        input: authorId,
                        inputDisplayValue: authorId,
                    },
                },
            ]}
            render={(table, isPending) => (
                <>
                    <TableFilters table={table} filterModels={filterModels} />
                    <DataTable
                        table={table}
                        isLoading={isPending}
                        onRowClick={(row) => router.push(`/books/${row.original.id}`)}
                    />
                </>
            )}
        />
    );
}
