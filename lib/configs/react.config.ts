import {
  RuleListener,
  RuleModule,
} from "@typescript-eslint/utils/dist/ts-eslint";

import { Config, getConfigCustomRules, PLUGIN_NAME } from "../utils/config";

export const CONFIG_NAME = "react";

export const getConfig = (allRules: {
  [ruleName: string]: RuleModule<string, [], RuleListener> & {
    configs: string[];
  };
}): { [configName: string]: Config } => {
  return {
    [CONFIG_NAME]: {
      extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      plugins: [PLUGIN_NAME],
      rules: {
        ...getConfigCustomRules(CONFIG_NAME, allRules),
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  };
};
