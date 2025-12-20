import { Booster, RegisterHandler } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';
import { CronJob } from 'cron';

import { JobService } from './job.service';
import { ScheduledJob } from './scheduled-job/entities/scheduled-job.entity';
import { ScheduledJobReadModel } from './scheduled-job/read-models/scheduled-job.read-model';

export class ScheduledJobService {
    private static SCHEDULED_JOBS: Record<string, CronJob> = {};

    public static async initiate() {
        const activeScheduledJobs = await Booster.readModel(ScheduledJobReadModel)
            .filter({ active: { eq: true } })
            .search();
        console.log(
            `Initiating ScheduledJobService. Found ${activeScheduledJobs.length} active scheduled jobs.`,
        );
        activeScheduledJobs.forEach((scheduledJob) => {
            this.activateScheduledJob(scheduledJob);
        });
    }

    public static activateScheduledJob(scheduledJob: ScheduledJob): void {
        const cronOnTick = async (): Promise<void> => {
            const register = new Register(UUID.generate(), {}, RegisterHandler.flush, {
                id: '00000000-0000-4000-8000-000000000000',
                username: '00000000-0000-4000-8000-000000000000',
                claims: {},
                roles: ['SYSTEM'],
            });
            await JobService.runJob(
                scheduledJob.name,
                scheduledJob.jobKey,
                scheduledJob.data ?? undefined,
                register,
                scheduledJob.id,
            );
        };
        try {
            const createdCronJob = new CronJob(scheduledJob.schedule, cronOnTick);
            ScheduledJobService.SCHEDULED_JOBS[scheduledJob.id.toString()] = createdCronJob;
            createdCronJob.start();
        } catch (error) {
            console.error(
                `Error creating cron job with identifier "${scheduledJob.id.toString()}": ${error}`,
            );
            throw error;
        }
    }

    public static deactivateScheduledJob(scheduledJob: ScheduledJob): void {
        const cronJob = ScheduledJobService.SCHEDULED_JOBS[scheduledJob.id.toString()];
        delete ScheduledJobService.SCHEDULED_JOBS[scheduledJob.id.toString()];
        if (cronJob) cronJob.stop();
    }
}
