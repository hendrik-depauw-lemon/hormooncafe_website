import { intersection } from 'lodash-es';
import { getServerSession } from 'next-auth';

import nextAuthConfig from '@/src/configs/next-auth.config';
import { Role } from '@/src/gql/generated/graphql';

export const hasPermissions = async (roles: Role[]) => {
    const session = await getServerSession(nextAuthConfig);
    const userRoles = session?.user.roles;
    return intersection(roles, userRoles).length > 0;
};
