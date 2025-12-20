'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import { ListBookReadModelsQuery } from '../../../../../../src/gql/generated/graphql';
import { formatDate } from '../../../../../../src/utils/formatDate';

export type BooksTableEntry = ListBookReadModelsQuery['ListBookReadModels']['items'][number];

export const useColumns = (): ColumnDef<BooksTableEntry>[] => {
    const t = useTranslations('book.common.fields');

    return [
        {
            id: 'title',
            accessorKey: 'title',
            header: t('title.label'),
            enableColumnFilter: false,
            enableSorting: true,
        },
        {
            id: 'publishDate',
            accessorKey: 'publishDate',
            header: t('publish-date.label'),
            enableColumnFilter: false,
            enableSorting: true,
            cell: ({ row }) => formatDate(row.original.publishDate),
        },
        {
            id: 'authorNames',
            accessorKey: 'authorNames',
            header: t('author-names.label'),
            enableColumnFilter: false,
            enableSorting: true,
            cell: ({ row }) => row.original.authorNames?.join(', '),
        },
        {
            id: 'publisherName',
            accessorKey: 'publisherName',
            header: t('publisher-name.label'),
            enableColumnFilter: false,
            enableSorting: true,
        },
    ];
};
