import { AddExampleInput } from '../../gql/graphql';
import { getClient } from '../../util/getUrqlClient';
import { world } from '../../world';
import { ADD_EXAMPLE } from './queries/add-example';

export async function mutationAddExample(data: AddExampleInput) {
    const client = await getClient();
    const response = await client.mutation(ADD_EXAMPLE, {
        title: data.title,
        description: data.description,
    });
    world.parameters.AddExample = response;

    const exampleId = response.data?.AddExample;
    if (exampleId) {
        world.parameters.itemMap.set(data.title, exampleId);
    }
}
