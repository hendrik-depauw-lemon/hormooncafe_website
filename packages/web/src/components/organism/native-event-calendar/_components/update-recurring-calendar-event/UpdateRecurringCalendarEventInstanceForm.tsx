import { LucideTrash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import z from 'zod';

import { RecurringCalendarEventReadModel } from '../../../../../gql/generated/graphql';
import { useRouter } from '../../../../../i18n/navigation';
import { getClient } from '../../../../../utils/urql/getURQLClient';
import { ButtonWithConfirmation } from '../../../ButtonWithConfirmation';
import { UpdateActions } from '../../../form/actions/UpdateActions';
import { Form } from '../../../form/Form';
import { createCalendarEventMutation } from '../../_actions/createCalendarEvent';
import { deleteRecurringCalendarEventInstanceMutation } from '../../_actions/deleteRecurringCalendarEventInstance';
import {
    UpdateRecurringCalendarEventInstanceFields,
    updateRecurringCalendarEventInstanceFieldsSchema,
} from './UpdateRecurringCalendarEventInstanceFields';

interface UpdateRecurringCalendarEventInstanceFormProps {
    recurringCalendarEvent: RecurringCalendarEventReadModel;
    timezone: string;
    occurrenceStartDateTimeToUpdate: Date | undefined;
    onFinish?: () => void;
}

export function UpdateRecurringCalendarEventInstanceForm({
    recurringCalendarEvent,
    timezone,
    occurrenceStartDateTimeToUpdate,
    onFinish,
}: UpdateRecurringCalendarEventInstanceFormProps) {
    const t = useTranslations('calendar');
    const router = useRouter();

    const updateRecurringCalendarEventInstance = async (
        data: z.infer<typeof updateRecurringCalendarEventInstanceFieldsSchema>,
    ) => {
        const result = await getClient().mutation(createCalendarEventMutation, {
            input: {
                calendarGroupId: data.calendarGroupId,
                displayName: data.displayName,
                description: data.description,
                startDateTime: data.startDateTime,
                endDateTime: data.endDateTime,
                color: data.color,
                fromRecurringEventId: recurringCalendarEvent.id,
            },
        });

        if (result.error || !result.data) {
            toast.error(t('update.failed-to-update-event'));
            return;
        }

        toast.success(t('update.event-updated-successfully'));
        router.refresh();
        onFinish?.();
    };

    const deleteRecurringCalendarEventInstance = async () => {
        if (!occurrenceStartDateTimeToUpdate) {
            console.error('Occurrence start date time to update is undefined');
            toast.error(t('delete.failed-to-delete-event'));
            return;
        }
        const result = await getClient().mutation(deleteRecurringCalendarEventInstanceMutation, {
            input: {
                recurringCalendarEventId: recurringCalendarEvent.id,
                instanceDate: occurrenceStartDateTimeToUpdate,
            },
        });

        if (result.error || !result.data) {
            toast.error(t('delete.failed-to-delete-event'));
            return;
        }

        toast.success(t('delete.event-deleted-successfully'));
        router.refresh();
        onFinish?.();
    };

    const defaultStartDateTime =
        occurrenceStartDateTimeToUpdate || recurringCalendarEvent.startDate;
    const defaultValues: z.infer<typeof updateRecurringCalendarEventInstanceFieldsSchema> = {
        calendarGroupId: recurringCalendarEvent.calendarGroupId || undefined,
        displayName: recurringCalendarEvent.displayName,
        description: recurringCalendarEvent.description || undefined,
        startDateTime: defaultStartDateTime,
        endDateTime: new Date(
            defaultStartDateTime.getTime() + recurringCalendarEvent.durationInMinutes * 60 * 1000,
        ),
        color: recurringCalendarEvent.color || undefined,
    };

    return (
        <Form
            defaultValues={defaultValues}
            schema={updateRecurringCalendarEventInstanceFieldsSchema}
            onSubmit={updateRecurringCalendarEventInstance}
            render={(props) => (
                <UpdateRecurringCalendarEventInstanceFields {...props} timezone={timezone} />
            )}
            renderActions={(form) => (
                <div className="flex items-center gap-2">
                    <ButtonWithConfirmation
                        onConfirm={() => deleteRecurringCalendarEventInstance()}
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
