import { randomUUID } from 'crypto';

async function fetchToken(claims: string): Promise<string> {
    const url = 'http://localhost:2377/token';
    const headers = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: claims,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
}

export async function createCognitoAccessToken(
    roles: string[],
    inputUid?: string,
): Promise<{ accessToken: string; subject: string }> {
    const uid = inputUid ?? randomUUID();
    const email = `test-${uid}@test.com`;
    const claims = JSON.stringify({
        sub: uid,
        'cognito:groups': roles,
        iss: 'https://localhost:2377',
        version: 2,
        client_id: '3kjn23k71ossg9mbmppl0jqcpo',
        origin_jti: '95d267eb-9f3a-42a3-8a98-07012ac5c424',
        event_id: '45c15c8b-bd9a-4e6c-82c0-90838917138a',
        token_use: 'access',
        scope: 'openid email',
        auth_time: 1717616001,
        exp: 1817619601,
        iat: 1717616001,
        jti: 'ead173a5-f460-4069-be01-a572a244d850',
        username: email,
        email: email,
        email_verified: true,
    });
    const accessToken = await fetchToken(claims);
    return { accessToken, subject: uid };
}
