import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import { ComboBoxWithQuery } from '../../../../../../src/components/organism/combo-box/ComboBoxWithQuery';
import { getClient } from '../../../../../../src/utils/urql/getURQLClient';
import { getPublishersQuery } from '../_queries/getPublishers';
import { searchPublishersQuery } from '../_queries/searchPublishers';

type PublisherComboBoxProps = {
    value?: string;
    onChange: (item: string | undefined | null) => void;
};

export function PublisherComboBox({ value, onChange }: PublisherComboBoxProps) {
    const t = useTranslations('book.common.fields');

    const searchQuery = useCallback(async (searchTerm: string) => {
        const result = await getClient().query(searchPublishersQuery, { searchTerm });
        return (
            result.data?.ListPublisherReadModels?.items.map((publisher) => ({
                value: publisher.id,
                label: publisher.name,
            })) ?? []
        );
    }, []);

    const valueQuery = useCallback(async (id: string) => {
        const result = await getClient().query(getPublishersQuery, { ids: [id] });
        const publisher = result.data?.ListPublisherReadModels?.items[0];
        if (publisher) {
            return { value: publisher.id, label: publisher.name };
        }
        return undefined;
    }, []);

    return (
        <ComboBoxWithQuery
            value={value}
            onChange={onChange}
            searchQuery={searchQuery}
            valueQuery={valueQuery}
            placeholder={t('publisher.placeholder')}
            unselectMessage={t('publisher.unselect')}
            noResultsMessage={t('publisher.no-results')}
        />
    );
}
