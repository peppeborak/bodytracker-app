import pluginJs from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...tseslint.configs.recommended, {
    ignores: ['node_modules/', '.*', 'cdk.out/'],
  },
  {
    rules: {
      semi: ['error', 'never'],
      'quotes': [2, 'single', { 'avoidEscape': true }],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'caughtErrorsIgnorePattern': '^_'
        }
      ],
      'import/no-unresolved': 'off',
      'import/newline-after-import': ['error', { 'count': 2 }],
      'import/order': ['error', {
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        }
      }],
      'import/named': 'off',
    },
  }
]