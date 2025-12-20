import { When } from '@cucumber/cucumber';

import { ExampleOperations } from './operations';

When('I retrieve all examples', async () => {
    await ExampleOperations.getAll();
});
