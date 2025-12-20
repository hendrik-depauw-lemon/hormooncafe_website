import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:4000/graphql',
    documents: [
        'src/**/*.ts',
        'app/**/*.ts',
        'src/**/*.tsx',
        'app/**/*.tsx',
        '!src/gql/generated/**/*',
    ],
    ignoreNoDocuments: true,
    generates: {
        'src/gql/generated/': {
            preset: 'client',
            presetConfig: { fragmentMasking: false },
            config: { scalars: { Date: 'Date' } },
        },
        'src/gql/generated/schema.graphql': { plugins: ['schema-ast'] },
    },
};

export default config;
