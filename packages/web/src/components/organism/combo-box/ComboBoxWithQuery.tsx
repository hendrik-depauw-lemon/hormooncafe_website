import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { ComboBox } from './ComboBox';

type Item = {
    value: string;
    label: string;
};

type ComboBoxWithQueryProps = {
    value?: string | undefined | null;
    placeholder?: string;
    unselectMessage?: string;
    noResultsMessage?: string;
    onChange: (item: string | undefined | null) => void;
    searchQuery: (searchTerm: string) => Promise<Item[]>;
    valueQuery: (value: string) => Promise<Item | undefined>;
    disabled?: boolean;
};

export function ComboBoxWithQuery({
    value,
    placeholder,
    unselectMessage,
    noResultsMessage,
    onChange,
    searchQuery,
    valueQuery,
    disabled,
}: ComboBoxWithQueryProps) {
    const [items, setItems] = useState<Item[]>([]);
    const [valueItem, setValueItem] = useState<Item | undefined | null>(null);

    useEffect(() => {
        if (value) {
            valueQuery(value).then((item) => setValueItem(item));
        } else {
            setValueItem(null);
        }
    }, [value, valueQuery]);

    const onSearchTermChanges = useDebouncedCallback(async (searchTerm: string) => {
        const items = await searchQuery(searchTerm);
        setItems(items);
    }, 300);

    return (
        <ComboBox
            value={valueItem}
            onSearchTermChanges={onSearchTermChanges}
            items={items}
            placeholder={placeholder}
            unselectMessage={unselectMessage}
            noResultsMessage={noResultsMessage}
            onChange={onChange}
            disabled={disabled}
        />
    );
}
