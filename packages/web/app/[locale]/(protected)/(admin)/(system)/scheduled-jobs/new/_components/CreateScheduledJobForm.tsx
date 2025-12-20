'use client';

import { useMutation } from 'urql';
import { z } from 'zod';

import { useRouter } from '@/src/i18n/navigation';

import { CreateForm } from '../../../../../../../../src/components/organism/form/CreateForm';
import { ScheduledJobFields, scheduledJobFieldsSchema } from '../../_components/ScheduledJobFields';
import { createScheduledJobMutation } from '../_actions/addScheduledJob';

export function CreateScheduledJobForm() {
    const router = useRouter();
    const [_, addScheduledJob] = useMutation(createScheduledJobMutation);

    const onSubmit = async (data: z.infer<typeof scheduledJobFieldsSchema>) => {
        const result = await addScheduledJob({
            input: {
                name: data.name,
                schedule: data.schedule,
                jobKey: data.jobKey,
            },
        });
        const id = result.data?.CreateScheduledJob;
        if (id) router.replace(`/scheduled-jobs/${id}`);
    };

    const defaultValues = {
        name: '',
        schedule: '',
        jobKey: undefined,
    };

    return (
        <CreateForm
            defaultValues={defaultValues}
            schema={scheduledJobFieldsSchema}
            onSubmit={onSubmit}
            render={ScheduledJobFields}
        />
    );
}
