import { Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import {
    FilterModel,
    FilterType,
} from '../../../../../../../src/components/organism/filters/filter-model';
import { TableFilters } from '../../../../../../../src/components/organism/filters/TableFilters';
import { JobExecutionStatus } from '../../../../../../../src/gql/generated/graphql';
import { JobExecutionsTableEntry } from './JobExecutionsTableColumns';

type JobExecutionsFilterProps = {
    table: Table<JobExecutionsTableEntry>;
};

export function JobExecutionsFilter({ table }: JobExecutionsFilterProps) {
    const t = useTranslations('job.overview.0.table.headers');
    const enumT = useTranslations('job.status');

    const filterModels: FilterModel<JobExecutionsTableEntry>[] = [
        {
            key: 'name',
            label: t('name'),
            type: FilterType.string,
        },
        {
            key: 'startedAt',
            label: t('started-at'),
            type: FilterType.date,
        },
        {
            key: 'completedAt',
            label: t('completed-at'),
            type: FilterType.date,
        },
        {
            key: 'status',
            label: t('status'),
            type: FilterType.enum,
            enumValues: [
                { label: enumT('PENDING'), value: JobExecutionStatus.Pending },
                { label: enumT('IN_PROGRESS'), value: JobExecutionStatus.InProgress },
                { label: enumT('COMPLETED'), value: JobExecutionStatus.Completed },
                { label: enumT('FAILED'), value: JobExecutionStatus.Failed },
            ],
        },
        {
            key: 'createdAt',
            label: t('created-at'),
            type: FilterType.date,
        },
        {
            key: 'updatedAt',
            label: t('updated-at'),
            type: FilterType.date,
        },
        {
            key: 'totalItems',
            label: t('total-items'),
            type: FilterType.number,
        },
        {
            key: 'successfulItems',
            label: t('successful-items'),
            type: FilterType.number,
        },
        {
            key: 'failedItems',
            label: t('failed-items'),
            type: FilterType.number,
        },
        {
            key: 'summary',
            label: t('summary'),
            type: FilterType.string,
        },
    ];

    return <TableFilters table={table} filterModels={filterModels} />;
}
