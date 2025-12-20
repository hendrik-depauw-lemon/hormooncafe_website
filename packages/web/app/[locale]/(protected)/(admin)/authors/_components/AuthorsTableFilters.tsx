'use client';

import { Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import {
    FilterModel,
    FilterType,
} from '../../../../../../src/components/organism/filters/filter-model';
import { TableFilters } from '../../../../../../src/components/organism/filters/TableFilters';
import { AuthorsTableEntry } from './AuthorsTableColumns';

interface AuthorsTableFiltersProps {
    table: Table<AuthorsTableEntry>;
}
export const AuthorsTableFilters = ({ table }: AuthorsTableFiltersProps) => {
    const t = useTranslations('author.common.fields');

    const filterModels: FilterModel[] = [
        {
            key: 'name',
            label: t('name.label'),
            type: FilterType.string,
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
};
