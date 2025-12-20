import { ScheduledJob } from '../entities/scheduled-job.entity';
import { ScheduledJobIsActiveError } from '../errors/scheduled-job-is-active.error';
import { ScheduledJobIsInactiveError } from '../errors/scheduled-job-is-inactive.error';

export class ScheduledJobValidators {
    public static scheduledJobIsActive(scheduledJob: ScheduledJob): void {
        if (!scheduledJob.active) {
            throw new ScheduledJobIsInactiveError(scheduledJob.id);
        }
    }

    public static scheduledJobIsInactive(scheduledJob: ScheduledJob): void {
        if (scheduledJob.active) {
            throw new ScheduledJobIsActiveError(scheduledJob.id);
        }
    }
}
