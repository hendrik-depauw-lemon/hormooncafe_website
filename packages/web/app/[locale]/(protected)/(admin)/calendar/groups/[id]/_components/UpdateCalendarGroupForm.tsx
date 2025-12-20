'use client';

import { useMutation } from 'urql';
import { z } from 'zod';

import { GetCalendarGroupQuery } from '@/src/gql/generated/graphql';
import { useRouter } from '@/src/i18n/navigation';

import { UpdateForm } from '../../../../../../../../src/components/organism/form/UpdateForm';
import {
    CalendarGroupFields,
    calendarGroupFieldsSchema,
} from '../../_components/CalendarGroupFields';
import { updateCalendarGroupMutation } from '../_actions/updateCalendarGroup';

type UpdateAuthorFormProps = {
    initialValues: NonNullable<GetCalendarGroupQuery['CalendarGroupReadModel']>;
};

export function UpdateCalendarGroupForm({ initialValues }: UpdateAuthorFormProps) {
    const router = useRouter();

    const [_, updateCalendarGroup] = useMutation(updateCalendarGroupMutation);

    const onSubmit = async (data: z.infer<typeof calendarGroupFieldsSchema>) => {
        await updateCalendarGroup({
            input: {
                calendarGroupId: initialValues.id,
                name: data.name,
                color: data.color,
            },
        });
        router.refresh();
    };

    const defaultValues: z.infer<typeof calendarGroupFieldsSchema> = {
        name: initialValues.name,
        color: initialValues.color || undefined,
    };

    return (
        <UpdateForm
            defaultValues={defaultValues}
            schema={calendarGroupFieldsSchema}
            onSubmit={onSubmit}
            render={CalendarGroupFields}
        />
    );
}
