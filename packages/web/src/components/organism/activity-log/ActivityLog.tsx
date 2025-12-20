'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useQuery } from 'urql';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../../../shadcn/components/ui/accordion';
import { formatDateTime } from '../../../utils/formatDate';
import { PrettyJson } from '../../atoms/PrettyJson';
import { Muted } from '../../atoms/typography/Muted';
import { Small } from '../../atoms/typography/Small';
import { getEntityHistoryQuery } from './queries/getEntityHistory';
import { SortingButton } from './SortingButton';

type ActivityLogProps = {
    entityTypeName: string;
    entityId: string;
};

function isDate(value: string): boolean {
    try {
        return new Date(value).toISOString() === value;
    } catch {
        return false;
    }
}

function formatValue(value?: string): string {
    if (!value) return `''`;
    if (isDate(value)) return formatDateTime(new Date(value));
    return value;
}

function convertNewValueAndOldValueToArrow(value: unknown): unknown {
    return JSON.parse(JSON.stringify(value), (key: string, value: unknown) => {
        if (value && typeof value === 'object' && ('newValue' in value || 'oldValue' in value)) {
            const typedValue = value as { newValue?: string; oldValue?: string };
            return `${formatValue(typedValue.oldValue)} -> ${formatValue(typedValue.newValue)}`;
        }
        return value;
    });
}

export function ActivityLog({ entityTypeName, entityId }: ActivityLogProps) {
    const t = useTranslations('common.activity-log');
    const [{ data }] = useQuery({
        query: getEntityHistoryQuery,
        variables: { entityTypeName, entityId },
    });
    const [isSorted, setIsSorted] = useState<'asc' | 'desc'>('desc');

    return (
        <div className="flex flex-col gap-4">
            <SortingButton
                isSorted={isSorted}
                onClick={() => setIsSorted((current) => (current === 'asc' ? 'desc' : 'asc'))}
            />
            <Accordion type="multiple" className="max-h-[600px] overflow-auto">
                {data?.GetEntityHistory?.events
                    .sort((a, b) => {
                        if (isSorted === 'asc') {
                            return a.date.getTime() - b.date.getTime();
                        }
                        return b.date.getTime() - a.date.getTime();
                    })
                    .map((event) => (
                        <AccordionItem key={event.id} value={event.id || ''}>
                            <AccordionTrigger>
                                <div className="flex flex-col">
                                    <Muted>{formatDateTime(event.date)}</Muted>
                                    <div>
                                        <Small className="inline">{event.type} </Small>
                                        {event.user.email && (
                                            <Muted className="inline">
                                                {t('by')} {event.user.email}
                                            </Muted>
                                        )}
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <Muted>
                                    <PrettyJson
                                        data={convertNewValueAndOldValueToArrow(event.diff)}
                                    />
                                </Muted>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
            </Accordion>
        </div>
    );
}
