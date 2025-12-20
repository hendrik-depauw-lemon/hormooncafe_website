import { DecodedToken, TokenVerifier, UserEnvelope } from '@boostercloud/framework-types';
import { timingSafeEqual } from 'crypto';

import { API_KEY } from '../../config/roles';

export class ApiKeyTokenVerifier implements TokenVerifier {
    constructor(private readonly apiKey: string) {}

    public async verify(token: string): Promise<DecodedToken> {
        const strippedToken = token.trim().replace(/^Bearer\s+/, '');
        if (!timingSafeEqual(Buffer.from(strippedToken), Buffer.from(this.apiKey))) {
            throw new Error('Invalid API key');
        }
        return {
            header: {
                kid: '',
            },
            payload: {
                sub: 'api-key',
            },
        };
    }

    public toUserEnvelope(): UserEnvelope {
        return {
            username: 'api-key',
            roles: [API_KEY.name],
            claims: {},
        };
    }
}
