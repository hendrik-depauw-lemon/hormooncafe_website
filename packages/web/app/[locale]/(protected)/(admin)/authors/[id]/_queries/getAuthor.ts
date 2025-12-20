import { graphql } from '@/src/gql/generated';

export const getAuthorQuery = graphql(`
    query AuthorReadModel($id: ID!) {
        AuthorReadModel(id: $id) {
            id
            name
            createdAt
            updatedAt
        }
    }
`);
