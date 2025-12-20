import { graphql } from '@/src/gql/generated';

export const updateBookMutation = graphql(`
    mutation ChangeBook($input: ChangeBookInput!) {
        ChangeBook(input: $input)
    }
`);
