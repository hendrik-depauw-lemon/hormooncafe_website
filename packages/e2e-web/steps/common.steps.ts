import { Given, Then } from '@cucumber/cucumber';

import { expect } from '../util/expect';
import { page } from '../world';

Given('I am on the {string} page', async (url: string) => {
    await page.goto(`${process.env.WEB_URL}${url}`);
});

Then('I should see {string} on the screen', async (text: string) => {
    await expect(page.getByText(text)).toBeVisible();
});
