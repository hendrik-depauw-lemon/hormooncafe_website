import { AuthOptions } from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';
import { z } from 'zod';

const clientId = z
    .string({ required_error: 'Missing environment variable "NEXT_PUBLIC_COGNITO_CLIENT_ID"' })
    .parse(process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID);
const issuer = z
    .string({ required_error: 'Missing environment variable "NEXT_PUBLIC_COGNITO_ISSUER"' })
    .parse(process.env.NEXT_PUBLIC_COGNITO_ISSUER);
const cognitoUrl = z
    .string({ required_error: 'Missing environment variable "NEXT_PUBLIC_COGNITO_URL"' })
    .parse(process.env.NEXT_PUBLIC_COGNITO_URL);

const nextAuthConfig: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CognitoProvider({
            clientId,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            clientSecret: null,
            issuer,
            client: { token_endpoint_auth_method: 'none' },
            style: { logo: '', bg: '#ED9B33', text: '#FFFFFF' },
            name: 'SSO',
            idToken: true,
            checks: 'nonce',
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl || new URL(url).origin === cognitoUrl)
                return url;
            return baseUrl;
        },
        session: async ({ session, token }) => {
            session.user.roles = token['cognito:groups'];
            session.user.token = token.access_token;
            return session;
        },
        jwt: async ({ token, profile, account }) => {
            if (account) {
                // First-time login
                if (profile) token['cognito:groups'] = profile['cognito:groups'];
                if (account.access_token) token['access_token'] = account.access_token;
                if (account.refresh_token) token['refresh_token'] = account.refresh_token;
                if (account.expires_at) token['expires_at'] = account.expires_at;
                return token;
            } else if (Date.now() < (token.expires_at || 0) * 1000) {
                // Subsequent logins, but the `access_token` is still valid
                return token;
            } else {
                // Subsequent logins, but the `access_token` has expired, try to refresh it
                if (!token.refresh_token) throw new TypeError('Missing refresh_token');

                try {
                    // https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html
                    const response = await fetch(`${cognitoUrl}/oauth2/token`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({
                            client_id: clientId,
                            grant_type: 'refresh_token',
                            refresh_token: token.refresh_token,
                        }),
                    });

                    const tokensOrError = await response.json();

                    if (!response.ok) throw tokensOrError;

                    const newTokens = tokensOrError as {
                        access_token: string;
                        expires_in: number;
                        refresh_token?: string;
                    };

                    return {
                        ...token,
                        access_token: newTokens.access_token,
                        expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
                        // Some providers only issue refresh tokens once, so preserve if we did not get a new one
                        refresh_token: newTokens.refresh_token
                            ? newTokens.refresh_token
                            : token.refresh_token,
                    };
                } catch (error) {
                    console.error('Error refreshing access_token', error);
                    // If we fail to refresh the token, return an error so we can handle it on the page
                    token.error = 'RefreshTokenError';
                    return token;
                }
            }
        },
    },
    theme: {
        colorScheme: 'light', // "auto" | "dark" | "light"
        brandColor: '#003349',
        buttonText: '#FFFFFF',
        logo: '/logo.svg',
    },
};

export const signOutCallbackUrl = (currentLocation: string): string =>
    `${cognitoUrl}/logout?client_id=${clientId}&logout_uri=${currentLocation}`;

export default nextAuthConfig;
