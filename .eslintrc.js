const commonRule = {
  'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

  'prettier/prettier': [
    'error',
    {
      singleQuote: true,
      trailingComma: 'es5',
      semi: false,
      tabWidth: 2,
    },
  ],
}

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: commonRule,
  overrides: [
    {
      files: [
        './mock/public/**/*.js',
      ],
      env: {
        browser: true
      },
    },
    {
      files: [
        './public/icon_clicked.js',
      ],
      env: {
        webextensions: true,
      },
    },
    {
      files: ["*.vue", "*.ts", "*.tsx"],
      extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint',
      ],
      rules: {
        ...commonRule,

        '@typescript-eslint/interface-name-prefix': 'off',
      },
      overrides: [
        {
          files: [
            '**/__tests__/*.{j,t}s?(x)',
            '**/tests/unit/**/*.spec.{j,t}s?(x)',
          ],
          env: {
            jest: true,
          },
          rules: {
            ...commonRule,

            // モッククラスを作る際に、処理が空のメソッドを作ることが多く
            // その際に毎回警告を消すのが面倒なので
            '@typescript-eslint/no-unused-vars': 'off',
          },
        },
      ]
    },
  ],
}
