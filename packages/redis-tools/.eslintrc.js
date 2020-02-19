module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true
  },
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'jest'
  ],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'warn',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/class-name-casing': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-function-return-type': ['error', {allowExpressions: true}],
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2, {
      'MemberExpression': 'off',
      "FunctionDeclaration": {"parameters": "first"}
    }],
    'no-trailing-spaces': ['error', {'ignoreComments': true, 'skipBlankLines': true}],
    quotes: ['error', 'single', {allowTemplateLiterals: true}],
    semi: ['error', 'never'],
    'spaced-comment': ['error', 'always'],
    'no-irregular-whitespace': ['error', {'skipComments': true}],
    'space-infix-ops': 'error',
    'array-bracket-spacing': 'error',
    'object-curly-spacing': ['error', 'always'],
    'space-before-function-paren': ['error', {
      named: 'never',
      anonymous: 'never',
      asyncArrow: 'always',
    }],
    'no-multiple-empty-lines': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'after-used',
      'argsIgnorePattern': '^_'
    }],
  },
  ignorePatterns: ['build', 'node_modules'],
  overrides: [{
    'files': ['*.test.*'],
    'rules': {
      '@typescript-eslint/explicit-function-return-type': ['off'],
    }
  }]
}
