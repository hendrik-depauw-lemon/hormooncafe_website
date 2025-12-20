import { graphql } from '@/src/gql/generated';

export const getCalendarEventReadModel = graphql(`
    query GetCalendarEventReadModel($id: ID!) {
        CalendarEventReadModel(id: $id) {
            id
            calendarGroupId
            displayName
            description
            startDateTime
            endDateTime
            color
            createdAt
            updatedAt
        }
    }
`);
