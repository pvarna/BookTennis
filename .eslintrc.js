module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-duplicate-imports": "error",
    "arrow-body-style": ["error", "always"],
    "class-methods-use-this": "error",
    curly: "error",
    "default-case": "error",
    "default-case-last": "error",
    "multiline-comment-style": ["error", "starred-block"],
    "no-console": "error",
    "no-else-return": "error",
    "no-lonely-if": "error",
    "no-invalid-this": "error",
    "no-magic-numbers": "error",
    "no-useless-return": "error",
    "prefer-const": "error",
    "prefer-destructuring": "error",
    "require-await": "error",
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: false,
      },
    ],
  },
};
