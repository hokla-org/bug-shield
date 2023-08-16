import { RuleListener, RuleModule } from "@typescript-eslint/utils/dist/ts-eslint";
import { Config, PLUGIN_NAME, getConfigCustomRules } from "../utils/config";

export const CONFIG_NAME = "test"

export const getConfig = (
  allRules: { [ruleName: string]: RuleModule<string, [], RuleListener> & { configs : string[]}} 
): { [configName: string]: Config} => {
  return {
    [CONFIG_NAME]: {
      plugins: [PLUGIN_NAME],
      rules: { ...getConfigCustomRules(CONFIG_NAME, allRules)}
    },
  }
}
