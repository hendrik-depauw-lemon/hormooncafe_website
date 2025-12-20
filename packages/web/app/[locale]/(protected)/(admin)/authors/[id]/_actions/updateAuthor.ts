import { graphql } from '@/src/gql/generated';

export const updateAuthorMutation = graphql(`
    mutation ChangeAuthor($input: ChangeAuthorInput!) {
        ChangeAuthor(input: $input)
    }
`);
