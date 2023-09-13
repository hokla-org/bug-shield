import {
  getConfig as getAllConfig,
  CONFIG_NAME as ALL_CONFIG_NAME,
} from "../../lib/configs/all.config";
import {
  getConfig as getTestConfig,
  CONFIG_NAME as TEST_CONFIG_NAME,
} from "../../lib/configs/test.config";
import { PLUGIN_NAME } from "../../lib/utils/config";
import { ALL_RULES_MOCK } from "./config.mock";

describe("getConfig", () => {
  describe("In all config", () => {
    it("should return all the rules", () => {
      // Build
      const expectedConfig = {
        [ALL_CONFIG_NAME]: {
          plugins: [PLUGIN_NAME],
          extends: ["plugin:@hokla/bug-shield/recommended"],
          rules: {
            [`${PLUGIN_NAME}/rule_A`]:
              ALL_RULES_MOCK["rule_A"].meta.docs?.recommended,
            [`${PLUGIN_NAME}/rule_B`]:
              ALL_RULES_MOCK["rule_B"].meta.docs?.recommended,
            [`${PLUGIN_NAME}/rule_C`]:
              ALL_RULES_MOCK["rule_C"].meta.docs?.recommended,
            [`${PLUGIN_NAME}/rule_D`]:
              ALL_RULES_MOCK["rule_D"].meta.docs?.recommended,
          },
        },
      };

      // Act
      const config = getAllConfig(ALL_RULES_MOCK);

      // Assert
      expect(config).toStrictEqual(expectedConfig);
    });
  });

  describe("In test config", () => {
    it("should return all the rules whose config contains the config", () => {
      // Build
      const expectedConfig = {
        [TEST_CONFIG_NAME]: {
          plugins: [PLUGIN_NAME],
          rules: {
            [`${PLUGIN_NAME}/rule_B`]:
              ALL_RULES_MOCK["rule_B"].meta.docs?.recommended,
            [`${PLUGIN_NAME}/rule_D`]:
              ALL_RULES_MOCK["rule_D"].meta.docs?.recommended,
          },
        },
      };

      // Act
      const config = getTestConfig(ALL_RULES_MOCK);

      // Assert
      expect(config).toStrictEqual(expectedConfig);
    });
  });
});
