import {
  RuleListener,
  RuleModule,
} from "@typescript-eslint/utils/dist/ts-eslint";

import { Config, getConfigCustomRules, PLUGIN_NAME } from "../utils/config";

export const CONFIG_NAME = "recommended";

export const getConfig = (allRules: {
  [ruleName: string]: RuleModule<string, [], RuleListener> & {
    configs: string[];
  };
}): { [configName: string]: Config } => {
  return {
    [CONFIG_NAME]: {
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
        "prettier",
      ],
      plugins: [PLUGIN_NAME],
      rules: {
        ...getConfigCustomRules(CONFIG_NAME, allRules),
        "array-callback-return": "error",
      },
    },
  };
};
