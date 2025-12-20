import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { AuthorAdded } from '../events/author-added.event';

@Command({ authorize: 'all' })
export class AddAuthor extends BaseCommand<AddAuthor> {
    readonly name!: string;

    public static async handle(command: AddAuthor, register: Register): Promise<UUID> {
        const id = UUID.generate();

        register.events(new AuthorAdded({ id, name: command.name }));

        return id;
    }
}
