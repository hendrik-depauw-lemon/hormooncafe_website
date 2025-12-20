import { DefaultJWT, JWT } from 'next-auth/jwt';

import { AdminRole } from '../gql/graphql';

declare module 'next-auth' {
    interface Session {
        user: User;
    }

    interface User {
        roles: Profile['cognito:groups'];
        token: JWT['access_token'];
    }

    interface Profile {
        at_hash: string;
        sub: string;
        'cognito:groups': AdminRole[];
        email_verified: boolean;
        iss: string;
        'cognito:username': string;
        origin_jti: string;
        aud: string;
        token_use: string;
        auth_time: number;
        exp: number;
        iat: number;
        jti: string;
        email: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        'cognito:groups': Profile['cognito:groups'];
        access_token: string | undefined;
        refresh_token: string | undefined;
        expires_at: number | undefined;
    }
}
