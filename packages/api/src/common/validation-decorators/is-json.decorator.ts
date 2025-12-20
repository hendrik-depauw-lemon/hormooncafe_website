import { z } from 'zod';

import { ZodValidate, ZodValidateOptions } from './zod-validate.decorator';

export const IsJson = (options?: ZodValidateOptions) =>
    ZodValidate(
        z.string().refine(
            (val) => {
                if (!val) return true;
                try {
                    JSON.parse(val);
                    return true;
                } catch {
                    return false;
                }
            },
            {
                message: 'Invalid JSON string',
            },
        ),
        options,
    );
