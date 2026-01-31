export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type must be one of the following
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style (formatting, etc.)
        'refactor', // Code refactoring
        'perf', // Performance improvement
        'test', // Adding tests
        'chore', // Maintenance tasks
        'ci', // CI/CD changes
        'build', // Build system changes
        'revert', // Revert previous commit
      ],
    ],
    // Subject should be lowercase
    'subject-case': [2, 'always', 'lower-case'],
    // Subject should not end with period
    'subject-full-stop': [2, 'never', '.'],
    // Header max length 100 characters
    'header-max-length': [2, 'always', 100],
  },
};
