import { graphql } from '@/src/gql/generated';

export const getAuthorsQuery = graphql(`
    query GetAuthorReadModels($ids: [ID!]!) {
        ListAuthorReadModels(filter: { id: { in: $ids } }, sortBy: { name: ASC }) {
            count
            items {
                id
                name
            }
        }
    }
`);
