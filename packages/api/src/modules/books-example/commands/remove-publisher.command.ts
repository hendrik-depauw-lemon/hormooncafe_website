import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { PublisherRemoved } from '../events/publisher-removed.event';

@Command({ authorize: 'all' })
export class RemovePublisher extends BaseCommand<RemovePublisher> {
    readonly id!: UUID;

    public static async handle(command: RemovePublisher, register: Register): Promise<UUID> {
        register.events(new PublisherRemoved({ id: command.id }));

        return command.id;
    }
}
