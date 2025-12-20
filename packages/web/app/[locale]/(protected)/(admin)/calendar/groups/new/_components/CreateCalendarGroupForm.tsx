'use client';

import { useMutation } from 'urql';
import { z } from 'zod';

import { useRouter } from '@/src/i18n/navigation';

import { CreateForm } from '../../../../../../../../src/components/organism/form/CreateForm';
import {
    CalendarGroupFields,
    calendarGroupFieldsSchema,
} from '../../_components/CalendarGroupFields';
import { createCalendarGroupMutation } from '../_actions/createCalendarGroup';

export function CreateCalendarGroupForm() {
    const router = useRouter();

    const [_, createCalendarGroup] = useMutation(createCalendarGroupMutation);

    const onSubmit = async (data: z.infer<typeof calendarGroupFieldsSchema>) => {
        const result = await createCalendarGroup({
            input: {
                name: data.name,
                color: data.color,
            },
        });
        const id = result.data?.CreateCalendarGroup;
        if (id) router.replace(`/calendar/groups/${id}`);
    };

    return (
        <CreateForm
            defaultValues={{ name: '' }}
            schema={calendarGroupFieldsSchema}
            onSubmit={onSubmit}
            render={CalendarGroupFields}
        />
    );
}
