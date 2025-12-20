import { graphql } from '@/src/gql/generated';

export const getPublisherQuery = graphql(`
    query PublisherReadModel($id: ID!) {
        PublisherReadModel(id: $id) {
            id
            name
            address {
                placeId
            }
            createdAt
            updatedAt
        }
    }
`);
