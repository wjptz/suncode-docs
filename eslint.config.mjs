import js from '@eslint/js';

const NODE_GLOBALS = {
  process: 'readonly',
  console: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  setInterval: 'readonly',
  clearInterval: 'readonly',
  __dirname: 'readonly',
  __filename: 'readonly',
};

export default [
  js.configs.recommended,
  {
    ignores: ['node_modules/', '.mintlify/', '.suncode/'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
  {
    files: ['scripts/**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: NODE_GLOBALS,
    },
  },
];
