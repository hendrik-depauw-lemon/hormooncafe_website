import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../../common/base-models';
import { IsCronExpression } from '../../../../common/validation-decorators/is-cron-expression.decorator';
import { EntityValidators } from '../../../../common/validators/entity-validators';
import { Admin } from '../../../../config/roles';
import { AppDomain } from '../../../../error-handling/error-code';
import { ScheduledJob } from '../entities/scheduled-job.entity';
import { ScheduledJobScheduleUpdated } from '../events/scheduled-job-schedule-updated.event';
import { ScheduledJobValidators } from '../validators/scheduled-job.validators';

@Command({ authorize: [Admin] })
export class UpdateScheduledJobSchedule extends BaseCommand<UpdateScheduledJobSchedule> {
    readonly id!: UUID;
    @IsCronExpression()
    readonly schedule!: string;

    public static async handle(
        command: UpdateScheduledJobSchedule,
        register: Register,
    ): Promise<UUID> {
        const scheduledJob = await EntityValidators.entityIsNotDeleted(
            ScheduledJob,
            command.id,
            AppDomain.Platform,
        );
        ScheduledJobValidators.scheduledJobIsInactive(scheduledJob);

        register.events(
            new ScheduledJobScheduleUpdated({ id: command.id, schedule: command.schedule }),
        );

        return command.id;
    }
}
