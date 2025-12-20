'use client';

import { useMutation } from 'urql';
import { z } from 'zod';

import { useRouter } from '@/src/i18n/navigation';

import { CreateForm } from '../../../../../../../../src/components/organism/form/CreateForm';
import { JobFields, jobFieldsSchema } from '../../_components/JobFields';
import { executeJobMutation } from '../_actions/executeJob';

export function ExecuteJobForm() {
    const router = useRouter();
    const [_, executeJob] = useMutation(executeJobMutation);

    const onSubmit = async (data: z.infer<typeof jobFieldsSchema>) => {
        const result = await executeJob({
            input: {
                name: data.name,
                data: data.data,
                jobKey: data.jobKey,
            },
        });
        const id = result.data?.ExecuteJob;
        if (id) router.replace(`/job-monitor/${id}`);
    };

    const defaultValues = {
        name: '',
        jobKey: undefined,
        data: '',
    };

    return (
        <CreateForm
            defaultValues={defaultValues}
            schema={jobFieldsSchema}
            onSubmit={onSubmit}
            render={JobFields}
        />
    );
}
