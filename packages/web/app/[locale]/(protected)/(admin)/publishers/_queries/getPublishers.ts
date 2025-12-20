import { graphql } from '@/src/gql/generated';

export const getPublishersQuery = graphql(`
    query ListPublisherReadModels(
        $limit: Int
        $skip: Int
        $filter: ListPublisherReadModelFilter
        $sort: PublisherReadModelSortBy
    ) {
        ListPublisherReadModels(
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
