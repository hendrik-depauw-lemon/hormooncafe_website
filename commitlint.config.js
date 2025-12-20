const Configuration = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-case': [0],
        'type-enum': [2, 'always', ['chore', 'ci', 'feat', 'fix', 'refactor', 'revert', 'test']],
    },
    ignores: [(commit) => commit.startsWith('Merge', 'Revert', 'Reapply')],
};

module.exports = Configuration;
