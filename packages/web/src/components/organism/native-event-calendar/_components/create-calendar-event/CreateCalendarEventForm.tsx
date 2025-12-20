import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import z from 'zod';

import { useRouter } from '../../../../../i18n/navigation';
import { getClient } from '../../../../../utils/urql/getURQLClient';
import { CreateForm } from '../../../form/CreateForm';
import { createCalendarEventMutation } from '../../_actions/createCalendarEvent';
import { createRecurringCalendarEventMutation } from '../../_actions/createRecurringCalendarEvent';
import {
    CreateCalendarEventFields,
    createCalendarEventFieldsSchema,
} from './CreateCalendarEventFields';

interface CreateCalendarEventFormProps {
    defaultStartDateTime?: Date;
    timezone: string;
    onFinish?: () => void;
}

export function CreateCalendarEventForm({
    defaultStartDateTime,
    timezone,
    onFinish,
}: CreateCalendarEventFormProps) {
    const t = useTranslations('calendar');
    const router = useRouter();

    const handleOnSubmit = async (data: z.infer<typeof createCalendarEventFieldsSchema>) => {
        if (!data.isRecurringEvent) {
            const result = await getClient().mutation(createCalendarEventMutation, {
                input: {
                    calendarGroupId: data.calendarGroupId,
                    displayName: data.displayName,
                    description: data.description,
                    startDateTime: data.startDateTime,
                    endDateTime: data.endDateTime,
                    color: data.color,
                },
            });

            if (result.error || !result.data) return;

            toast.success(t('create.event-created-successfully'));
            router.refresh();
            onFinish?.();
        } else {
            const endOfRecurring = data.endDateForRecurringCalendarEvent
                ? new Date(
                      data.endDateForRecurringCalendarEvent.getTime() + (24 * 60 * 60 * 1000 - 1),
                  ) // End of day (already correct for timezone)
                : undefined;
            const result = await getClient().mutation(createRecurringCalendarEventMutation, {
                input: {
                    calendarGroupId: data.calendarGroupId,
                    displayName: data.displayName,
                    description: data.description,
                    color: data.color,

                    timezone: timezone,
                    durationInMinutes: Math.floor(
                        (data.endDateTime.getTime() - data.startDateTime.getTime()) / (60 * 1000),
                    ),
                    frequency: data.frequency,
                    onWeekdays: data.onWeekdays,
                    every: data.every,
                    startDate: data.startDateTime,
                    endDate: endOfRecurring,
                },
            });

            if (result.error || !result.data) return;

            toast.success(t('create.recurring-event-created-successfully'));
            router.refresh();
            onFinish?.();
        }
    };

    const defaultValues = {
        startDateTime: defaultStartDateTime || new Date(),
        endDateTime: defaultStartDateTime
            ? new Date(defaultStartDateTime.getTime() + 60 * 60 * 1000)
            : new Date(new Date().getTime() + 60 * 60 * 1000),
        isRecurringEvent: false,
        onWeekdays: [],
        every: 1,
    };

    return (
        <CreateForm
            defaultValues={defaultValues}
            schema={createCalendarEventFieldsSchema}
            onSubmit={handleOnSubmit}
            render={(props) => <CreateCalendarEventFields {...props} timezone={timezone} />}
        />
    );
}
