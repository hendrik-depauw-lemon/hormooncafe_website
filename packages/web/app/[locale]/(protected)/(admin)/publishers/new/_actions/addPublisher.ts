import { graphql } from '@/src/gql/generated';

export const addPublisherMutation = graphql(`
    mutation AddPublisher($input: AddPublisherInput!) {
        AddPublisher(input: $input)
    }
`);
