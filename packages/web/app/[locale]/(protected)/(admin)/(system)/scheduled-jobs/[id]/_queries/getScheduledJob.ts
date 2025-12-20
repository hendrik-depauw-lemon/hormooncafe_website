import { graphql } from '@/src/gql/generated';

export const getScheduledJobQuery = graphql(`
    query ScheduledJobReadModel($id: ID!) {
        ScheduledJobReadModel(id: $id) {
            id
            name
            schedule
            jobKey
            active
            data
            createdAt
            updatedAt
        }
    }
`);
