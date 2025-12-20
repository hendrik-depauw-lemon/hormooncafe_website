import { Then } from '@cucumber/cucumber';

import { findObjectOrThrow } from '../../util/find-object';
import { world } from '../../world';

Then('I should see an example with the following information', async (dataTable) => {
    const data = dataTable.rowsHash();
    const items = world.parameters.ListExampleReadModels?.data?.ListExample2ReadModels.items;
    findObjectOrThrow(items, data);
});
