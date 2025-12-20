'use client';

import { useMutation } from 'urql';
import { z } from 'zod';

import { useRouter } from '@/src/i18n/navigation';

import { UpdateForm } from '../../../../../../../../src/components/organism/form/UpdateForm';
import { ScheduledJobReadModel } from '../../../../../../../../src/gql/generated/graphql';
import {
    ScheduledJobDataFields,
    scheduledJobDataFieldsSchema,
} from '../../_components/ScheduledJobDataFields';
import { updateScheduledJobDataMutation } from '../_actions/updateScheduledJobData';

type UpdateScheduledJobFormProps = {
    initialValues: NonNullable<ScheduledJobReadModel>;
};

export function UpdateScheduledJobDataForm({ initialValues }: UpdateScheduledJobFormProps) {
    const router = useRouter();
    const [_, updateScheduledJobData] = useMutation(updateScheduledJobDataMutation);

    const onSubmit = async (data: z.infer<typeof scheduledJobDataFieldsSchema>) => {
        await updateScheduledJobData({
            input: {
                id: initialValues.id,
                data: data.data,
            },
        });
        router.refresh();
    };

    const defaultValues = {
        data: initialValues.data ?? '',
    };

    return (
        <UpdateForm
            defaultValues={defaultValues}
            schema={scheduledJobDataFieldsSchema}
            onSubmit={onSubmit}
            render={ScheduledJobDataFields}
        />
    );
}
