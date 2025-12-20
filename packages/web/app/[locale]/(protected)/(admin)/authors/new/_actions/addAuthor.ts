import { graphql } from '@/src/gql/generated';

export const addAuthorMutation = graphql(`
    mutation AddAuthor($input: AddAuthorInput!) {
        AddAuthor(input: $input)
    }
`);
