import { graphql } from '@/src/gql/generated';

export const createRecurringCalendarEventMutation = graphql(`
    mutation CreateRecurringCalendarEvent($input: CreateRecurringCalendarEventInput!) {
        CreateRecurringCalendarEvent(input: $input)
    }
`);
