import { getLogger } from '@boostercloud/framework-common-helpers';
import { Booster } from '@boostercloud/framework-core';
import { Logger, Register, UUID } from '@boostercloud/framework-types';

import { JobExecutionCanceled } from './job-execution/events/job-execution-canceled.event';
import { JobExecutionFailed } from './job-execution/events/job-execution-failed.event';
import { JobExecutionItemProcessed } from './job-execution/events/job-execution-item-processed.event';
import { JobExecutionMessageAdded } from './job-execution/events/job-execution-message-added.event';
import { JobExecutionStarted } from './job-execution/events/job-execution-started.event';
import { JobExecutionSucceeded } from './job-execution/events/job-execution-succeeded.event';
import { JobExecutionTotalItemsUpdated } from './job-execution/events/job-execution-total-items-updated.event';

export class ProgressReportService {
    private logger: Logger;

    constructor(
        private jobId: UUID,
        private register: Register,
    ) {
        this.logger = getLogger(Booster.config, `[Job ${this.jobId}]`);
    }

    public async start(totalItems?: number): Promise<void> {
        this.logger.info('Started');
        this.register.events(new JobExecutionStarted({ id: this.jobId }));

        if (totalItems) {
            this.logger.info(`Total items to process: ${totalItems}`);
            this.register.events(new JobExecutionTotalItemsUpdated({ id: this.jobId, totalItems }));
        }

        await this.register.flush();
    }

    public async itemProcessed(success: boolean, message?: string): Promise<void> {
        this.logger.info(`Item processed. Success: ${success}`);
        this.register.events(new JobExecutionItemProcessed({ id: this.jobId, success }));

        if (message) {
            this.logger.info(`Message: ${message}`);
            this.register.events(new JobExecutionMessageAdded({ id: this.jobId, message }));
        }

        await this.register.flush();
    }

    public async updateTotalItems(totalItems: number): Promise<void> {
        this.logger.info(`Total items to process: ${totalItems}`);
        this.register.events(new JobExecutionTotalItemsUpdated({ id: this.jobId, totalItems }));
        await this.register.flush();
    }

    public async log(...messages: string[]): Promise<void> {
        for (const message of messages) {
            this.logger.info(`Message: ${message}`);
            this.register.events(new JobExecutionMessageAdded({ id: this.jobId, message }));
        }
        await this.register.flush();
    }

    public async complete(success: boolean, summary?: string): Promise<void> {
        this.logger.info(`Completed. Success: ${success}`);

        if (summary) {
            this.logger.info(`Summary: ${summary}`);
            this.register.events(
                new JobExecutionMessageAdded({ id: this.jobId, message: summary }),
            );
        }

        this.register.events(
            success
                ? new JobExecutionSucceeded({ id: this.jobId, summary })
                : new JobExecutionFailed({ id: this.jobId, summary }),
        );

        await this.register.flush();
    }

    public async cancel(summary?: string): Promise<void> {
        this.logger.info(`Canceled.`);

        if (summary) {
            this.logger.info(`Summary: ${summary}`);
            this.register.events(
                new JobExecutionMessageAdded({ id: this.jobId, message: summary }),
            );
        }

        this.register.events(new JobExecutionCanceled({ id: this.jobId, summary }));

        await this.register.flush();
    }
}
