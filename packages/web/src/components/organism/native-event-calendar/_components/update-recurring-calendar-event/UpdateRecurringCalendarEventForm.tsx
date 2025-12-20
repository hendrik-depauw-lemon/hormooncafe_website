import { LucideTrash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import z from 'zod';

import {
    CalendarWeekday,
    RecurringCalendarEventReadModel,
} from '../../../../../gql/generated/graphql';
import { useRouter } from '../../../../../i18n/navigation';
import { getClient } from '../../../../../utils/urql/getURQLClient';
import { ButtonWithConfirmation } from '../../../ButtonWithConfirmation';
import { UpdateActions } from '../../../form/actions/UpdateActions';
import { Form } from '../../../form/Form';
import { deleteRecurringCalendarEventMutation } from '../../_actions/deleteRecurringCalendarEvent';
import { updateRecurringCalendarEventMutation } from '../../_actions/updateRecurringCalendarEvent';
import {
    UpdateRecurringCalendarEventFields,
    updateRecurringCalendarEventFieldsSchema,
} from './UpdateRecurringCalendarEventFields';

interface UpdateRecurringCalendarEventFormProps {
    recurringCalendarEvent: RecurringCalendarEventReadModel;
    timezone: string;
    onFinish?: () => void;
}

export function UpdateRecurringCalendarEventForm({
    recurringCalendarEvent,
    onFinish,
    timezone,
}: UpdateRecurringCalendarEventFormProps) {
    const t = useTranslations('calendar');
    const router = useRouter();

    const updateRecurringCalendarEvent = async (
        data: z.infer<typeof updateRecurringCalendarEventFieldsSchema>,
    ) => {
        const durationInMinutes = Math.floor(
            (data.endDateTime.getTime() - data.startDateTime.getTime()) / (60 * 1000),
        );
        const endOfRecurring = data.endDateForRecurringCalendarEvent
            ? new Date(data.endDateForRecurringCalendarEvent.getTime() + (24 * 60 * 60 * 1000 - 1)) // End of day (already correct for timezone)
            : undefined;
        const result = await getClient().mutation(updateRecurringCalendarEventMutation, {
            input: {
                recurringCalendarEventId: recurringCalendarEvent.id,
                calendarGroupId: data.calendarGroupId,
                displayName: data.displayName,
                description: data.description,
                color: data.color,
                timezone: recurringCalendarEvent.timezone,
                durationInMinutes: durationInMinutes,
                frequency: data.frequency,
                every: data.every,
                onWeekdays: data.onWeekdays,
                startDate: data.startDateTime,
                endDate: endOfRecurring,
            },
        });

        if (result.error || !result.data) return;

        toast.success(t('update.event-updated-successfully'));
        router.refresh();
        onFinish?.();
    };

    const deleteRecurringCalendarEventFn = async () => {
        const result = await getClient().mutation(deleteRecurringCalendarEventMutation, {
            input: {
                recurringCalendarEventId: recurringCalendarEvent.id,
            },
        });

        if (result.error || !result.data) {
            toast.error(t('delete.failed-to-delete-recurring-event'));
            return;
        }

        toast.success(t('delete.recurring-event-deleted-successfully'));
        router.refresh();
        onFinish?.();
    };

    const defaultValues: z.infer<typeof updateRecurringCalendarEventFieldsSchema> = {
        isRecurringEvent: true,
        calendarGroupId: recurringCalendarEvent.calendarGroupId || undefined,
        displayName: recurringCalendarEvent.displayName,
        description: recurringCalendarEvent.description || undefined,
        startDateTime: recurringCalendarEvent.startDate,
        endDateTime: new Date(
            recurringCalendarEvent.startDate.getTime() +
                recurringCalendarEvent.durationInMinutes * 60 * 1000,
        ),
        color: recurringCalendarEvent.color || undefined,
        frequency: recurringCalendarEvent.frequency,
        every: recurringCalendarEvent.every,
        onWeekdays:
            recurringCalendarEvent.onWeekdays?.filter(
                (w): w is CalendarWeekday => w !== undefined,
            ) || [],
        endDateForRecurringCalendarEvent: recurringCalendarEvent.endDate || undefined,
    };

    return (
        <Form
            defaultValues={defaultValues}
            schema={updateRecurringCalendarEventFieldsSchema}
            onSubmit={updateRecurringCalendarEvent}
            render={(props) => (
                <UpdateRecurringCalendarEventFields {...props} timezone={timezone} />
            )}
            renderActions={(form) => (
                <div className="flex items-center gap-2">
                    <ButtonWithConfirmation
                        onConfirm={() => deleteRecurringCalendarEventFn()}
                        variant="destructive"
                        dialogDescription={t('delete.confirmation-dialog.description')}
                    >
                        <LucideTrash />
                    </ButtonWithConfirmation>
                    <UpdateActions {...form} />
                </div>
            )}
        />
    );
}
