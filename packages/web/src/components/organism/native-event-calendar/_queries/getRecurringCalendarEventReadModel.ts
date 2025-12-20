import { graphql } from '@/src/gql/generated';

export const getRecurringCalendarEventReadModel = graphql(`
    query GetRecurringCalendarEventReadModel($id: ID!) {
        RecurringCalendarEventReadModel(id: $id) {
            id
            calendarGroupId
            timezone
            displayName
            description
            rRuleSetString
            durationInMinutes
            frequency
            every
            onWeekdays
            startDate
            endDate
            color
            excludedDates
            createdAt
            updatedAt
        }
    }
`);
