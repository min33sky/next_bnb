module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    JSX: true, // ? JSX.Element 경고 제거
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        tabWidth: 2,
        printWidth: 100,
        endOfLine: 'auto',
      },
    ],
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] }, // jsx 사용 가능한 확장자 설정
    ],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never', json: 'never' },
    ], // 임포트 시 확장자명은 사용하지 않는다.
    'no-case-declarations': 'off',
    'no-use-before-define': 'off',
    'global-require': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/no-array-index-key': 'off',
    // ? _로 시작하는 변수는 사용하지 않아도 경고 표시가 뜨지 않는다.
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // 리액트 Hooks 관련
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        paths: ['./'], // ? 절대 경로를 사용하기 위한 설정
      },
    },
  },
};
