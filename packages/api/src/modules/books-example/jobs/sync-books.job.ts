import z from 'zod';

import { Job } from '../../../services/jobs/job/job.model';

const dataSchema = z.object({
    numberOfItems: z.number(),
});

export const syncBooks: Job = async (register, reporter, data) => {
    const { numberOfItems } = dataSchema.parse(JSON.parse(data || '{}'));
    await reporter.start(numberOfItems);
    for (let i = 0; i < numberOfItems; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await reporter.itemProcessed(true, `Processed item ${i + 1}`);
    }
    await reporter.complete(true, 'All items processed successfully');
};
