import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import {
    After,
    Before,
    IWorldOptions,
    setDefaultTimeout,
    setWorldConstructor,
    World,
} from '@cucumber/cucumber';
import { TestStepResultStatus } from '@cucumber/messages';
import { Browser, chromium, Page } from 'playwright';

import { timeout } from './util/timeout';

setDefaultTimeout(timeout);

setWorldConstructor(function createWorld(
    this: World & { foo: string },
    props: IWorldOptions & { itemMap: Map<string, string> },
) {
    Object.assign(this, props, { parameters: { ...props.parameters, itemMap: new Map() } });
});

let page: Page;
let browser: Browser;

Before(async function () {
    browser = await chromium.launch({ headless: !!process.env.CI });
    const context = await browser.newContext();
    page = await context.newPage();
});

After({ timeout: timeout + 2000 }, async function (scenario) {
    if (scenario.result?.status === TestStepResultStatus.FAILED) {
        this.attach(await page.screenshot({ fullPage: true }), 'image/png');
    }
    await browser.close();
});

export { page, browser };
