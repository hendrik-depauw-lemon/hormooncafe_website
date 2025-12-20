import { Entity, Reduces } from '@boostercloud/framework-core';

import { BaseEntity } from '../../../common/base-models';
import { ViewAdded } from '../events/view-added.event';
import { ViewRemoved } from '../events/view-removed.event';

@Entity
export class View extends BaseEntity<View> {
    readonly userId!: string;
    readonly name!: string;
    readonly pathname!: string;
    readonly searchParams!: string;

    @Reduces(ViewAdded)
    public static reduceViewAdded(event: ViewAdded): View {
        return new View({
            id: event.id,
            userId: event.userId,
            name: event.name,
            pathname: event.pathname,
            searchParams: event.searchParams,
            createdAt: event.eventTime,
            updatedAt: event.eventTime,
        });
    }

    @Reduces(ViewRemoved)
    public static reduceViewRemoved(event: ViewRemoved, currentView: View): View {
        return new View({
            ...currentView,
            deletedAt: event.eventTime,
        });
    }
}
