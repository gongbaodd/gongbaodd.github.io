module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "jam3"],
  rules: {
    quotes: ["error", "double"],
    "no-bitwise": ["off"],
    "import/no-unresolved": ["off"],
    "import/extensions": ["off"],
    "import/prefer-default-export": ["off"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "react/jsx-filename-extension": ["error", { extensions: [".tsx", ".jsx"] }],
    "react/prop-types": ["off"],
    "import/no-extraneous-dependencies": ["off"],
    "react/no-danger": ["off"],
    "jam3/no-sanitizer-with-danger": [
      "error",
      {
        wrapperName: ["sanitize"],
      },
    ],
  },
  overrides: [
    {
      files: [
        "gatsby-*.js",
        "config/**/*.js",
        "cypress/**/*.ts",
        "cypress/**/*.js",
      ],
      rules: {
        "@typescript-eslint/camelcase": ["off"],
        "@typescript-eslint/no-var-requires": ["off"],
        "global-require": ["off"],
        "no-undef": ["off"],
      },
    },
    {
      files: ["node_modules.d.ts"],
      rules: {
        "no-underscore-dangle": ["off"],
      },
    },
  ],
};
