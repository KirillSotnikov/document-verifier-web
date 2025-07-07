module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint-config-prettier",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        'project': './tsconfig.json'
    },
    "plugins": [
        "@typescript-eslint",
        "react",
        'prettier',
        "react-hooks",
        "import",
        "sort-keys-fix"
    ],
    "rules": {
        "import/prefer-default-export": "off",
        'react/react-in-jsx-scope': 0,
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                "argsIgnorePattern": "^_"
            }
        ],
        "@typescript-eslint/no-use-before-define": 0,
        "no-shadow": "off",
        "no-nested-ternary": "error",
        "react-hooks/exhaustive-deps": 0,
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
        "object-curly-spacing": ["error", "always"],
        "import/order": [
            "error",
            {
                "newlines-between": "always",
                "alphabetize": {
                    "order": "asc", /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */
                    "caseInsensitive": true /* ignore case. Options: [true, false] */
                },
                "pathGroups": [
                    {
                        "pattern": "react",
                        "group": "external",
                        "position": "before"
                    },
                    {
                        "pattern": "@lib/**",
                        "group": "external",
                        "position": "after"
                    },
                    {
                        "pattern": "**",
                        "group": "external",
                        "position": "before"
                    },
                    {
                        "pattern": "**",
                        "group": "builtin",
                        "position": "before"
                    },
                    {
                        "pattern": "**",
                        "group": "sibling",
                        "position": "before"
                    },
                    {
                        "pattern": "**",
                        "group": "parent",
                        "position": "before"
                    },
                    {
                        "pattern": "**",
                        "group": "object",
                        "position": "before"
                    }
                ],
                "pathGroupsExcludedImportTypes": ["react"]
            }
        ],
        "sort-keys-fix/sort-keys-fix": [
            "error",
            "asc",
            {
                "caseSensitive": true,
                "natural": true
            }
        ]
    }
}
