import { z } from 'zod';

import { ZodValidate, ZodValidateOptions } from './zod-validate.decorator';

export const IsDate = (options?: ZodValidateOptions) =>
    ZodValidate(z.string().date('Invalid date'), options);
