import { z } from 'zod';

import { ZodValidate, ZodValidateOptions } from './zod-validate.decorator';

export const OneOfStrings = (values: [string, ...string[]], options?: ZodValidateOptions) =>
    ZodValidate(z.enum(values), options);
