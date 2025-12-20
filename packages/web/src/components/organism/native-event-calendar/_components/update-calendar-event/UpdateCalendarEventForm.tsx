import { LucideTrash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import z from 'zod';

import { CalendarEventReadModel } from '../../../../../gql/generated/graphql';
import { useRouter } from '../../../../../i18n/navigation';
import { getClient } from '../../../../../utils/urql/getURQLClient';
import { ButtonWithConfirmation } from '../../../ButtonWithConfirmation';
import { UpdateActions } from '../../../form/actions/UpdateActions';
import { Form } from '../../../form/Form';
import { deleteCalendarEventMutation } from '../../_actions/deleteCalendarEvent';
import { updateCalendarEventMutation } from '../../_actions/updateCalendarEvent';
import {
    UpdateCalendarEventFields,
    updateCalendarEventFieldsSchema,
} from './UpdateCalendarEventFields';

interface UpdateCalendarEventFormProps {
    calendarEvent: CalendarEventReadModel;
    timezone: string;
    onFinish?: () => void;
}

export function UpdateCalendarEventForm({
    calendarEvent,
    timezone,
    onFinish,
}: UpdateCalendarEventFormProps) {
    const t = useTranslations('calendar');
    const router = useRouter();

    const updateCalendarEvent = async (data: z.infer<typeof updateCalendarEventFieldsSchema>) => {
        const result = await getClient().mutation(updateCalendarEventMutation, {
            input: {
                calendarEventId: calendarEvent.id,
                calendarGroupId: data.calendarGroupId,
                displayName: data.displayName,
                description: data.description,
                startDateTime: data.startDateTime,
                endDateTime: data.endDateTime,
                color: data.color,
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

    const deleteCalendarEvent = async () => {
        const result = await getClient().mutation(deleteCalendarEventMutation, {
            input: {
                calendarEventId: calendarEvent.id,
            },
        });

        if (result.error || !result.data) return;

        toast.success(t('delete.event-deleted-successfully'));
        router.refresh();
        onFinish?.();
    };

    const defaultValues: z.infer<typeof updateCalendarEventFieldsSchema> = {
        calendarGroupId: calendarEvent.calendarGroupId || undefined,
        displayName: calendarEvent.displayName,
        description: calendarEvent.description || '',
        startDateTime: new Date(calendarEvent.startDateTime),
        endDateTime: new Date(calendarEvent.endDateTime),
        color: calendarEvent.color || undefined,
    };

    return (
        <Form
            defaultValues={defaultValues}
            schema={updateCalendarEventFieldsSchema}
            onSubmit={updateCalendarEvent}
            render={(props) => <UpdateCalendarEventFields {...props} timezone={timezone} />}
            renderActions={(form) => (
                <>
                    <ButtonWithConfirmation
                        onConfirm={() => deleteCalendarEvent()}
                        variant="destructive"
                        dialogDescription={t('delete.confirmation-dialog.description')}
                    >
                        <LucideTrash />
                    </ButtonWithConfirmation>
                    <UpdateActions {...form} />
                </>
            )}
        />
    );
}
