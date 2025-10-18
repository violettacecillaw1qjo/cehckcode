import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const groups = [
    'type', // Type imports (e.g., TypeScript types)
    'builtin', // Built-in modules (e.g., fs, path)
    'object', // Namespace imports (e.g., import * as fs from 'fs')
    'external', // External dependencies (e.g., lodash)
    'internal', // Internal imports (e.g., your project's base paths)
    'parent', // Parent imports (e.g., ../)
    'sibling', // Sibling imports (e.g., ./file)
    'index', // Index file imports (e.g., ./)
];
const sortingConfigs = [
    // '~/**',
    '@/enums/**',
    '@/types/**',
    '@/constants/**',
    '@/variables/**',
    '@/cores/**',
    '@/services/**',
    '@/hooks/**',
    '@/stores/**',
    '@/utils/**',
    '@/assets/**',
    '@/extensions/**',
    '@/components/**',
    '@/layouts/**',
];

const eslintConfig = [
    {
        ignores: [
            '!types.d.ts',
            '.now/*',
            '*.css',
            '.changeset',
            'dist',
            'esm/*',
            'public/*',
            'tests/*',
            'scripts/*',
            '*.config.js',
            '.DS_Store',
            'node_modules',
            'package.json',
            'coverage',
            '.next',
            'build',
            '!.commitlintrc.cjs',
            '!.lintstagedrc.cjs',
            '!jest.config.js',
            '!plopfile.js',
            '!react-shim.js',
            '!tsup.config.ts',
            'src/components/common/input-editor/types.d.ts',
        ],
    },
    ...compat.config({
        extends: [
            'next',
            'next/core-web-vitals',
            'next/typescript',
            'prettier',
            'plugin:react/recommended',
            'plugin:prettier/recommended',
            'plugin:react-hooks/recommended',
            'plugin:jsx-a11y/recommended',
        ],
        rules: {
            'import/order': [
                'warn',
                {
                    pathGroups: [
                        {
                            group: 'external',
                            position: 'after',
                            pattern: '~/**',
                        },
                        ...sortingConfigs.map((item) => ({
                            group: 'internal',
                            position: 'after',
                            pattern: item,
                        })),
                    ],
                    'newlines-between': 'always',
                    groups: groups,
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_.*?$',
                    ignoreRestSiblings: false,
                    args: 'after-used',
                },
            ],
            'import/no-anonymous-default-export': [
                'error',
                {
                    allowObject: true,
                },
            ],
            '@typescript-eslint/no-unsafe-function-type': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            'jsx-a11y/no-static-element-interactions': 'off',
            'jsx-a11y/click-events-have-key-events': 'off',
            'jsx-a11y/interactive-supports-focus': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',
            'react-hooks/exhaustive-deps': 'off',
            '@next/next/no-img-element': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/self-closing-comp': 'warn',
            'jsx-a11y/no-autofocus': 'off',
            'react/jsx-uses-react': 'off',
            'prettier/prettier': 'off',
            'react/prop-types': 'off',
            'no-unused-vars': 'off',
            'prefer-const': 'warn',
        },
    }),
];

export default eslintConfig;
