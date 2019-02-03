module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "@willsoto/eslint-config-base",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  env: {
    node: true,
    jest: true
  }
};
