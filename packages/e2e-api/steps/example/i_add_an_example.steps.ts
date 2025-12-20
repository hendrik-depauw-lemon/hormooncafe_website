import { When } from '@cucumber/cucumber';

import { ExampleOperations } from './operations';

When('I add an example', async (dataTable) => {
    const data = dataTable.rowsHash();
    await ExampleOperations.add({
        title: data.title,
        description: data.description,
    });
});
