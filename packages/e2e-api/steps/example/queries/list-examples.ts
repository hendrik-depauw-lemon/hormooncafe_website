import { graphql } from '../../../gql';

export const LIST_EXAMPLE_READ_MODELS = graphql(`
    query ListExample2ReadModels {
        ListExample2ReadModels {
            items {
                id
                title
                description
            }
        }
    }
`);
