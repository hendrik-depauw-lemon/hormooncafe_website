import { graphql } from '@/src/gql/generated';

export const searchPublishersQuery = graphql(`
    query SearchPublisherReadModels($searchTerm: String!) {
        ListPublisherReadModels(
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
