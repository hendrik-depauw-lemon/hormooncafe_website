import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { CalendarEventReadModel } from '../../../../../gql/generated/graphql';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '../../../../../shadcn/components/ui/dialog';
import { getClient } from '../../../../../utils/urql/getURQLClient';
import { ErrorOverlay } from '../../../../atoms/ErrorOverlay';
import { LoadingOverlay } from '../../../../atoms/LoadingOverlay';
import { getCalendarEventReadModel } from '../../_queries/getCalendarEventReadModel';
import { UpdateCalendarEventForm } from './UpdateCalendarEventForm';

interface UpdateCalendarEventDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    calendarEventId: string | undefined;
    timezone: string;
    onFinish?: () => void;
}

export function UpdateCalendarEventDialog({
    open,
    onOpenChange,
    calendarEventId,
    timezone,
    onFinish,
}: UpdateCalendarEventDialogProps) {
    const t = useTranslations('calendar.update');
    const [loading, setLoading] = useState(true);
    const [calendarEvent, setCalendarEvent] = useState<CalendarEventReadModel | undefined>(
        undefined,
    );
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!open) return;
        setLoading(true);
        setError(undefined);

        if (!calendarEventId) {
            setLoading(false);
            setError(t('issue-loading-event'));
            console.error('No calendar event ID provided to UpdateCalendarEventDialog');
            return;
        }

        const fetchEvent = async () => {
            const result = await getClient().query(getCalendarEventReadModel, {
                id: calendarEventId,
            });
            if (result.error) {
                setError(t('issue-loading-event'));
                console.error('Error fetching calendar event:', result.error);
                return;
            }

            const data = result.data?.CalendarEventReadModel;
            if (!data) {
                setError(t('issue-loading-event'));
                console.error('No calendar event data returned for ID:', calendarEventId);
                return;
            }
            setCalendarEvent(data);
        };

        fetchEvent()
            .catch((e) => {
                console.error('Error fetching calendar event:', e);
                setError(t('issue-loading-event'));
            })
            .finally(() => {
                setLoading(false);
            });
    }, [calendarEventId, open]);

    const onOpenChangeWrapper = (open: boolean) => {
        onOpenChange(open);
        if (!open) {
            setTimeout(() => {
                setCalendarEvent(undefined);
                setError(undefined);
            }, 500);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
            <DialogContent className="max-h-[90%] min-h-[400px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{t('title')}</DialogTitle>
                </DialogHeader>

                {error && <ErrorOverlay message={error} />}
                {loading && <LoadingOverlay />}
                {calendarEvent && (
                    <UpdateCalendarEventForm
                        calendarEvent={calendarEvent}
                        timezone={timezone}
                        onFinish={onFinish}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
