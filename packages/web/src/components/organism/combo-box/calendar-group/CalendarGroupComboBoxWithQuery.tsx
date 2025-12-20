import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import { getClient } from '../../../../utils/urql/getURQLClient';
import { ComboBoxWithQuery } from '../ComboBoxWithQuery';
import { getAvailableCalendarGroupsQuery } from './_queries/getAvailableCalendarGroupsQuery';
import { getCalendarGroupForComboBoxQuery } from './_queries/getCalendarGroupForComboBox';

type CalendarGroupComboBoxWithQueryProps = {
    value: string | undefined | null;
    onChange: (value: string | undefined | null) => void;
    disabled?: boolean;
};

export function CalendarGroupComboBoxWithQuery({
    value,
    onChange,
    disabled,
}: CalendarGroupComboBoxWithQueryProps) {
    const t = useTranslations('common.combo-box.calendar-group');

    const searchQuery = useCallback(async (searchTerm: string) => {
        const result = await getClient().query(getAvailableCalendarGroupsQuery, { searchTerm });
        return (
            result.data?.ListCalendarGroupReadModels?.items.map((calendarGroup) => ({
                value: calendarGroup.id,
                label: calendarGroup.name,
            })) ?? []
        );
    }, []);

    const valueQuery = useCallback(async (id: string) => {
        const result = await getClient().query(getCalendarGroupForComboBoxQuery, { id });
        const calendarGroup = result.data?.CalendarGroupReadModel;
        if (!calendarGroup) return undefined;
        return { value: calendarGroup.id, label: calendarGroup.name };
    }, []);

    return (
        <ComboBoxWithQuery
            value={value}
            onChange={onChange}
            searchQuery={searchQuery}
            valueQuery={valueQuery}
            placeholder={t('placeholder')}
            noResultsMessage={t('no-results-message')}
            disabled={disabled}
        />
    );
}
