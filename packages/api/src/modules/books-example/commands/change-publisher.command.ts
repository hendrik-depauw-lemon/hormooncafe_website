import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { LocationService } from '../../../services/location/location.service';
import { PublisherChanged } from '../events/publisher-changed.event';

@Command({ authorize: 'all' })
export class ChangePublisher extends BaseCommand<ChangePublisher> {
    readonly id!: UUID;
    readonly name!: string;
    readonly addressPlaceId?: string;

    public static async handle(command: ChangePublisher, register: Register): Promise<UUID> {
        register.events(
            new PublisherChanged({
                id: command.id,
                name: command.name,
                address: await LocationService.getAddress(command.addressPlaceId),
            }),
        );

        return command.id;
    }
}
