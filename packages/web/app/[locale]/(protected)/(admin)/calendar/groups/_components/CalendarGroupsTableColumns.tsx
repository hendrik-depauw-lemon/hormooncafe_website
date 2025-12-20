'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import { ColorSwatch } from '../../../../../../../src/components/atoms/ColorSwatch';
import { GetCalendarGroupsQuery } from '../../../../../../../src/gql/generated/graphql';

export type CalendarGroupsTableEntry =
    GetCalendarGroupsQuery['ListCalendarGroupReadModels']['items'][number];

export const useColumns = (): ColumnDef<CalendarGroupsTableEntry>[] => {
    const t = useTranslations('calendar-groups.common.fields');

    return [
        {
            id: 'name',
            accessorKey: 'name',
            header: t('name.label'),
            enableColumnFilter: false,
            enableSorting: true,
        },
        {
            id: 'color',
            accessorKey: 'color',
            header: t('color.label'),
            enableColumnFilter: false,
            enableSorting: false,
            cell: ({ row }) =>
                row.original.color ? <ColorSwatch color={row.original.color} /> : null,
        },
    ];
};
