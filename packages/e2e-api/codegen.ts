import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:4000/graphql',
    documents: ['**/*.ts', 'app/**/*.ts', '!gql/**/*'],
    ignoreNoDocuments: true,
    generates: {
        'gql/': {
            preset: 'client',
            presetConfig: {
                fragmentMasking: false,
            },
            config: {
                scalars: {
                    Date: 'Date',
                },
            },
        },
        'gql/schema.graphql': {
            plugins: ['schema-ast'],
        },
    },
};

export default config;
