import { z } from 'zod';

import { ZodValidate, ZodValidateOptions } from './zod-validate.decorator';

export const Integer = (options?: ZodValidateOptions) => ZodValidate(z.number().int(), options);
