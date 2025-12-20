import { graphql } from '@/src/gql/generated';

export const getCalendarEventsBetweenQuery = graphql(`
    query GetCalendarEventsBetween($input: GetCalendarEventsBetweenInput!) {
        GetCalendarEventsBetween(input: $input) {
            id
            isRecurringCalendarEvent
            recurringCalendarEventData {
                id
                timezone
                rRuleSetString
                durationInMinutes
                frequency
                every
                onWeekdays
                startDate
                endDate
                createdAt
                updatedAt
            }
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
