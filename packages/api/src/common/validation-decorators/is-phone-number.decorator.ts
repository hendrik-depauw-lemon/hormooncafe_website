import { z } from 'zod';

import { ZodValidate } from './zod-validate.decorator';

export const IsPhoneNumber = ZodValidate(
    z
        .string()
        .regex(
            /^\+?[0-9]{8,13}$/,
            'Invalid phone number (e.g.: +32479315196 , 016355545, 0032479315196)',
        ),
);
