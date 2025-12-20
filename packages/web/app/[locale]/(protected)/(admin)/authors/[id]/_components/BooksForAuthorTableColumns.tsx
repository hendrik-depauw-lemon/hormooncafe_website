'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import { ListBookReadModelsForAuthorQuery } from '../../../../../../../src/gql/generated/graphql';
import { formatDateTime } from '../../../../../../../src/utils/formatDate';

export type BookForAuthorTableEntry =
    ListBookReadModelsForAuthorQuery['ListBookReadModels']['items'][number];

export const useColumns = (): ColumnDef<BookForAuthorTableEntry>[] => {
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
            cell: ({ row }) => {
                return formatDateTime(row.original.publishDate);
            },
            enableColumnFilter: false,
            enableSorting: true,
        },
    ];
};
