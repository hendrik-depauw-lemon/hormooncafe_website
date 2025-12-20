import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { RecurringCalendarEventReadModel } from '../../../../../gql/generated/graphql';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '../../../../../shadcn/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../shadcn/components/ui/tabs';
import { getClient } from '../../../../../utils/urql/getURQLClient';
import { ErrorOverlay } from '../../../../atoms/ErrorOverlay';
import { LoadingOverlay } from '../../../../atoms/LoadingOverlay';
import { getRecurringCalendarEventReadModel } from '../../_queries/getRecurringCalendarEventReadModel';
import { UpdateRecurringCalendarEventForm } from './UpdateRecurringCalendarEventForm';
import { UpdateRecurringCalendarEventInstanceForm } from './UpdateRecurringCalendarEventInstanceForm';

interface UpdateRecurringCalendarEventDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    recurringCalendarEventId: string | undefined;
    timezone: string;
    occurrenceStartDateTimeToUpdate: Date | undefined;
    onFinish?: () => void;
}

export function UpdateRecurringCalendarEventDialog({
    open,
    onOpenChange,
    recurringCalendarEventId,
    timezone,
    occurrenceStartDateTimeToUpdate,
    onFinish,
}: UpdateRecurringCalendarEventDialogProps) {
    const t = useTranslations('calendar.update');
    const [loading, setLoading] = useState(true);
    const [recurringCalendarEvent, setRecurringCalendarEvent] = useState<
        RecurringCalendarEventReadModel | undefined
    >(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!open) return;
        setLoading(true);
        setError(undefined);

        if (!recurringCalendarEventId) {
            setLoading(false);
            setError(t('issue-loading-event'));
            console.error(
                'No recurring calendar event ID provided to UpdateRecurringCalendarEventDialog',
            );
            return;
        }

        const fetchEvent = async () => {
            const result = await getClient().query(getRecurringCalendarEventReadModel, {
                id: recurringCalendarEventId,
            });
            if (result.error) {
                setError(t('issue-loading-event'));
                console.error('Error fetching recurring calendar event:', result.error);
                return;
            }

            const data = result.data?.RecurringCalendarEventReadModel;
            if (!data) {
                setError(t('issue-loading-event'));
                console.error(
                    'No recurring calendar event data returned for ID:',
                    recurringCalendarEventId,
                );
                return;
            }
            setRecurringCalendarEvent(data);
        };

        fetchEvent()
            .catch((e) => {
                console.error('Error fetching recurring calendar event:', e);
                setError(t('issue-loading-event'));
            })
            .finally(() => {
                setLoading(false);
            });
    }, [recurringCalendarEventId, open]);

    const onOpenChangeWrapper = (open: boolean) => {
        onOpenChange(open);
        if (!open) {
            setTimeout(() => {
                setRecurringCalendarEvent(undefined);
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
                {recurringCalendarEvent && (
                    <Tabs defaultValue="recurring-event-one-instance">
                        <TabsList className="w-full">
                            <TabsTrigger value="recurring-event-one-instance">
                                {t('recurring-event-one-instance')}
                            </TabsTrigger>
                            <TabsTrigger value="recurring-event-all-instances">
                                {t('recurring-event-all-instances')}
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="recurring-event-one-instance">
                            <UpdateRecurringCalendarEventInstanceForm
                                recurringCalendarEvent={recurringCalendarEvent}
                                timezone={timezone}
                                occurrenceStartDateTimeToUpdate={occurrenceStartDateTimeToUpdate}
                                onFinish={onFinish}
                            />
                        </TabsContent>
                        <TabsContent value="recurring-event-all-instances">
                            <UpdateRecurringCalendarEventForm
                                recurringCalendarEvent={recurringCalendarEvent}
                                timezone={timezone}
                                onFinish={onFinish}
                            />
                        </TabsContent>
                    </Tabs>
                )}
            </DialogContent>
        </Dialog>
    );
}
