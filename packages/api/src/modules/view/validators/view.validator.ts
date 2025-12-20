import { UserEnvelope } from '@boostercloud/framework-types';

import { CurrentUserValidators } from '../../../common/validators/current-user-validators';
import { EntityNotFoundError } from '../../../error-handling/entity-not-found-error';
import { AppDomain } from '../../../error-handling/error-code';
import { View } from '../entities/view.entity';

export class ViewValidators {
    public static isOwnedByUser(view: View, userEnvelope: UserEnvelope | undefined): void {
        const userId = CurrentUserValidators.getUsername(userEnvelope);
        if (view.userId !== userId) {
            throw new EntityNotFoundError(View, view.id, AppDomain.View);
        }
    }
}
