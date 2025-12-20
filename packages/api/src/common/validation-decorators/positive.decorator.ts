import { z } from 'zod';

import { ZodValidate, ZodValidateOptions } from './zod-validate.decorator';

export const Positive = (options?: ZodValidateOptions) =>
    ZodValidate(z.number().positive(), options);
