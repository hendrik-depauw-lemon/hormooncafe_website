import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { CurrentUserValidators } from '../../../common/validators/current-user-validators';
import { ViewAdded } from '../events/view-added.event';

@Command({ authorize: 'all' })
export class AddView extends BaseCommand<AddView> {
    readonly name!: string;
    readonly pathname!: string;
    readonly searchParams!: string;

    public static async handle(command: AddView, register: Register): Promise<UUID> {
        const id = UUID.generate();
        const userId = CurrentUserValidators.getUsername(register.currentUser);

        register.events(
            new ViewAdded({
                id,
                userId,
                name: command.name,
                pathname: command.pathname,
                searchParams: command.searchParams,
            }),
        );

        return id;
    }
}
