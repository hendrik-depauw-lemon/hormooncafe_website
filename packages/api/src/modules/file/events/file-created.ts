import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../common/base-models';

@Event
export class FileCreated extends BaseEvent<FileCreated> {
    readonly id!: UUID;
    readonly filename!: string;
    readonly contentType?: string;
    readonly storageKey!: string;
    readonly externalId?: string;

    public entityID(): UUID {
        return this.id;
    }
}
