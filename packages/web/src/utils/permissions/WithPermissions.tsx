import { FC, PropsWithChildren } from 'react';

import { Role } from '@/src/gql/generated/graphql';

import usePermissions from './usePermissions';

interface WithPermissionsProps extends PropsWithChildren {
    permissions: Role[];
}

export const WithPermissions: FC<WithPermissionsProps> = ({ children, permissions }) => {
    const { permitted } = usePermissions(permissions);
    return permitted ? <>{children}</> : null;
};
