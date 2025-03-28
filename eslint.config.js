// eslint.config.js
import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react/recommended',
  ],
  rules: {
    'max-lines': [
      'warn',
      {
        max: 250,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'max-depth': ['error', { max: 3 }],
    'max-nested-callbacks': ['error', 2],
    'no-multiple-empty-lines': ['warn', { max: 2 }],
    'no-template-curly-in-string': 'error',
    'prefer-const': 'error',
    'no-useless-escape': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-console': 'off',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'react/display-name': 'warn',
    'react/prop-types': 'off',
  },
});