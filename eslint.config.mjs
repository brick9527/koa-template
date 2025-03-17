import globals from 'globals';
import pluginJs from '@eslint/js';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: { sourceType: 'module' },
    // env: {
    //   commonjs: true,
    //   es2021: true,
    //   node: true,
    // },
    // extends: ['standard'],
    // parserOptions: {
    //   ecmaVersion: 2021,
    //   sourceType: "module",
    // },
    rules: {
      semi: ['error', 'always'],
      'arrow-parens': ['error', 'as-needed'],
      quotes: ['error', 'single'],
      'comma-dangle': ['error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'always-multiline',
      }],
    },
  },
  {
    languageOptions: { globals: globals.node },
  },
  pluginJs.configs.recommended,
];