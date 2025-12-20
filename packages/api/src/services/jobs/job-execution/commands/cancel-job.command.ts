import { Command } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../../common/base-models';
import { Admin } from '../../../../config/roles';
import { JobService } from '../../job.service';

@Command({ authorize: [Admin] })
export class CancelJob extends BaseCommand<CancelJob> {
    readonly id!: UUID;

    public static async handle(command: CancelJob): Promise<UUID> {
        JobService.cancelJob(command.id);

        return command.id;
    }
}
