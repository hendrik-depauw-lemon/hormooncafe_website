import { compact } from 'lodash-es';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import { getClient } from '../../../../utils/urql/getURQLClient';
import { ComboBoxMultiWithQuery } from '../ComboBoxMultiWithQuery';
import { getAvailableCalendarGroupsQuery } from './_queries/getAvailableCalendarGroupsQuery';
import { getCalendarGroupsForComboBoxQuery } from './_queries/getCalendarGroupsForComboBox';

type CalendarGroupComboBoxMultiWithQueryProps = {
    value: string[];
    onChange: (value: string[]) => void;
    disabled?: boolean;
    hideBadges?: boolean;
    showAmountBadge?: boolean;
};

export function CalendarGroupComboBoxMultiWithQuery({
    value,
    onChange,
    disabled,
    hideBadges = false,
    showAmountBadge = false,
}: CalendarGroupComboBoxMultiWithQueryProps) {
    const t = useTranslations('common.combo-box.calendar-group.multi');

    const searchQuery = useCallback(async (searchTerm: string) => {
        const result = await getClient().query(getAvailableCalendarGroupsQuery, { searchTerm });
        return (
            result.data?.ListCalendarGroupReadModels?.items.map((calendarGroup) => ({
                value: calendarGroup.id,
                label: calendarGroup.name,
            })) ?? []
        );
    }, []);

    const valueQuery = useCallback(async (ids: string[]) => {
        const result = await getClient().query(getCalendarGroupsForComboBoxQuery, { ids });

        const calendarGroups = ids.map((id) => {
            const calendarGroup = result.data?.ListCalendarGroupReadModels?.items.find(
                (p) => p.id === id,
            );
            return calendarGroup ? { value: calendarGroup.id, label: calendarGroup.name } : null;
        });
        return compact(calendarGroups);
    }, []);

    return (
        <ComboBoxMultiWithQuery
            value={value}
            onChange={onChange}
            searchQuery={searchQuery}
            valueQuery={valueQuery}
            placeholder={t('placeholder')}
            noResultsMessage={t('no-results-message')}
            disabled={disabled}
            hideBadges={hideBadges}
            showAmountBadge={showAmountBadge}
        />
    );
}
