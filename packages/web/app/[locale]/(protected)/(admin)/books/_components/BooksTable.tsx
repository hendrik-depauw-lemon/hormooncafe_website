'use client';

import { DataTable } from '@/src/components/organism/tables/DataTable';
import SearchParamControlledTable from '@/src/components/organism/tables/SearchParamControlledDataTable';
import { useRouter } from '@/src/i18n/navigation';
import { SSRPaginatedQuery } from '@/src/types/DataTable/SSRPaginatedQuery';

import {
    FilterModel,
    FilterType,
} from '../../../../../../src/components/organism/filters/filter-model';
import { TableFilters } from '../../../../../../src/components/organism/filters/TableFilters';
import { createTableQuery } from '../../../../../../src/components/organism/tables/create-table-query';
import { BookCoverType, BookReadModel } from '../../../../../../src/gql/generated/graphql';
import { getBooksQuery } from '../_queries/getBooks';
import { BooksTableEntry, useColumns } from './BooksTableColumns';

export function BooksTable() {
    const columns = useColumns();
    const router = useRouter();

    const query: SSRPaginatedQuery<BooksTableEntry> = createTableQuery(
        getBooksQuery,
        'ListBookReadModels',
    );

    const filterModels: FilterModel<BookReadModel>[] = [
        {
            key: 'title',
            label: 'Titel',
            type: FilterType.string,
        },
        {
            key: 'authorNames',
            label: 'Auteurs',
            type: FilterType.string_array,
        },
        {
            key: 'availableAsEbook',
            label: 'E-book beschikbaar',
            type: FilterType.boolean,
        },
        {
            key: 'coverType',
            label: 'Type kaft',
            type: FilterType.enum,
            enumValues: [
                { label: 'Hardcover', value: BookCoverType.Hardcover },
                { label: 'Paperback', value: BookCoverType.Paperback },
            ],
        },
        {
            key: 'createdAt',
            label: 'Aangemaakt op',
            type: FilterType.date,
        },
        {
            key: 'updatedAt',
            label: 'Bijgewerkt op',
            type: FilterType.date,
        },
        {
            key: 'description',
            label: 'Beschrijving',
            type: FilterType.string,
        },
        {
            key: 'numberOfPages',
            label: "Aantal pagina's",
            type: FilterType.number,
        },
        {
            key: 'publishDate',
            label: 'Publicatiedatum',
            type: FilterType.date,
        },
        {
            key: 'publisherName',
            label: 'Uitgever',
            type: FilterType.string,
        },
    ];

    return (
        <SearchParamControlledTable
            columns={columns}
            query={query}
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
