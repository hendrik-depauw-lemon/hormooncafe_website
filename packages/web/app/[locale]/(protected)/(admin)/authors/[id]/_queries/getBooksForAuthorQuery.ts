import { graphql } from '@/src/gql/generated';

export const getBooksForAuthorQuery = graphql(`
    query ListBookReadModelsForAuthor(
        $limit: Int
        $skip: Int
        $filter: ListBookReadModelFilter
        $sort: BookReadModelSortBy
    ) {
        ListBookReadModels(
            limit: $limit
            afterCursor: { skip: $skip }
            filter: $filter
            sortBy: $sort
        ) {
            count
            items {
                id
                title
                publishDate
            }
        }
    }
`);
