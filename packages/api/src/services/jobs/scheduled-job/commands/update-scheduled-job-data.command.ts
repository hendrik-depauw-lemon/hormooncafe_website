import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../../common/base-models';
import { IsJson } from '../../../../common/validation-decorators/is-json.decorator';
import { EntityValidators } from '../../../../common/validators/entity-validators';
import { Admin } from '../../../../config/roles';
import { AppDomain } from '../../../../error-handling/error-code';
import { ScheduledJob } from '../entities/scheduled-job.entity';
import { ScheduledJobDataUpdated } from '../events/scheduled-job-data-updated.event';
import { ScheduledJobValidators } from '../validators/scheduled-job.validators';

@Command({ authorize: [Admin] })
export class UpdateScheduledJobData extends BaseCommand<UpdateScheduledJobData> {
    readonly id!: UUID;
    @IsJson()
    readonly data!: string;

    public static async handle(command: UpdateScheduledJobData, register: Register): Promise<UUID> {
        const scheduledJob = await EntityValidators.entityIsNotDeleted(
            ScheduledJob,
            command.id,
            AppDomain.Platform,
        );
        ScheduledJobValidators.scheduledJobIsInactive(scheduledJob);

        register.events(new ScheduledJobDataUpdated({ id: command.id, data: command.data }));

        return command.id;
    }
}
