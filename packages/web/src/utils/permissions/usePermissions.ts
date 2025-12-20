import { intersection } from 'lodash-es';
import { useSession } from 'next-auth/react';
import { useCallback, useMemo } from 'react';

import { Role } from '@/src/gql/generated/graphql';

export default function usePermissions(requiredRoles?: Role[]) {
    const session = useSession();
    const userRoles = session.data?.user.roles;

    const hasPermissions = useCallback(
        (roles: Role[]) => intersection(roles, userRoles).length > 0,
        [userRoles],
    );
    const permitted = useMemo(
        () => !!requiredRoles && hasPermissions(requiredRoles),
        [hasPermissions, requiredRoles],
    );
    return { permitted, hasPermissions };
}
