import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../../common/base-models';
import { IsJson } from '../../../../common/validation-decorators/is-json.decorator';
import { Admin } from '../../../../config/roles';
import { JobService } from '../../job.service';
import { JobKey } from '../../job/job-key';

@Command({ authorize: [Admin] })
export class ExecuteJob extends BaseCommand<ExecuteJob> {
    readonly name!: string;
    readonly jobKey!: JobKey;
    @IsJson()
    readonly data?: string;

    public static async handle(command: ExecuteJob, register: Register): Promise<UUID> {
        const id = await JobService.runJob(command.name, command.jobKey, command.data, register);

        return id;
    }
}
