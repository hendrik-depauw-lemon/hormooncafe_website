import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { IsOptionalHexColor } from '../../../common/validation-decorators/is-hex-color.decorator';
import { NonEmpty } from '../../../common/validation-decorators/non-empty.decorator';
import { CalendarGroupCreated } from '../events/calendar-group-created.event';

@Command({ authorize: 'all' })
export class CreateCalendarGroup extends BaseCommand<CreateCalendarGroup> {
    @NonEmpty()
    readonly name!: string;
    @IsOptionalHexColor()
    readonly color?: string;

    static async handle(command: CreateCalendarGroup, register: Register): Promise<UUID> {
        const { name, color } = command;

        const id = UUID.generate();
        register.events(
            new CalendarGroupCreated({
                id: id,
                name: name,
                color: color,
            }),
        );

        return id;
    }
}
