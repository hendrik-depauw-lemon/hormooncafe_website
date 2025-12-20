'use client';

import { useMutation } from 'urql';
import { z } from 'zod';

import { useRouter } from '@/src/i18n/navigation';

import { CreateForm } from '../../../../../../../src/components/organism/form/CreateForm';
import { PublisherFields, publisherFieldsSchema } from '../../_components/PublisherFields';
import { addPublisherMutation } from '../_actions/addPublisher';

export function CreatePublisherForm() {
    const router = useRouter();
    const [_, addPublisher] = useMutation(addPublisherMutation);

    const onSubmit = async (data: z.infer<typeof publisherFieldsSchema>) => {
        const result = await addPublisher({
            input: {
                name: data.name,
                addressPlaceId: data.addressPlaceId,
            },
        });
        const id = result.data?.AddPublisher;
        if (id) router.replace(`/publishers/${id}`);
    };

    const defaultValues = {
        name: '',
        addressPlaceId: undefined,
    };

    return (
        <CreateForm
            defaultValues={defaultValues}
            schema={publisherFieldsSchema}
            onSubmit={onSubmit}
            render={PublisherFields}
        />
    );
}
