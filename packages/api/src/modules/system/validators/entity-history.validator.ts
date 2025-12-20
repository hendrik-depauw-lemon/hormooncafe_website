/* eslint-disable unused-imports/no-unused-vars-ts */
import { Register } from '@boostercloud/framework-types';

export class EntityHistoryValidators {
    public static async isUserAllowedToViewEntityHistory(
        entityTypeName: string,
        entityId: string,
        register: Register,
    ): Promise<boolean> {
        // TODO: implement your logic to check if the user is allowed to view the entity history
        return true;
        // return register.currentUser?.id === '';
    }

    public static async isUserAllowedToViewFullEntityHistory(
        entityTypeName: string,
        entityId: string,
        register: Register,
    ): Promise<boolean> {
        // TODO: implement your logic to check if the user is allowed to view the entity history
        return true;
        // return register.currentUser?.roles.includes('SuperAdmin') || false;
    }
}
