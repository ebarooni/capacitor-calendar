// @ts-check

const eb = require("@ebarooni/eslint-config/ts");
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
  ...eb,
  {
    languageOptions: {
      parserOptions: {
        project: ["tsconfig.json"],
      },
    },
  },
  {
    ignores: [
      "**/android",
      "**/dist",
      "typedoc-output/**",
      "example-app/src/js/example.js",
      "example-app/vite.config.ts",
      "rollup.config.mjs",
      "swiftlint.config.js",
      "eslint.config.js",
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
);
