import { graphql } from '../../../../gql/generated';

export const getFilesQuery = graphql(`
    query ListFileReadModels($ids: [ID!]!) {
        ListFileReadModels(filter: { id: { in: $ids } }) {
            items {
                id
                filename
                contentType
                createdAt
                signedDownloadUrl
                contentLength
            }
        }
    }
`);
