module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-underscore-dangle': 'off',
    'react/camelcase': 'off',
    camelcase: 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/forbid-prop-types': 'off',
  },
};
