import { graphql } from '../../../gql';

export const ADD_EXAMPLE = graphql(`
    mutation AddExample($title: String!, $description: String) {
        AddExample(input: { title: $title, description: $description })
    }
`);
