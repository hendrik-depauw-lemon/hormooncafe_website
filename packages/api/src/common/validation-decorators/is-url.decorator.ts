import { z } from 'zod';

import { ZodValidate } from './zod-validate.decorator';

export const IsUrl = () =>
    ZodValidate(z.string().url('Invalid URL format (e.g.: https://example.com)'));

export const IsOptionalUrl = () =>
    ZodValidate(z.string().url('Invalid URL format (e.g.: https://example.com)').optional());
