import { graphql } from '@/src/gql/generated';

export const getCalendarGroupQuery = graphql(`
    query GetCalendarGroup($id: ID!) {
        CalendarGroupReadModel(id: $id) {
            id
            name
            color
            createdAt
            updatedAt
        }
    }
`);
