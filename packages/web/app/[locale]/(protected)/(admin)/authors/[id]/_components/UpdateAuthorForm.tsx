'use client';

import { useMutation } from 'urql';
import { z } from 'zod';

import { AuthorReadModel } from '@/src/gql/generated/graphql';
import { useRouter } from '@/src/i18n/navigation';

import { UpdateForm } from '../../../../../../../src/components/organism/form/UpdateForm';
import { AuthorFields, authorFieldsSchema } from '../../_components/AuthorFields';
import { updateAuthorMutation } from '../_actions/updateAuthor';

type UpdateAuthorFormProps = {
    initialValues: NonNullable<AuthorReadModel>;
};

export function UpdateAuthorForm({ initialValues }: UpdateAuthorFormProps) {
    const router = useRouter();

    const [_, updateAuthor] = useMutation(updateAuthorMutation);

    const onSubmit = async (data: z.infer<typeof authorFieldsSchema>) => {
        await updateAuthor({
            input: {
                id: initialValues.id,
                name: data.name,
            },
        });
        router.refresh();
    };

    return (
        <UpdateForm
            defaultValues={{
                name: initialValues.name,
            }}
            schema={authorFieldsSchema}
            onSubmit={onSubmit}
            render={AuthorFields}
        />
    );
}
