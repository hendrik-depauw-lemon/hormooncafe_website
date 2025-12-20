import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { LocationService } from '../../../services/location/location.service';
import { PublisherAdded } from '../events/publisher-added.event';

@Command({ authorize: 'all' })
export class AddPublisher extends BaseCommand<AddPublisher> {
    readonly name!: string;
    readonly addressPlaceId?: string;

    public static async handle(command: AddPublisher, register: Register): Promise<UUID> {
        const id = UUID.generate();

        register.events(
            new PublisherAdded({
                id,
                name: command.name,
                address: await LocationService.getAddress(command.addressPlaceId),
            }),
        );

        return id;
    }
}
