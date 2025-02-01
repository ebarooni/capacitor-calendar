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
    languageOptions: {
      parserOptions: {
        project: ["tsconfig.eslint.json"],
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
);
