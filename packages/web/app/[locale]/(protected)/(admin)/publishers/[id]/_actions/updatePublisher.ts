import { graphql } from '@/src/gql/generated';

export const updatePublisherMutation = graphql(`
    mutation ChangePublisher($input: ChangePublisherInput!) {
        ChangePublisher(input: $input)
    }
`);
