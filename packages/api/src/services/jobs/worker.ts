import '../..';

import { RegisterHandler } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { getJob } from './job/get-job-function';
import { JobKey } from './job/job-key';
import { ProgressReportService } from './progress-report.service';

export type WorkerInput = {
    jobId: UUID;
    jobKey: JobKey;
    data?: string;
};

export async function runJob({ jobId, jobKey, data }: WorkerInput) {
    const jobFn = getJob(jobKey);
    console.log(`Running job ${jobId}`);
    const register = new Register(UUID.generate(), {}, RegisterHandler.flush, {
        id: '00000000-0000-4000-8000-000000000000',
        username: '00000000-0000-4000-8000-000000000000',
        claims: {},
        roles: ['SYSTEM'],
    });
    const reporter = new ProgressReportService(jobId, register);
    await jobFn(register, reporter, data);
    return register.flush();
}
