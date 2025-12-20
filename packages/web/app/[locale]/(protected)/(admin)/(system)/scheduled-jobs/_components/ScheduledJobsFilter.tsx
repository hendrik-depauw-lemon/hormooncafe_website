import { Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import {
    FilterModel,
    FilterType,
} from '../../../../../../../src/components/organism/filters/filter-model';
import { TableFilters } from '../../../../../../../src/components/organism/filters/TableFilters';
import { JobKey, ScheduledJobReadModel } from '../../../../../../../src/gql/generated/graphql';
import { ScheduledJobsTableEntry } from './ScheduledJobsTableColumns';

type ScheduledJobsFilterProps = {
    table: Table<ScheduledJobsTableEntry>;
};

export function ScheduledJobsFilter({ table }: ScheduledJobsFilterProps) {
    const t = useTranslations('scheduled-job.common.fields');

    const filterModels: FilterModel<ScheduledJobReadModel>[] = [
        {
            key: 'name',
            label: t('name.label'),
            type: FilterType.string,
        },
        {
            key: 'schedule',
            label: t('schedule.label'),
            type: FilterType.string,
        },
        {
            key: 'active',
            label: t('active.label'),
            type: FilterType.boolean,
        },
        {
            key: 'jobKey',
            label: t('job-key.label'),
            type: FilterType.enum,
            enumValues: Object.keys(JobKey).map((key) => ({ label: key, value: key })),
        },
        {
            key: 'createdAt',
            label: t('created-at.label'),
            type: FilterType.date,
        },
        {
            key: 'updatedAt',
            label: t('updated-at.label'),
            type: FilterType.date,
        },
    ];

    return <TableFilters table={table} filterModels={filterModels} />;
}
