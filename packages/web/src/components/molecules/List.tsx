import { FC, ReactNode } from 'react';

import { Muted } from '../atoms/typography/Muted';
import { Small } from '../atoms/typography/Small';

interface ListProps {
    items: { key: string; value: ReactNode }[];
}
const List: FC<ListProps> = ({ items }) => (
    <div className="flex flex-col divide-y divide-border">
        {items.map((item) => (
            <div
                key={item.key}
                className="flex justify-between items-center py-4 first:pt-0 last:pb-0"
            >
                <Small>{item.key}</Small>
                <Muted>{item.value}</Muted>
            </div>
        ))}
    </div>
);
List.displayName = 'List';

export default List;
