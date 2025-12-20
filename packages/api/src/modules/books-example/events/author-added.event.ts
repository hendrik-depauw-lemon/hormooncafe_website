import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../common/base-models';

@Event
export class AuthorAdded extends BaseEvent<AuthorAdded> {
    readonly id!: UUID;
    readonly name!: string;

    public entityID(): UUID {
        return this.id;
    }
}
