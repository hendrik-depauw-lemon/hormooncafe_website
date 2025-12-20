import { z } from 'zod';

export const zodStringToBoolean = (string: string | undefined, defaultValue: 'true' | 'false') =>
    z
        .union([z.boolean(), z.literal('true'), z.literal('false')])
        .transform((value) => value === true || value === 'true')
        .parse(string || defaultValue);
