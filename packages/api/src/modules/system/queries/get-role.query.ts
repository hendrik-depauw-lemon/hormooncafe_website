import { Query } from '@boostercloud/framework-core';

import { BaseQuery } from '../../../common/base-models';
import { Role } from '../roles/role.enum';

// Query required to expose the Role type to the GraphQL API
@Query({ authorize: [] })
export class GetRole extends BaseQuery<GetRole> {
    public static async handle(): Promise<Role> {
        return Role.Admin;
    }
}
