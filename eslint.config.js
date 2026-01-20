import prettier from 'eslint-config-prettier';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './apps/web/svelte.config.js';
import pluginImport from 'eslint-plugin-import';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs.recommended,
    prettier,
    ...svelte.configs.prettier,

    // 🌿 Global rules
    {
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
        rules: {
            // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
            'no-undef': 'off'
        }
    },

    // 🌱 Architecture boundaries (NEW BLOCK)
    {
        files: ['**/*.ts', '**/*.js', '**/*.svelte.ts', '**/*.svelte.js'],

        plugins: { import: pluginImport },

        rules: {
            // 1. Prevent circular imports
            'import/no-cycle': ['error', { maxDepth: 1 }],

            // 2. Enforce layer boundaries
            'import/no-restricted-paths': [
                'error',
                {
                    zones: [
                        {
                            target: './packages/domain',
                            from: ['./packages/pdf-engine', './apps/web']
                        },
                        {
                            target: './packages/pdf-engine',
                            from: ['./apps/web']
                        }
                    ]
                }
            ],

            // 3. Prevent barrel imports inside SvelteKit
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        '$lib/index',
                        '$lib/**/index',
                        '**/src/lib/index',
                        '**/src/lib/**/index'
                    ]
                }
            ]
        }
    },

    // 🌻 Svelte overrides
    {
        files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                extraFileExtensions: ['.svelte'],
                parser: ts.parser,
                svelteConfig
            }
        }
    }
);
