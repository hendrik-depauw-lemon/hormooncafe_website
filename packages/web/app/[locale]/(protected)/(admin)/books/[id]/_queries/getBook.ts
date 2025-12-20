import { graphql } from '@/src/gql/generated';

export const getBookQuery = graphql(`
    query BookReadModel($id: ID!) {
        BookReadModel(id: $id) {
            id
            title
            description
            publishDate
            numberOfPages
            availableAsEbook
            coverType
            authorIds
            publisherId
            createdAt
            updatedAt
        }
    }
`);
