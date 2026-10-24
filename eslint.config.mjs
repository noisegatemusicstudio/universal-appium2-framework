import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['node_modules/**', 'allure-results/**', 'apps/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
        $: 'readonly',
        $$: 'readonly',
        browser: 'readonly',
        driver: 'readonly',
        expect: 'readonly',
      },
    },
  },
);
