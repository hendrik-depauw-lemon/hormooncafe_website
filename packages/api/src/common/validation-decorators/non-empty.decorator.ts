import { z } from 'zod';

import { ZodValidate, ZodValidateOptions } from './zod-validate.decorator';

export const NonEmpty = (options?: ZodValidateOptions) => ZodValidate(z.string().min(1), options);
