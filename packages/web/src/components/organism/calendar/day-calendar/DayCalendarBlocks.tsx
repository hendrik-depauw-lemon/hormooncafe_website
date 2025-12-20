'use client';

import { useMemo } from 'react';

import { cn } from '../../../../shadcn/lib/utils';

interface DayCalendarBlocksProps {
    calendarSize: 'small' | 'medium' | 'large';
    showDividers?: boolean;
}

export function DayCalendarBlocks({ calendarSize, showDividers = true }: DayCalendarBlocksProps) {
    const blocksPerHour = useMemo(() => {
        switch (calendarSize) {
            case 'small':
                return 1;
            case 'large':
                return 4;
            case 'medium':
            default:
                return 2;
        }
    }, [calendarSize]);

    return (
        <div
            style={{
                gridTemplateRows: `repeat(${blocksPerHour * 24}, minmax(2rem, 1fr))`,
            }}
            className={cn(
                'col-start-1 col-end-2 row-start-1 grid',
                showDividers ? 'divide-y divide-muted' : '',
            )}
        >
            <div className="row-end-1 h-4" />
            {Array.from({ length: blocksPerHour * 24 }).map((_, index) => (
                <div key={`line-${index}`} />
            ))}
        </div>
    );
}
