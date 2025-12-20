import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { BookRemoved } from '../events/book-removed.event';

@Command({ authorize: 'all' })
export class RemoveBook extends BaseCommand<RemoveBook> {
    readonly id!: UUID;

    public static async handle(command: RemoveBook, register: Register): Promise<UUID> {
        register.events(new BookRemoved({ id: command.id }));

        return command.id;
    }
}
