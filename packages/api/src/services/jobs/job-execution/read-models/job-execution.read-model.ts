import { Projects, ReadModel } from '@boostercloud/framework-core';
import { ProjectionResult, UUID } from '@boostercloud/framework-types';

import { BaseReadModel, BaseValueObject } from '../../../../common/base-models';
import { Admin } from '../../../../config/roles';
import { JobKey } from '../../job/job-key';
import { JobExecution } from '../entities/job-execution.entity';
import { JobExecutionStatus } from '../models/job-execution-status.model';

class Message extends BaseValueObject<Message> {
    readonly message!: string;
    readonly timestamp!: Date;
}

@ReadModel({ authorize: [Admin] })
export class JobExecutionReadModel extends BaseReadModel<JobExecutionReadModel> {
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
    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    get durationInSeconds(): number | undefined {
        return this.startedAt
            ? Math.floor(
                  ((this.completedAt?.getTime() || Date.now()) - this.startedAt.getTime()) / 1000,
              )
            : undefined;
    }

    get estimatedSecondsRemaining(): number | undefined {
        return this.progress !== 0
            ? (this.durationInSeconds || 0) / (this.progress / 100) - (this.durationInSeconds || 0)
            : undefined;
    }

    get progress(): number {
        return (
            (((this.successfulItems || 0) + (this.failedItems || 0)) / (this.totalItems || 1)) * 100
        );
    }

    constructor(
        init: Omit<
            JobExecutionReadModel,
            'durationInSeconds' | 'progress' | 'estimatedSecondsRemaining'
        >,
    ) {
        super(init as JobExecutionReadModel);
        if (!init) return; // Booster creates instances without passing arguments
        this.messages = init.messages.map((message) => new Message(message));
    }

    @Projects(JobExecution, 'id')
    public static projectJobExecution(
        jobExecution: JobExecution,
    ): ProjectionResult<JobExecutionReadModel> {
        return new JobExecutionReadModel({
            id: jobExecution.id,
            name: jobExecution.name,
            startedAt: jobExecution.startedAt,
            completedAt: jobExecution.completedAt,
            status: jobExecution.status,
            totalItems: jobExecution.totalItems,
            successfulItems: jobExecution.successfulItems,
            failedItems: jobExecution.failedItems,
            summary: jobExecution.summary,
            messages: jobExecution.messages,
            scheduledJobId: jobExecution.scheduledJobId,
            jobKey: jobExecution.jobKey,
            data: jobExecution.data,
            createdAt: jobExecution.createdAt,
            updatedAt: jobExecution.updatedAt,
        });
    }
}
