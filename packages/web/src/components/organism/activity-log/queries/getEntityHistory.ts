import { graphql } from '../../../../gql/generated';

export const getEntityHistoryQuery = graphql(`
    query GetEntityHistory($entityTypeName: String!, $entityId: String!) {
        GetEntityHistory(input: { entityTypeName: $entityTypeName, entityId: $entityId }) {
            entityTypeName
            entityId
            events {
                type
                date
                id
                value
                diff
                user {
                    id
                    email
                }
            }
        }
    }
`);
