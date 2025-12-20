'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Pause, Play } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ListScheduledJobReadModelsQuery } from '../../../../../../../src/gql/generated/graphql';
import { ScheduleDescription } from './ScheduleDescription';

export type ScheduledJobsTableEntry =
    ListScheduledJobReadModelsQuery['ListScheduledJobReadModels']['items'][number];

export const useColumns = (): ColumnDef<ScheduledJobsTableEntry>[] => {
    const t = useTranslations('scheduled-job.common.fields');

    return [
        {
            id: 'active',
            accessorKey: 'active',
            header: '',
            enableColumnFilter: false,
            enableSorting: false,
            cell: ({ row }) => (row.original.active ? <Play /> : <Pause />),
        },
        {
            id: 'name',
            accessorKey: 'name',
            header: t('name.label'),
            enableColumnFilter: false,
            enableSorting: true,
        },
        {
            id: 'schedule',
            accessorKey: 'schedule',
            header: t('schedule.label'),
            enableColumnFilter: false,
            enableSorting: true,
            cell: ({ row }) => <ScheduleDescription schedule={row.original.schedule} />,
        },
        {
            id: 'jobKey',
            accessorKey: 'jobKey',
            header: t('job-key.label'),
            enableColumnFilter: false,
            enableSorting: true,
        },
    ];
};
