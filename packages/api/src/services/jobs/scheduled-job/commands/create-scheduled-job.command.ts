import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../../common/base-models';
import { IsCronExpression } from '../../../../common/validation-decorators/is-cron-expression.decorator';
import { Admin } from '../../../../config/roles';
import { JobKey } from '../../job/job-key';
import { ScheduledJobCreated } from '../events/scheduled-job-created.event';

@Command({ authorize: [Admin] })
export class CreateScheduledJob extends BaseCommand<CreateScheduledJob> {
    readonly name!: string;
    @IsCronExpression()
    readonly schedule!: string;
    readonly jobKey!: JobKey;

    public static async handle(command: CreateScheduledJob, register: Register): Promise<UUID> {
        const id = UUID.generate();

        register.events(
            new ScheduledJobCreated({
                id,
                name: command.name,
                schedule: command.schedule,
                jobKey: command.jobKey,
            }),
        );

        return id;
    }
}
