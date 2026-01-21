// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import { includeIgnoreFile } from '@eslint/compat';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default [
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...tseslint.configs.recommended,

	// Type-aware linting for source files only
	{
		files: ['**/*.ts', '**/*.tsx'],
		ignores: [
			'**/*.config.ts', // Exclude all config files
			'**/playwright.config.ts',
			'**/vite.config.ts',
			'apps/web/e2e/**' // Exclude test files
		],
		languageOptions: {
			parserOptions: {
				project: false
			}
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_'
				}
			]
		}
	},

	// Basic linting for config files (no type-checking)
	{
		files: ['**/*.config.ts', '**/playwright.config.ts', 'apps/web/e2e/**/*.ts'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off'
		}
	},

	...eslintPluginSvelte.configs['flat/recommended'],

	{
		files: ['apps/web/**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
				project: './apps/web/tsconfig.json',
				extraFileExtensions: ['.svelte']
			}
		}
	},

	{
		files: ['packages/**/*.ts', 'packages/**/*.js'],
		rules: {
			'svelte/valid-compile': 'off',
			'svelte/no-unused-svelte-ignore': 'off'
		}
	},

	prettier,

	{
		ignores: [
			'**/node_modules/**',
			'**/.svelte-kit/**',
			'**/build/**',
			'**/dist/**',
			'**/.pnpm-store/**'
		]
	}
];
