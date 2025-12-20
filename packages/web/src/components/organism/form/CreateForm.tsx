import React from 'react';
import { AnyZodObject } from 'zod';

import { CreateActions } from './actions/CreateActions';
import { Form, FormProps } from './Form';

type CreateFormProps<S extends AnyZodObject> = Omit<FormProps<S>, 'renderActions'>;

export function CreateForm<S extends AnyZodObject>({ ...formProps }: CreateFormProps<S>) {
    return <Form renderActions={(form) => <CreateActions {...form} />} {...formProps} />;
}
