'use client';

import { useMutation } from 'urql';
import { z } from 'zod';

import { useRouter } from '@/src/i18n/navigation';

import { CreateForm } from '../../../../../../../src/components/organism/form/CreateForm';
import { BookFields, bookFieldsSchema } from '../../_components/BookFields';
import { addBookMutation } from '../_actions/addBook';

export function CreateBookForm() {
    const router = useRouter();
    const [_, addBook] = useMutation(addBookMutation);

    const onSubmit = async (data: z.infer<typeof bookFieldsSchema>) => {
        const result = await addBook({
            input: {
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
        const id = result.data?.AddBook;
        if (id) router.replace(`/books/${id}`);
    };

    const defaultValues = {
        title: '',
        description: '',
        publishDate: undefined,
        numberOfPages: 0,
        availableAsEbook: undefined,
        coverType: undefined,
        authorIds: [],
        publisherId: '',
    };

    return (
        <CreateForm
            defaultValues={defaultValues}
            schema={bookFieldsSchema}
            onSubmit={onSubmit}
            render={BookFields}
        />
    );
}
