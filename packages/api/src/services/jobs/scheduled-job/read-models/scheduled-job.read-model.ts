import { Projects, ReadModel } from '@boostercloud/framework-core';
import { ProjectionResult, ReadModelAction, UUID } from '@boostercloud/framework-types';

import { BaseReadModel } from '../../../../common/base-models';
import { Admin } from '../../../../config/roles';
import { JobKey } from '../../job/job-key';
import { ScheduledJob } from '../entities/scheduled-job.entity';

@ReadModel({ authorize: [Admin] })
export class ScheduledJobReadModel extends BaseReadModel<ScheduledJobReadModel> {
    readonly id!: UUID;
    readonly name!: string;
    readonly schedule!: string;
    readonly jobKey!: JobKey;
    readonly active!: boolean;
    readonly data?: string;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    @Projects(ScheduledJob, 'id')
    public static projectScheduledJob(
        scheduledJob: ScheduledJob,
    ): ProjectionResult<ScheduledJobReadModel> {
        if (scheduledJob.deletedAt) return ReadModelAction.Delete;

        return new ScheduledJobReadModel({
            id: scheduledJob.id,
            name: scheduledJob.name,
            schedule: scheduledJob.schedule,
            jobKey: scheduledJob.jobKey,
            active: scheduledJob.active,
            data: scheduledJob.data,
            createdAt: scheduledJob.createdAt,
            updatedAt: scheduledJob.updatedAt,
        });
    }
}
