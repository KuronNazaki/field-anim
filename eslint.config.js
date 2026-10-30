import js from '@eslint/js'
import globals from 'globals'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      // 3. Set the TypeScript parser
      parser: tseslint.parser,
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  prettierConfig,
)
