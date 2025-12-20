import { JwksUriTokenVerifier } from '@boostercloud/framework-core';
import { DecodedToken, UserEnvelope } from '@boostercloud/framework-types';

export class CognitoJwtTokenVerifier extends JwksUriTokenVerifier {
    public toUserEnvelope(decodedToken: DecodedToken): UserEnvelope {
        const payload = decodedToken.payload;
        const username = payload.username;
        if (!username) {
            throw new Error('Cognito JWT token does not contain a username');
        }
        const roles = payload['cognito:groups'] || [];
        return {
            username,
            roles,
            claims: decodedToken.payload,
            header: decodedToken.header,
        };
    }
}
