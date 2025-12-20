import { Given } from '@cucumber/cucumber';

import { createCognitoAccessToken } from '../util/auth';
import { world } from '../world';

Given('I am logged in as an admin', async function () {
    const accessTokenResponse = await createCognitoAccessToken(['Admin']);
    world.parameters.accessToken = accessTokenResponse.accessToken;
});

Given('I am logged in as a {string}', async function (role: string) {
    const accessTokenResponse = await createCognitoAccessToken([role]);
    world.parameters.accessToken = accessTokenResponse.accessToken;
});

Given('I am logged out', async function () {
    world.parameters.accessToken = '';
});
