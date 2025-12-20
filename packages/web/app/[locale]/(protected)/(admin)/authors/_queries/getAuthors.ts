import { graphql } from '@/src/gql/generated';

export const getAuthorsQuery = graphql(`
    query ListAuthorReadModels(
        $limit: Int
        $skip: Int
        $filter: ListAuthorReadModelFilter
        $sort: AuthorReadModelSortBy
    ) {
        ListAuthorReadModels(
            limit: $limit
            afterCursor: { skip: $skip }
            filter: $filter
            sortBy: $sort
        ) {
            count
            items {
                id
                name
                createdAt
                updatedAt
            }
        }
    }
`);
