module.exports = {
    root: true,
    overrides: [
        {
            files: ['*.ts'],
            parserOptions: {
                project: ['tsconfig.json'],
                createDefaultProgram: true
            },
            extends: [
                'eslint:recommended',
                'plugin:import/recommended',
                'plugin:import/typescript',
                'airbnb-typescript/base'
            ],
            rules: {
                '@typescript-eslint/no-this-alias': 'warn',

                '@typescript-eslint/no-unnecessary-boolean-literal-compare':
                    'warn',

                '@typescript-eslint/quotes': [
                    'warn',
                    'single',
                    {
                        avoidEscape: true
                    }
                ],

                '@typescript-eslint/indent': ['warn', 4],

                '@typescript-eslint/brace-style': ['warn', 'allman', { "allowSingleLine": true }],

                '@typescript-eslint/naming-convention': [
                    'warn',
                    {
                        selector: 'enumMember',
                        format: ['PascalCase', 'UPPER_CASE'],
                        leadingUnderscore: 'allow',
                        trailingUnderscore: 'allow'
                    },
                    {
                        selector: 'default',
                        format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
                        leadingUnderscore: 'allow',
                        trailingUnderscore: 'allow'
                    },

                    {
                        selector: 'variable',
                        format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
                        leadingUnderscore: 'allow',
                        trailingUnderscore: 'allow'
                    },

                    {
                        selector: 'typeLike',
                        format: ['PascalCase', 'UPPER_CASE']
                    }
                ],

                '@typescript-eslint/consistent-type-assertions': [
                    'warn',
                    {
                        assertionStyle: 'angle-bracket',
                        objectLiteralTypeAssertions: 'allow',
                    }
                ],

                '@typescript-eslint/default-param-last': ["off"],

                'class-methods-use-this': ['off'],

                'arrow-parens': ['off', 'always'],
                'comma-dangle': ['warn', 'always-multiline'],
                'id-blacklist': 'warn',
                'import/order': 'warn',
                'newline-per-chained-call': 'warn',
                'no-duplicate-imports': 'warn',
                'no-multiple-empty-lines': 'warn',

                'padding-line-between-statements': [
                    'warn',
                    {
                        blankLine: 'always',
                        prev: '*',
                        next: 'return'
                    }
                ],

                'prefer-template': 'warn',
                'space-before-function-paren': 'off',
                'space-in-parens': ['warn', 'never'],
                'import/prefer-default-export': 'off',

                'padded-blocks': [
                    'warn',
                    {
                        blocks: 'never'
                    }
                ],

                'max-len': ['warn', 140],
                'array-bracket-spacing': ['warn', 'always'],

                'template-curly-spacing': ['warn', 'always'],

                'prefer-arrow-callback': ["off", { "allowNamedFunctions": true }],

                "implicit-arrow-linebreak": ["off"],
                "function-paren-newline": ["off"],
                "operator-linebreak": ["warn", "after"],

                "no-template-curly-in-string": ["warn"],

            }
        },
        {
            files: ['*.html'],
            extends: ['plugin:@angular-eslint/template/recommended'],
            rules: {}
        }
    ]
};
