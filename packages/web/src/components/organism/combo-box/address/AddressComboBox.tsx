import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import { ComboBoxWithQuery } from '../ComboBoxWithQuery';
import { getAddress } from './_queries/getAddressQuery';
import { searchAddresses } from './_queries/searchAddressesQuery';

type AddressComboBoxProps = {
    value?: string;
    onChange: (value: string | undefined | null) => void;
    disabled?: boolean;
};

export function AddressComboBox(props: AddressComboBoxProps) {
    const t = useTranslations('common.combo-box.address-autocomplete');

    const valueQuery = useCallback(async (value: string) => {
        const place = await getAddress(value);

        return { value: place.PlaceId ?? '', label: place.Title ?? '' };
    }, []);

    const searchQuery = useCallback(async (searchTerm: string) => {
        if (searchTerm.length < 3) return [];

        const results = await searchAddresses(searchTerm);
        return (
            results.ResultItems?.map((result) => ({
                value: result.PlaceId ?? '',
                label: result.Title ?? '',
            })) ?? []
        );
    }, []);

    return (
        <ComboBoxWithQuery
            value={props.value}
            placeholder={t('placeholder')}
            noResultsMessage={t('no-results')}
            onChange={props.onChange}
            searchQuery={searchQuery}
            valueQuery={valueQuery}
            disabled={props.disabled}
        />
    );
}
