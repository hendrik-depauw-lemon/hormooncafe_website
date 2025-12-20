import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { AuthorRemoved } from '../events/author-removed.event';

@Command({ authorize: 'all' })
export class RemoveAuthor extends BaseCommand<RemoveAuthor> {
    readonly id!: UUID;

    public static async handle(command: RemoveAuthor, register: Register): Promise<UUID> {
        register.events(new AuthorRemoved({ id: command.id }));

        return command.id;
    }
}
