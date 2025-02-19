// @ts-check

import config from "@ebarooni/eslint-config";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/android", "**/ios", "**/dist", "typedoc-output/**"],
  },
  ...config.javascript,
  ...config.typescript,
  ...config.angular,
  config.json,
  config.markdown,
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/no-deprecated": "off",
    },
  },
  {
    files: ["src/web.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: ["tsconfig.eslint.json"],
      },
    },
  },
);
