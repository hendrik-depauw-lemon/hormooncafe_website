import { graphql } from '@/src/gql/generated';

export const getCalendarGroupForComboBoxQuery = graphql(`
    query GetCalendarGroupForComboBox($id: ID!) {
        CalendarGroupReadModel(id: $id) {
            id
            name
        }
    }
`);
