import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../../common/base-models';
import { EntityValidators } from '../../../../common/validators/entity-validators';
import { Admin } from '../../../../config/roles';
import { AppDomain } from '../../../../error-handling/error-code';
import { ScheduledJobService } from '../../scheduled-job.service';
import { ScheduledJob } from '../entities/scheduled-job.entity';
import { ScheduledJobDeactivated } from '../events/scheduled-job-deactivated.event';
import { ScheduledJobValidators } from '../validators/scheduled-job.validators';

@Command({ authorize: [Admin] })
export class DeactivateScheduledJob extends BaseCommand<DeactivateScheduledJob> {
    readonly id!: UUID;

    public static async handle(command: DeactivateScheduledJob, register: Register): Promise<UUID> {
        const scheduledJob = await EntityValidators.entityIsNotDeleted(
            ScheduledJob,
            command.id,
            AppDomain.Platform,
        );
        ScheduledJobValidators.scheduledJobIsActive(scheduledJob);

        ScheduledJobService.deactivateScheduledJob(scheduledJob);

        register.events(new ScheduledJobDeactivated({ id: command.id }));

        return command.id;
    }
}
