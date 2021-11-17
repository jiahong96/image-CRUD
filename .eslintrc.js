module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "vue/component-name-in-template-casing": ["error", "kebab-case"],
    "vue/script-indent": ["error", 2, {
      "baseIndent": 0,
      "switchCase": 1,
      "ignores": []
    }],
    "indent": ["error", 2],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
