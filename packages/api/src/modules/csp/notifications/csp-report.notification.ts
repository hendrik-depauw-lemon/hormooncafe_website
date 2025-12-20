import { Notification } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../common/base-models';

@Notification()
export class CspReportNotification extends BaseEvent<CspReportNotification> {
    readonly id!: UUID;
    readonly report!: unknown;

    public entityID(): UUID {
        return this.id;
    }
}
