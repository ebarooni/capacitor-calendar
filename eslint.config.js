// @ts-check

const eb = require("@ebarooni/eslint-config/angular-recommended-type-checked");
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
  ...eb,
  {
    languageOptions: {
      parserOptions: {
        project: ["**/tsconfig*.json"],
      },
    },
  },
  {
    ignores: ["**/dist", "**/build", "**/ios", "**/android"],
  },
);
