// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['expo', 'prettier', 'plugin:react/recommended'],
  plugins: ['prettier', 'react', 'react-native'],
  rules: {
    'prettier/prettier': 'error',
    'react/function-component-definition': [
      1,
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ],
    'no-param-reassign': 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx', '.js', '.jsx'] }],
    'no-use-before-define': ['error', { variables: false }],
    'react/prop-types': ['error', { ignore: ['navigation', 'navigation.navigate'] }],
    'react-native/no-inline-styles': 'warn',
    'max-lines': ['error', { max: 800 }],
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
