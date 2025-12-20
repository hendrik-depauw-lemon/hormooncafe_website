import React from 'react';
import { AnyZodObject } from 'zod';

import { UpdateActions } from './actions/UpdateActions';
import { Form, FormProps } from './Form';

type UpdateFormProps<S extends AnyZodObject> = Omit<FormProps<S>, 'renderActions'>;

export function UpdateForm<S extends AnyZodObject>({ ...formProps }: UpdateFormProps<S>) {
    return <Form renderActions={(form) => <UpdateActions {...form} />} {...formProps} />;
}
