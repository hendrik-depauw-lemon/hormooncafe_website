import { z } from 'zod';

import { ZodValidate, ZodValidateOptions } from './zod-validate.decorator';

export const Between = (min: number, max: number, options?: ZodValidateOptions) =>
    ZodValidate(z.number().min(min).max(max), options);
