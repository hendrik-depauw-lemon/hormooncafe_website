import { graphql } from '@/src/gql/generated';

export const addViewMutation = graphql(`
    mutation AddView($input: AddViewInput!) {
        AddView(input: $input)
    }
`);
