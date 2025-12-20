import { Then } from '@cucumber/cucumber';

import { world } from '../../world';

Then('I should see {string} examples', async (expectedCountString: string) => {
    const expectedCount = parseInt(expectedCountString, 10);
    const items = world.parameters.ListExampleReadModels?.data?.ListExample2ReadModels.items;
    if (items === undefined) {
        throw new Error('No items found');
    }
    if (items.length !== expectedCount) {
        throw new Error(`Expected ${expectedCount} examples, but found ${items.length}`);
    }
});
