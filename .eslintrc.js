module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-shadow': 0,
    'class-methods-use-this': 0,
    'import/no-mutable-exports': 0,
    'import/no-named-as-default-member': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false }],
    '@typescript-eslint/no-explicit-any': 'off',
    'lines-between-class-members': 0,
    'object-curly-newline': 0,
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: false }],
  },
};
