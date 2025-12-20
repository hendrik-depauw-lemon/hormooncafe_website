import { graphql } from '@/src/gql/generated';

export const deleteCalendarEventMutation = graphql(`
    mutation DeleteCalendarEvent($input: DeleteCalendarEventInput!) {
        DeleteCalendarEvent(input: $input)
    }
`);
