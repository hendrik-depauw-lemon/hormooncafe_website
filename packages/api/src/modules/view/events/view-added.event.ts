import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../common/base-models';

@Event
export class ViewAdded extends BaseEvent<ViewAdded> {
    readonly id!: UUID;
    readonly userId!: string;
    readonly name!: string;
    readonly pathname!: string;
    readonly searchParams!: string;

    public entityID(): UUID {
        return this.id;
    }
}
