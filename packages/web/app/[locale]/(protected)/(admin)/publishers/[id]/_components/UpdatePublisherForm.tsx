'use client';

import { useMutation } from 'urql';
import { z } from 'zod';

import { useRouter } from '@/src/i18n/navigation';

import { UpdateForm } from '../../../../../../../src/components/organism/form/UpdateForm';
import { PublisherReadModel } from '../../../../../../../src/gql/generated/graphql';
import { PublisherFields, publisherFieldsSchema } from '../../_components/PublisherFields';
import { updatePublisherMutation } from '../_actions/updatePublisher';

type UpdatePublisherFormProps = {
    initialValues: NonNullable<PublisherReadModel>;
};

export function UpdatePublisherForm({ initialValues }: UpdatePublisherFormProps) {
    const router = useRouter();
    const [_, updatePublisher] = useMutation(updatePublisherMutation);

    const onSubmit = async (data: z.infer<typeof publisherFieldsSchema>) => {
        await updatePublisher({
            input: {
                id: initialValues.id,
                name: data.name,
                addressPlaceId: data.addressPlaceId,
            },
        });
        router.refresh();
    };

    const defaultValues = {
        name: initialValues.name,
        addressPlaceId: initialValues.address?.placeId ?? undefined,
    };

    return (
        <UpdateForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            schema={publisherFieldsSchema}
            render={PublisherFields}
        />
    );
}
