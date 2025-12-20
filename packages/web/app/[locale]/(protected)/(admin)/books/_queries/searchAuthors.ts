import { graphql } from '@/src/gql/generated';

export const searchAuthorsQuery = graphql(`
    query SearchAuthorReadModels($searchTerm: String!) {
        ListAuthorReadModels(
            limit: 20
            filter: { name: { contains: $searchTerm } }
            sortBy: { name: ASC }
        ) {
            count
            items {
                id
                name
            }
        }
    }
`);
