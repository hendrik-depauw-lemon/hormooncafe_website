'use client';

import { useMutation } from 'urql';
import { z } from 'zod';

import { useRouter } from '@/src/i18n/navigation';

import { UpdateForm } from '../../../../../../../src/components/organism/form/UpdateForm';
import { BookReadModelQuery } from '../../../../../../../src/gql/generated/graphql';
import { BookFields, bookFieldsSchema } from '../../_components/BookFields';
import { updateBookMutation } from '../_actions/updateBook';

type UpdateBookFormProps = {
    initialValues: NonNullable<BookReadModelQuery['BookReadModel']>;
};

export function UpdateBookForm({ initialValues }: UpdateBookFormProps) {
    const router = useRouter();
    const [_, updateBook] = useMutation(updateBookMutation);

    const onSubmit = async (data: z.infer<typeof bookFieldsSchema>) => {
        await updateBook({
            input: {
                id: initialValues.id,
                title: data.title,
                description: data.description,
                publishDate: data.publishDate,
                numberOfPages: data.numberOfPages,
                availableAsEbook: data.availableAsEbook,
                coverType: data.coverType,
                authorIds: data.authorIds,
                publisherId: data.publisherId,
            },
        });
        router.refresh();
    };

    const defaultValues = {
        title: initialValues.title,
        description: initialValues.description ?? '',
        publishDate: initialValues.publishDate,
        numberOfPages: initialValues.numberOfPages,
        availableAsEbook: initialValues.availableAsEbook,
        coverType: initialValues.coverType,
        authorIds: initialValues.authorIds?.filter((id) => id !== null) ?? [],
        publisherId: initialValues.publisherId ?? '',
    };

    return (
        <UpdateForm
            defaultValues={defaultValues}
            schema={bookFieldsSchema}
            onSubmit={onSubmit}
            render={BookFields}
        />
    );
}
