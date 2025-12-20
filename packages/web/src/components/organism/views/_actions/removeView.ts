import { graphql } from '@/src/gql/generated';

export const removeViewMutation = graphql(`
    mutation RemoveView($input: RemoveViewInput!) {
        RemoveView(input: $input)
    }
`);
