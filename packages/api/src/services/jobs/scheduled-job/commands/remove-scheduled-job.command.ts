import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../../common/base-models';
import { EntityValidators } from '../../../../common/validators/entity-validators';
import { Admin } from '../../../../config/roles';
import { AppDomain } from '../../../../error-handling/error-code';
import { ScheduledJob } from '../entities/scheduled-job.entity';
import { ScheduledJobRemoved } from '../events/scheduled-job-removed.event';
import { ScheduledJobValidators } from '../validators/scheduled-job.validators';

@Command({ authorize: [Admin] })
export class RemoveScheduledJob extends BaseCommand<RemoveScheduledJob> {
    readonly id!: UUID;

    public static async handle(command: RemoveScheduledJob, register: Register): Promise<UUID> {
        const scheduledJob = await EntityValidators.entityIsNotDeleted(
            ScheduledJob,
            command.id,
            AppDomain.Platform,
        );
        ScheduledJobValidators.scheduledJobIsInactive(scheduledJob);

        register.events(new ScheduledJobRemoved({ id: command.id }));

        return command.id;
    }
}
