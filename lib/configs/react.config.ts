import {
  RuleListener,
  RuleModule,
} from "@typescript-eslint/utils/dist/ts-eslint";
import { Config, PLUGIN_NAME, getConfigCustomRules } from "../utils/config";

export const CONFIG_NAME = "react";

export const getConfig = (allRules: {
  [ruleName: string]: RuleModule<string, [], RuleListener> & {
    configs: string[];
  };
}): { [configName: string]: Config } => {
  return {
    [CONFIG_NAME]: {
      extends: [
        "plugin:@hokla/bug-shield/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
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
