import { PLUGIN_NAME } from "../utils/config";
import { ConfigName, CustomConfig } from "../utils/config.type";

export const CONFIG_NAME: ConfigName = "all";

export const getConfig: CustomConfig<typeof CONFIG_NAME> = (allRules) => {
  return {
    [CONFIG_NAME]: {
      plugins: [PLUGIN_NAME],
      extends: ["plugin:@hokla/bug-shield/recommended"],
      rules: Object.fromEntries(
        Object.keys(allRules).map((ruleName) => {
          const ruleRecommendation = allRules[ruleName].meta.docs?.recommended;
          return [
            `${PLUGIN_NAME}/${ruleName}`,
            ruleRecommendation !== undefined ? ruleRecommendation : "error",
          ];
        }),
      ),
    },
  };
};
