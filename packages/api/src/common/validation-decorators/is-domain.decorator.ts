import { z } from 'zod';

import { ZodValidate } from './zod-validate.decorator';

export const IsDomain = () =>
    ZodValidate(
        z
            .string()
            .regex(
                /^@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
                'Invalid domain (e.g.: @example.com, @sub.example.com)',
            ),
    );
