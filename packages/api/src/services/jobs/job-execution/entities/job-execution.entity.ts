import { Entity, Reduces } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEntity, BaseValueObject } from '../../../../common/base-models';
import { JobKey } from '../../job/job-key';
import { JobExecutionCanceled } from '../events/job-execution-canceled.event';
import { JobExecutionCreated } from '../events/job-execution-created.event';
import { JobExecutionFailed } from '../events/job-execution-failed.event';
import { JobExecutionItemProcessed } from '../events/job-execution-item-processed.event';
import { JobExecutionMessageAdded } from '../events/job-execution-message-added.event';
import { JobExecutionStarted } from '../events/job-execution-started.event';
import { JobExecutionSucceeded } from '../events/job-execution-succeeded.event';
import { JobExecutionTotalItemsUpdated } from '../events/job-execution-total-items-updated.event';
import { JobExecutionStatus } from '../models/job-execution-status.model';

class Message extends BaseValueObject<Message> {
    readonly message!: string;
    readonly timestamp!: Date;
}

@Entity
export class JobExecution extends BaseEntity<JobExecution> {
    readonly name!: string;
    readonly startedAt?: Date;
    readonly completedAt?: Date;
    readonly status!: JobExecutionStatus;
    readonly totalItems?: number;
    readonly successfulItems?: number;
    readonly failedItems?: number;
    readonly summary?: string;
    readonly messages!: Message[];
    readonly scheduledJobId?: UUID;
    readonly jobKey!: JobKey;
    readonly data?: string;

    @Reduces(JobExecutionCreated)
    public static reduceJobExecutionCreated(event: JobExecutionCreated): JobExecution {
        return new JobExecution({
            id: event.id,
            name: event.name,
            status: JobExecutionStatus.PENDING,
            messages: [],
            scheduledJobId: event.scheduledJobId,
            jobKey: event.jobKey,
            data: event.data,
            createdAt: event.eventTime,
            updatedAt: event.eventTime,
        });
    }

    @Reduces(JobExecutionStarted)
    public static reduceJobExecutionStarted(
        event: JobExecutionStarted,
        current: JobExecution,
    ): JobExecution {
        return new JobExecution({
            ...current,
            startedAt: event.eventTime,
            status: JobExecutionStatus.IN_PROGRESS,
            successfulItems: 0,
            failedItems: 0,
            updatedAt: event.eventTime,
        });
    }

    @Reduces(JobExecutionTotalItemsUpdated)
    public static reduceJobExecutionTotalItemsUpdated(
        event: JobExecutionTotalItemsUpdated,
        current: JobExecution,
    ): JobExecution {
        return new JobExecution({
            ...current,
            totalItems: event.totalItems,
            updatedAt: event.eventTime,
        });
    }

    @Reduces(JobExecutionItemProcessed)
    public static reduceJobExecutionItemProcessed(
        event: JobExecutionItemProcessed,
        current: JobExecution,
    ): JobExecution {
        return new JobExecution({
            ...current,
            successfulItems: event.success
                ? (current.successfulItems || 0) + 1
                : current.successfulItems,
            failedItems: event.success ? current.failedItems : (current.failedItems || 0) + 1,
            updatedAt: event.eventTime,
        });
    }

    @Reduces(JobExecutionMessageAdded)
    public static reduceJobExecutionMessageAdded(
        event: JobExecutionMessageAdded,
        current: JobExecution,
    ): JobExecution {
        return new JobExecution({
            ...current,
            messages: [
                ...(current.messages || []),
                { message: event.message, timestamp: event.eventTime },
            ],
            updatedAt: event.eventTime,
        });
    }

    @Reduces(JobExecutionSucceeded)
    public static reduceJobExecutionSucceeded(
        event: JobExecutionSucceeded,
        current: JobExecution,
    ): JobExecution {
        return new JobExecution({
            ...current,
            status: JobExecutionStatus.COMPLETED,
            summary: event.summary,
            completedAt: event.eventTime,
            updatedAt: event.eventTime,
        });
    }

    @Reduces(JobExecutionFailed)
    public static reduceJobExecutionFailed(
        event: JobExecutionFailed,
        current: JobExecution,
    ): JobExecution {
        return new JobExecution({
            ...current,
            status: JobExecutionStatus.FAILED,
            summary: event.summary,
            completedAt: event.eventTime,
            updatedAt: event.eventTime,
        });
    }

    @Reduces(JobExecutionCanceled)
    public static reduceJobExecutionCanceled(
        event: JobExecutionCanceled,
        current: JobExecution,
    ): JobExecution {
        return new JobExecution({
            ...current,
            status: JobExecutionStatus.CANCELED,
            summary: event.summary,
            completedAt: event.eventTime,
            updatedAt: event.eventTime,
        });
    }
}
