import { Job } from './job.model';
import { JobKey } from './job-key';
import { jobRegister } from './job-register';
import { UnknownJobKeyError } from './unknown-job-key.error';

export const getJob = (jobKey: JobKey): Job => {
    const fn = jobRegister[jobKey];
    if (!fn) {
        throw new UnknownJobKeyError(jobKey);
    }
    return fn;
};
