import { z } from 'zod';

import { ZodValidate, ZodValidateOptions } from './zod-validate.decorator';

export const NonNegative = (options?: ZodValidateOptions) =>
    ZodValidate(z.number().nonnegative(), options);
