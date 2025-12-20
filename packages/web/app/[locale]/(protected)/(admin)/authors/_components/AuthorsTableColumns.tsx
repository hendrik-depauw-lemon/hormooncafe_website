'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import { ListAuthorReadModelsQuery } from '../../../../../../src/gql/generated/graphql';

export type AuthorsTableEntry = ListAuthorReadModelsQuery['ListAuthorReadModels']['items'][number];

export const useColumns = (): ColumnDef<AuthorsTableEntry>[] => {
    const t = useTranslations('author.common.fields');

    return [
        {
            id: 'id',
            accessorKey: 'id',
            header: t('id.label'),
            enableColumnFilter: false,
            enableSorting: true,
        },
        {
            id: 'name',
            accessorKey: 'name',
            header: t('name.label'),
            enableColumnFilter: false,
            enableSorting: true,
        },
    ];
};
