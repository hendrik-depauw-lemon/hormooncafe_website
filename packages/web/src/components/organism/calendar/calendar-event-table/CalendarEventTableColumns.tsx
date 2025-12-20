'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import { formatDateTime } from '../../../../utils/formatDate';
import { ColorSwatch } from '../../../atoms/ColorSwatch';
import { CalendarEvent } from '../calendar-types';

export type CalendarEventTableEntry = CalendarEvent;

export const useColumns = (): ColumnDef<CalendarEventTableEntry>[] => {
    const t = useTranslations('calendar.common.fields');

    return [
        {
            id: 'startDateTime',
            accessorKey: 'startDateTime',
            header: t('start-date-time.label'),
            enableColumnFilter: false,
            enableSorting: true,
            cell: ({ row }) => formatDateTime(row.original.startDateTime),
        },
        {
            id: 'endDateTime',
            accessorKey: 'endDateTime',
            header: t('end-date-time.label'),
            enableColumnFilter: false,
            enableSorting: true,
            cell: ({ row }) => formatDateTime(row.original.endDateTime),
        },
        {
            id: 'title',
            accessorKey: 'title',
            header: t('title.label'),
            enableColumnFilter: false,
            enableSorting: false,
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
