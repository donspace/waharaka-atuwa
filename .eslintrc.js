module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es2020: true
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended'
    ],
    plugins: ['vue'],
    rules: {
        // Disable this rule which is meant for Vue 2
        'vue/no-multiple-template-root': 'off'
    }
}
