import { defineConfig } from "eslint/config";

import { baseConfig } from "@rnbase/eslint-config/base";
import { nextjsConfig } from "@rnbase/eslint-config/nextjs";
import { reactConfig } from "@rnbase/eslint-config/react";

export default defineConfig(
  {
    ignores: [".next/**"],
  },
  baseConfig,
  reactConfig,
  nextjsConfig,
);
