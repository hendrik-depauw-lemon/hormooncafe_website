import { cacheExchange, Client, fetchExchange } from '@urql/core';

import { world } from '../world';
import { createCognitoAccessToken } from './auth';

type ClientAuth =
    | {
          roles: string[];
          sub?: string;
      }
    | {
          tokenOverwrite: string;
      };

export const getClient = async (auth?: ClientAuth) => {
    const token = await getToken(auth);
    const client = new Client({
        url: 'http://localhost:4000/graphql',
        exchanges: [cacheExchange, fetchExchange],
        fetchOptions: () => {
            return {
                headers: { authorization: token ? `Bearer ${token}` : '' },
            };
        },
    });

    return client;
};

async function getToken(auth?: ClientAuth) {
    if (!auth) {
        return world.parameters.accessToken;
    }
    if ('tokenOverwrite' in auth) {
        return auth.tokenOverwrite;
    }
    const customToken = await createCognitoAccessToken(
        auth.roles,
        world.parameters.getDereferencedItem(auth.sub ?? '-'),
    );
    return customToken.accessToken;
}
