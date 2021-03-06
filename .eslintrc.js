module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        mocha: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: true,

        // Enable JSX
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-unused-vars': ['warn'],
        'no-console': 0,
    },
    plugins: [
        'react',
    ],
    globals: {
        __: true,
    },
};