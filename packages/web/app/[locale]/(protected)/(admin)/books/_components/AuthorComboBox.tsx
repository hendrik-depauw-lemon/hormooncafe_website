import { compact } from 'lodash-es';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import { ComboBoxMultiWithQuery } from '../../../../../../src/components/organism/combo-box/ComboBoxMultiWithQuery';
import { getClient } from '../../../../../../src/utils/urql/getURQLClient';
import { getAuthorsQuery } from '../_queries/getAuthors';
import { searchAuthorsQuery } from '../_queries/searchAuthors';

type AuthorComboBoxProps = {
    value: string[];
    onChange: (value: string[]) => void;
};

export function AuthorComboBox({ value, onChange }: AuthorComboBoxProps) {
    const t = useTranslations('book.common.fields');

    const searchQuery = useCallback(async (searchTerm: string) => {
        const result = await getClient().query(searchAuthorsQuery, { searchTerm });
        return (
            result.data?.ListAuthorReadModels?.items.map((author) => ({
                value: author.id,
                label: author.name,
            })) ?? []
        );
    }, []);

    const valueQuery = useCallback(async (ids: string[]) => {
        const result = await getClient().query(getAuthorsQuery, { ids });

        const authors = ids.map((id) => {
            const author = result.data?.ListAuthorReadModels?.items.find(
                (author) => author.id === id,
            );
            return author ? { value: author.id, label: author.name } : null;
        });
        return compact(authors);
    }, []);

    return (
        <ComboBoxMultiWithQuery
            value={value}
            onChange={onChange}
            searchQuery={searchQuery}
            valueQuery={valueQuery}
            placeholder={t('author.placeholder')}
            noResultsMessage={t('author.no-results')}
        />
    );
}
