import z from 'zod';

import { Job } from '../../../services/jobs/job/job.model';

const dataSchema = z.object({
    nr: z.array(z.number()),
});

const fibonacci = (n: number): number => {
    if (n === 0 || n === 1) {
        return 1;
    }
    return fibonacci(n - 2) + fibonacci(n - 1);
};

export const fibonacciJob: Job = async (register, reporter, data) => {
    const parsedData = dataSchema.parse(JSON.parse(data || '{}')).nr;
    reporter.start(parsedData.length);
    reporter.log(`Started fibonacci job`);
    for (const value of parsedData) {
        try {
            const result = fibonacci(value);
            // Store the result using the register
            console.log(`storing result: ${result}`);
            await reporter.itemProcessed(true);
        } catch (e) {
            await reporter.itemProcessed(false, `${e}`);
        }
    }
    await reporter.complete(true);
};
