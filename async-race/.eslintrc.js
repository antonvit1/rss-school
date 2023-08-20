module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,

    },
    "extends": [
        "eslint:recommended",
        "airbnb-typescript/base",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project":  ['./tsconfig.json'],
    },
    "plugins": [
        "@typescript-eslint",
        "prettier",

        "import"

    ],
    "rules": {
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "no-debugger": "off",
        "no-console": 0,
        "max-lines-per-function": ["error", 40]
    },

}