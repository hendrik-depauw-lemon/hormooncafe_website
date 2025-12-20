import { graphql } from '@/src/gql/generated';

export const addBookMutation = graphql(`
    mutation AddBook($input: AddBookInput!) {
        AddBook(input: $input)
    }
`);
