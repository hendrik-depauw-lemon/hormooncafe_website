import { AddExampleInput } from '../../gql/graphql';
import { getClient } from '../../util/getUrqlClient';
import { world } from '../../world';
import { ADD_EXAMPLE } from './queries/add-example';
import { LIST_EXAMPLE_READ_MODELS } from './queries/list-examples';

export class ExampleOperations {
    public static generateIdentifier(title: string, dereferenceable: boolean = false): string {
        return `${dereferenceable ? '*' : ''}${title}`;
    }

    public static async add(data: AddExampleInput) {
        const client = await getClient();
        const response = await client.mutation(ADD_EXAMPLE, {
            title: data.title,
            description: data.description,
        });
        world.parameters.AddExample = response;

        const exampleId = response.data?.AddExample;
        if (exampleId) {
            const identifier = this.generateIdentifier(data.title);
            world.parameters.itemMap.set(identifier, exampleId);
        }
    }

    public static async getAll() {
        const client = await getClient();
        const response = await client.query(LIST_EXAMPLE_READ_MODELS, {});
        world.parameters.ListExampleReadModels = response;
    }
}
