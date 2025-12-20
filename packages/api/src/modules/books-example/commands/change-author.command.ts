import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { AuthorChanged } from '../events/author-changed.event';

@Command({ authorize: 'all' })
export class ChangeAuthor extends BaseCommand<ChangeAuthor> {
    readonly id!: UUID;
    readonly name!: string;

    public static async handle(command: ChangeAuthor, register: Register): Promise<UUID> {
        register.events(
            new AuthorChanged({
                id: command.id,
                name: command.name,
            }),
        );

        return command.id;
    }
}
