'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import { ListPublisherReadModelsQuery } from '../../../../../../src/gql/generated/graphql';

export type PublishersTableEntry =
    ListPublisherReadModelsQuery['ListPublisherReadModels']['items'][number];

export const useColumns = (): ColumnDef<PublishersTableEntry>[] => {
    const t = useTranslations('publisher.common.fields');

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
