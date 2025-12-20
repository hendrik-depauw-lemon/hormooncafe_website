import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { JobService } from '../../../services/jobs/job.service';
import { JobKey } from '../../../services/jobs/job/job-key';

@Command({ authorize: 'all' })
export class SyncBooks extends BaseCommand<SyncBooks> {
    public static async handle(command: SyncBooks, register: Register): Promise<UUID> {
        const jobId = await JobService.runJob(
            'Sync Books',
            JobKey.SyncBooks,
            JSON.stringify({ numberOfItems: 128 }),
            register,
        );

        return jobId;
    }
}
