import { Entity, Reduces } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEntity } from '../../../../common/base-models';
import { JobKey } from '../../job/job-key';
import { ScheduledJobActivated } from '../events/scheduled-job-activated.event';
import { ScheduledJobCreated } from '../events/scheduled-job-created.event';
import { ScheduledJobDataUpdated } from '../events/scheduled-job-data-updated.event';
import { ScheduledJobDeactivated } from '../events/scheduled-job-deactivated.event';
import { ScheduledJobRemoved } from '../events/scheduled-job-removed.event';
import { ScheduledJobScheduleUpdated } from '../events/scheduled-job-schedule-updated.event';

@Entity
export class ScheduledJob extends BaseEntity<ScheduledJob> {
    readonly id!: UUID;
    readonly name!: string;
    readonly schedule!: string;
    readonly jobKey!: JobKey;
    readonly active!: boolean;
    readonly data?: string;

    @Reduces(ScheduledJobCreated)
    public static reduceScheduledJobCreated(event: ScheduledJobCreated): ScheduledJob {
        return new ScheduledJob({
            id: event.id,
            name: event.name,
            schedule: event.schedule,
            jobKey: event.jobKey,
            active: false,
            data: undefined,
            createdAt: event.eventTime,
            updatedAt: event.eventTime,
        });
    }

    @Reduces(ScheduledJobActivated)
    public static reduceScheduledJobActivated(
        event: ScheduledJobActivated,
        current: ScheduledJob,
    ): ScheduledJob {
        return new ScheduledJob({
            ...current,
            active: true,
            updatedAt: event.eventTime,
        });
    }

    @Reduces(ScheduledJobDeactivated)
    public static reduceScheduledJobDeactivated(
        event: ScheduledJobDeactivated,
        current: ScheduledJob,
    ): ScheduledJob {
        return new ScheduledJob({
            ...current,
            active: false,
            updatedAt: event.eventTime,
        });
    }

    @Reduces(ScheduledJobScheduleUpdated)
    public static reduceScheduledJobScheduleUpdated(
        event: ScheduledJobScheduleUpdated,
        current: ScheduledJob,
    ): ScheduledJob {
        return new ScheduledJob({
            ...current,
            schedule: event.schedule,
            updatedAt: event.eventTime,
        });
    }

    @Reduces(ScheduledJobDataUpdated)
    public static reduceScheduledJobDataUpdated(
        event: ScheduledJobDataUpdated,
        current: ScheduledJob,
    ): ScheduledJob {
        return new ScheduledJob({
            ...current,
            data: event.data,
            updatedAt: event.eventTime,
        });
    }

    @Reduces(ScheduledJobRemoved)
    public static reduceScheduledJobRemoved(
        event: ScheduledJobRemoved,
        current: ScheduledJob,
    ): ScheduledJob {
        return new ScheduledJob({
            ...current,
            deletedAt: event.eventTime,
        });
    }
}
