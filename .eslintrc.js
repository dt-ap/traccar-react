module.exports = {
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks','@typescript-eslint', 'prettier'],
  rules: {
    'no-console': 'warn',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type' : 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/test.tsx', '**/test.ts'] }],
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-one-expression-per-line': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      'node': {
        'extensions': ['.ts', '.tsx', '.js', '.jsx'],
        'moduleDirectory': ['node_modules', 'src/']
      }
    }
  }
};
