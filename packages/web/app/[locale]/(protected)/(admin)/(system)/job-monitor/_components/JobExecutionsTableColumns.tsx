'use client';

import { ColumnDef } from '@tanstack/react-table';
import { capitalize } from 'lodash-es';
import { useTranslations } from 'next-intl';

import { ListJobExecutionReadModelsQuery } from '../../../../../../../src/gql/generated/graphql';
import { Progress } from '../../../../../../../src/shadcn/components/ui/progress';
import { formatDateTime } from '../../../../../../../src/utils/formatDate';
import { formatDuration } from '../../../../../../../src/utils/formatDuration';
import { JobStatusBadge } from './JobStatusBadge';

export type JobExecutionsTableEntry =
    ListJobExecutionReadModelsQuery['ListJobExecutionReadModels']['items'][number];

export const useColumns = (): ColumnDef<JobExecutionsTableEntry>[] => {
    const t = useTranslations('job.common.fields');

    return [
        {
            id: 'name',
            accessorKey: 'name',
            header: t('name.label'),
            enableColumnFilter: false,
            enableSorting: true,
        },
        {
            id: 'status',
            accessorKey: 'status',
            header: t('status.label'),
            enableColumnFilter: false,
            enableSorting: true,
            cell: ({ row }) => <JobStatusBadge status={row.original.status} />,
        },
        {
            id: 'totalItems',
            accessorKey: 'totalItems',
            header: t('total-items.label'),
            enableColumnFilter: false,
            enableSorting: true,
            cell: ({ row }) => <span>{row.original.totalItems || '?'}</span>,
        },
        {
            id: 'progress',
            accessorKey: 'progress',
            header: t('progress.label'),
            enableColumnFilter: false,
            enableSorting: true,
            cell: ({ row }) => <Progress value={row.original.progress} />,
        },
        {
            id: 'successfulItems',
            accessorKey: 'successfulItems',
            header: t('successful-items.label'),
            enableColumnFilter: false,
            enableSorting: true,
            cell: ({ row }) => <span>{row.original.successfulItems || 0}</span>,
        },
        {
            id: 'failedItems',
            accessorKey: 'failedItems',
            header: t('failed-items.label'),
            enableColumnFilter: false,
            enableSorting: true,
            cell: ({ row }) => (
                <span className="text-destructive">{row.original.failedItems || 0}</span>
            ),
        },
        {
            id: 'durationInSeconds',
            accessorKey: 'durationInSeconds',
            header: t('duration.label'),
            enableColumnFilter: false,
            enableSorting: true,
            cell: ({ row }) =>
                row.original.durationInSeconds
                    ? capitalize(formatDuration(row.original.durationInSeconds))
                    : '',
        },
        {
            id: 'startedAt',
            accessorKey: 'startedAt',
            header: t('started-at.label'),
            enableColumnFilter: false,
            enableSorting: true,
            cell: ({ row }) => formatDateTime(row.original.startedAt),
        },
        {
            id: 'completedAt',
            accessorKey: 'completedAt',
            header: t('completed-at.label'),
            enableColumnFilter: false,
            enableSorting: true,
            cell: ({ row }) => formatDateTime(row.original.completedAt),
        },
    ];
};
