import { Booster, Command } from '@boostercloud/framework-core';
import { EventInterface, Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { EntityValidators } from '../../../common/validators/entity-validators';
import { AppDomain } from '../../../error-handling/error-code';
import { CalendarGroup } from '../entities/calendar-group.entity';
import { CalendarEventDeleted } from '../events/calendar-event-deleted.event';
import { CalendarEventUnlinkedFromGroup } from '../events/calendar-event-unlinked-from-group.event';
import { CalendarGroupDeleted } from '../events/calendar-group-deleted.event';
import { RecurringCalendarEventDeleted } from '../events/recurring-calendar-event-deleted.event';
import { RecurringCalendarEventUnlinkedFromGroup } from '../events/recurring-calendar-event-unlinked-from-group.event';
import { CalendarEventReadModel } from '../read-models/calendar-event.read-model';
import { RecurringCalendarEventReadModel } from '../read-models/recurring-calendar-event.read-model';

@Command({ authorize: 'all' })
export class DeleteCalendarGroup extends BaseCommand<DeleteCalendarGroup> {
    readonly calendarGroupId!: UUID;
    readonly keepAndUnlinkEvents!: boolean;

    static async handle(command: DeleteCalendarGroup, register: Register): Promise<UUID> {
        const { calendarGroupId, keepAndUnlinkEvents } = command;

        await EntityValidators.entityIsNotDeleted(
            CalendarGroup,
            calendarGroupId,
            AppDomain.Calendar,
        );

        const linkedEventsEvents = await this.handleLinkedCalendarEvents(
            calendarGroupId,
            keepAndUnlinkEvents,
        );

        register.events(
            new CalendarGroupDeleted({
                id: calendarGroupId,
            }),
            ...linkedEventsEvents,
        );

        return calendarGroupId;
    }

    private static async handleLinkedCalendarEvents(
        calendarGroupId: UUID,
        keepAndUnlinkEvents: boolean,
    ): Promise<EventInterface[]> {
        const linkedCalendarEvents = await Booster.readModel(CalendarEventReadModel)
            .filter({ calendarGroupId: { eq: calendarGroupId } })
            .search();
        const linkedRecurringCalendarEvents = await Booster.readModel(
            RecurringCalendarEventReadModel,
        )
            .filter({ calendarGroupId: { eq: calendarGroupId } })
            .search();

        if (keepAndUnlinkEvents) {
            return [
                ...linkedCalendarEvents.map(
                    (event) =>
                        new CalendarEventUnlinkedFromGroup({
                            id: event.id,
                        }),
                ),
                ...linkedRecurringCalendarEvents.map(
                    (event) =>
                        new RecurringCalendarEventUnlinkedFromGroup({
                            id: event.id,
                        }),
                ),
            ];
        } else {
            return [
                ...linkedCalendarEvents.map(
                    (event) =>
                        new CalendarEventDeleted({
                            id: event.id,
                        }),
                ),
                ...linkedRecurringCalendarEvents.map(
                    (event) =>
                        new RecurringCalendarEventDeleted({
                            id: event.id,
                        }),
                ),
            ];
        }
    }
}
