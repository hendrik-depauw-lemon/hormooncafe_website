'use client';

import { useMutation } from 'urql';
import { z } from 'zod';

import { useRouter } from '@/src/i18n/navigation';

import { UpdateForm } from '../../../../../../../../src/components/organism/form/UpdateForm';
import { ScheduledJobReadModel } from '../../../../../../../../src/gql/generated/graphql';
import { ScheduledJobFields, scheduledJobFieldsSchema } from '../../_components/ScheduledJobFields';
import { updateScheduledJobScheduleMutation } from '../_actions/updateScheduledJobSchedule';

type UpdateScheduledJobFormProps = {
    initialValues: NonNullable<ScheduledJobReadModel>;
};

export function UpdateScheduledJobScheduleForm({ initialValues }: UpdateScheduledJobFormProps) {
    const router = useRouter();
    const [_, updateScheduledJobSchedule] = useMutation(updateScheduledJobScheduleMutation);

    const onSubmit = async (data: z.infer<typeof scheduledJobFieldsSchema>) => {
        await updateScheduledJobSchedule({
            input: {
                id: initialValues.id,
                schedule: data.schedule,
            },
        });
        router.refresh();
    };

    const defaultValues = {
        name: initialValues.name,
        schedule: initialValues.schedule,
        jobKey: initialValues.jobKey,
    };

    return (
        <UpdateForm
            defaultValues={defaultValues}
            schema={scheduledJobFieldsSchema}
            onSubmit={onSubmit}
            render={ScheduledJobFields}
        />
    );
}
