import { z } from 'zod';

import { ZodValidate, ZodValidateOptions } from './zod-validate.decorator';

export const NonEmptyArray = (options?: ZodValidateOptions) =>
    ZodValidate(z.array(z.any()).min(1), options);
