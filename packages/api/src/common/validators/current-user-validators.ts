import { UserEnvelope } from '@boostercloud/framework-types';

import { LoggedInUserCanNotBeFound } from '../../error-handling/logged-in-user-can-not-be-found';

export class CurrentUserValidators {
    static isLoggedIn(user: UserEnvelope | undefined) {
        if (user === undefined) {
            throw new LoggedInUserCanNotBeFound();
        }
        return user;
    }

    static getUsername(userEnvelope: UserEnvelope | undefined): string {
        const user = this.isLoggedIn(userEnvelope);
        return user.username;
    }
}
