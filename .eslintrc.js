module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  rules: {
    'brace-style': [2, '1tbs'],
    camelcase: 0,
    'no-alert': 2,
    'no-bitwise': 2,
    'no-empty': 2,
    'no-ex-assign': 2,
    'no-lonely-if': 2,
    'no-loop-func': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-tabs': 2,
    'no-underscore-dangle': 0,
    'no-unused-vars': 0,
    'quote-props': [2, 'as-needed'],
    'space-before-function-paren': [2, 'never'],
    quotes: [2, 'single', 'avoid-escape'],
    'space-before-blocks': 2,
    'space-infix-ops': 2,
    strict: 0,
  },
};
