import { defineConfig } from "eslint/config";

import { baseConfig } from "@rnbase/eslint-config/base";
import { reactConfig } from "@rnbase/eslint-config/react";

export default defineConfig(baseConfig, reactConfig);
