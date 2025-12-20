import { z } from 'zod';

import { ZodValidate, ZodValidateOptions } from './zod-validate.decorator';

export const IsHexColor = (options?: ZodValidateOptions) =>
    ZodValidate(z.string().regex(/^#([0-9A-Fa-f]{3}){1,2}$/, 'Invalid hex color'), options);

export const IsOptionalHexColor = (options?: ZodValidateOptions) =>
    ZodValidate(
        z
            .string()
            .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, 'Invalid hex color')
            .optional(),
        options,
    );
