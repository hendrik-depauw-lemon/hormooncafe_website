import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { EntityValidators } from '../../../common/validators/entity-validators';
import { AppDomain } from '../../../error-handling/error-code';
import { View } from '../entities/view.entity';
import { ViewRemoved } from '../events/view-removed.event';
import { ViewValidators } from '../validators/view.validator';

@Command({ authorize: 'all' })
export class RemoveView extends BaseCommand<RemoveView> {
    readonly id!: UUID;

    public static async handle(command: RemoveView, register: Register): Promise<UUID> {
        const view = await EntityValidators.entityIsNotDeleted(View, command.id, AppDomain.View);
        ViewValidators.isOwnedByUser(view, register.currentUser);

        register.events(new ViewRemoved({ id: command.id }));

        return command.id;
    }
}
