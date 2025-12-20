import { Then } from '@cucumber/cucumber';

import { world } from '../../world';

Then('I should not get an error for adding an example', async () => {
    const error = world.parameters.AddExample?.error;
    if (error) {
        throw new Error(`Expected no error, but got: ${error}`);
    }
});
