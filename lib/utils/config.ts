import {
  RuleListener,
  RuleModule,
} from "@typescript-eslint/utils/dist/ts-eslint";

import { ConfigName } from "./config.type";

export const PLUGIN_NAME = "@hokla/bug-shield";

type ConfigRules = { [k: string]: false | "error" | "strict" | "warn" };

export interface Config {
  plugins: string[];
  rules: ConfigRules;
  extends?: string[];
  parserOptions?: unknown;
}

export function getConfigCustomRules(
  configName: ConfigName,
  allRules: {
    [ruleName: string]: RuleModule<string, [], RuleListener> & {
      configs: string[];
    };
  },
): ConfigRules {
  return Object.fromEntries(
    Object.keys(allRules)
      .filter((ruleName) => allRules[ruleName].configs.includes(configName))
      .map((ruleName) => {
        const ruleRecommendation = allRules[ruleName].meta.docs?.recommended;
        return [
          `${PLUGIN_NAME}/${ruleName}`,
          ruleRecommendation !== undefined ? ruleRecommendation : false,
        ];
      }),
  );
}
