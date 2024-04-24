import { getConfigCustomRules, PLUGIN_NAME } from "../utils/config";
import { ConfigName, CustomConfig } from "../utils/config.type";

export const CONFIG_NAME: ConfigName = "redux";

export const getConfig: CustomConfig<typeof CONFIG_NAME> = (allRules) => {
  return {
    [CONFIG_NAME]: {
      plugins: [PLUGIN_NAME],
      rules: {
        ...getConfigCustomRules(CONFIG_NAME, allRules),
      },
    },
  };
};
