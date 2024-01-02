import {
  RuleListener,
  RuleModule,
} from "@typescript-eslint/utils/dist/ts-eslint";

import { Config, PLUGIN_NAME } from "../utils/config";

export const CONFIG_NAME = "all";

export const getConfig = (allRules: {
  [ruleName: string]: RuleModule<string, [], RuleListener> & {
    configs: string[];
  };
}): { [configName: string]: Config } => {
  return {
    [CONFIG_NAME]: {
      plugins: [PLUGIN_NAME],
      extends: ["plugin:@hokla/bug-shield/recommended"],
      rules: Object.fromEntries(
        Object.keys(allRules).map((ruleName) => {
          const ruleRecommendation = allRules[ruleName].meta.docs?.recommended;
          return [
            `${PLUGIN_NAME}/${ruleName}`,
            ruleRecommendation !== undefined ? ruleRecommendation : false,
          ];
        }),
      ),
    },
  };
};
