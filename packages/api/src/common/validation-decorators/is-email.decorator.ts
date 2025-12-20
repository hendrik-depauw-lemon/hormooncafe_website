import { z } from 'zod';

import { ZodValidate, ZodValidateOptions } from './zod-validate.decorator';

export const IsEmail = (options?: ZodValidateOptions) =>
    ZodValidate(z.string().email('Invalid email'), options);
