/* eslint-disable */
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import mochaPlugin from "eslint-plugin-mocha";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/node_modules", "**/dist", "**/coverage", "**/typings"],
  },
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "commonjs",

      parserOptions: {
        project: "./tsconfig.lint.json",
      },
    },
  },
  {
    ...mochaPlugin.configs.recommended,
    files: ["test/**/*.ts"],

    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },

    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-unused-expressions": "off",
      "no-magic-numbers": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
];
