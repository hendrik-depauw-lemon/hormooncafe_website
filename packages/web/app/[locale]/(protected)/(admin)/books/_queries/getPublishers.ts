import { graphql } from '@/src/gql/generated';

export const getPublishersQuery = graphql(`
    query GetPublisherReadModels($ids: [ID!]!) {
        ListPublisherReadModels(filter: { id: { in: $ids } }, sortBy: { name: ASC }) {
            count
            items {
                id
                name
            }
        }
    }
`);
