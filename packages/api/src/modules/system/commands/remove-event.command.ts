import { Booster, Command } from '@boostercloud/framework-core';

import { BaseCommand } from '../../../common/base-models';

@Command({ authorize: 'all' })
export class DeleteEvent extends BaseCommand<DeleteEvent> {
    entityTypeName!: string;
    entityID!: string;
    createdAt!: string;

    public static async handle(command: DeleteEvent): Promise<boolean> {
        await Booster.deleteEvent(command);

        return true;
    }
}
