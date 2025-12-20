'use client';

import { useMutation } from 'urql';
import { z } from 'zod';

import { useRouter } from '@/src/i18n/navigation';

import { CreateForm } from '../../../../../../../src/components/organism/form/CreateForm';
import { AuthorFields, authorFieldsSchema } from '../../_components/AuthorFields';
import { addAuthorMutation } from '../_actions/addAuthor';

export function CreateAuthorForm() {
    const router = useRouter();

    const [_, addAuthor] = useMutation(addAuthorMutation);

    const onSubmit = async (data: z.infer<typeof authorFieldsSchema>) => {
        const result = await addAuthor({
            input: {
                name: data.name,
            },
        });
        const id = result.data?.AddAuthor;
        if (id) router.replace(`/authors/${id}`);
    };

    return (
        <CreateForm
            defaultValues={{ name: '' }}
            schema={authorFieldsSchema}
            onSubmit={onSubmit}
            render={AuthorFields}
        />
    );
}
