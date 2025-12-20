import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { ComboBoxMulti } from './ComboBoxMulti';

type Item = {
    value: string;
    label: string;
};

type ComboBoxMultiWithQueryProps = {
    value?: string[];
    placeholder?: string;
    noResultsMessage?: string;
    onChange: (value: string[]) => void;
    searchQuery: (searchTerm: string) => Promise<Item[]>;
    valueQuery: (value: string[]) => Promise<Item[]>;
    disabled?: boolean;
    hideBadges?: boolean;
    showAmountBadge?: boolean;
};

export function ComboBoxMultiWithQuery({
    value,
    placeholder,
    noResultsMessage,
    onChange,
    searchQuery,
    valueQuery,
    disabled,
    hideBadges = false,
    showAmountBadge = false,
}: ComboBoxMultiWithQueryProps) {
    const [items, setItems] = useState<Item[]>([]);
    const [valueItems, setValueItems] = useState<Item[]>([]);

    useEffect(() => {
        if (value) {
            valueQuery(value).then((items) => setValueItems(items));
        } else {
            setValueItems([]);
        }
    }, [value, valueQuery]);

    const onSearchTermChanges = useDebouncedCallback(async (searchTerm: string) => {
        const items = await searchQuery(searchTerm);
        setItems(items);
    }, 300);

    return (
        <ComboBoxMulti
            value={valueItems}
            onSearchTermChanges={onSearchTermChanges}
            items={items}
            placeholder={placeholder}
            noResultsMessage={noResultsMessage}
            onChange={onChange}
            disabled={disabled}
            hideBadges={hideBadges}
            showAmountBadge={showAmountBadge}
        />
    );
}
