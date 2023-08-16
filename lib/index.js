// @ts-check

/**
 * @typedef {import('eslint').ESLint} Plugin
 */

"use strict";

//------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------

const requireIndex = require("requireindex");
const obj = requireIndex(__dirname + "/rules");
const allRules = {};
const allRulesConfigs = {};
Object.keys(obj).forEach(
  (ruleName) => {
    allRules[ruleName] = obj[ruleName].rule;
    allRulesConfigs[ruleName] = obj[ruleName].ruleConfigs;
  }
);

const PLUGIN_NAME = "@hokla/custom-rules";

//------------------------------------------------------------------
// Configurations
//------------------------------------------------------------------

const configFilters = {
  all: () => true,
  test: (ruleName) => allRulesConfigs[ruleName].includes("test"),
};

//------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------

// import all rules in lib/rules
/**
 * @type {Plugin}
 */
module.exports.rules = allRules;

module.exports.configs = Object.keys(configFilters).reduce(
  (configs, configName) => {
    return Object.assign(configs, {
      [configName]: {
        plugins: [PLUGIN_NAME],
        rules: Object.fromEntries(
          Object.keys(allRules)
            .filter((ruleName) => configFilters[configName](ruleName))
            .map((ruleName) => [
              `${PLUGIN_NAME}/${ruleName}`,
              allRules[ruleName].meta.docs.recommended,
            ])
        ),
      },
    });
  },
  {}
);
