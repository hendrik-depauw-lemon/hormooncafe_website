import { z } from 'zod';

import { ZodValidate, ZodValidateOptions } from './zod-validate.decorator';

export const isBoolean = (options?: ZodValidateOptions) => ZodValidate(z.boolean(), options);
