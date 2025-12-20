// eslint-disable-next-line no-restricted-imports
import { expect as playwrightExpect } from '@playwright/test';

import { timeout } from './timeout';

export const expect = playwrightExpect.configure({ timeout });
