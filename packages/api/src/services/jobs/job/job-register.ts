import { fibonacciJob } from '../../../modules/books-example/jobs/fibonacci.job';
import { syncBooks } from '../../../modules/books-example/jobs/sync-books.job';
import { Job } from './job.model';
import { JobKey } from './job-key';

export const jobRegister: Record<JobKey, Job> = {
    [JobKey.SyncBooks]: syncBooks,
    [JobKey.Fibonacci]: fibonacciJob,
};
