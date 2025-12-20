import { graphql } from '../../../../gql/generated';

export const createFileMutation = graphql(`
    mutation CreateFile($input: CreateFileInput!) {
        CreateFile(input: $input) {
            createdFileId
            filename
            signedUrl
            contentType
        }
    }
`);
