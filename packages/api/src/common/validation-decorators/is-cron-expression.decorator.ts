import { CronTime } from 'cron';
import { z } from 'zod';

import { ZodValidate, ZodValidateOptions } from './zod-validate.decorator';

export const IsCronExpression = (options?: ZodValidateOptions) =>
    ZodValidate(
        z.string().refine(
            (val) => {
                try {
                    new CronTime(val);
                    return true;
                } catch {
                    return false;
                }
            },
            {
                message: 'Invalid cron expression',
            },
        ),
        options,
    );
