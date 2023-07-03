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
Object.keys(obj).forEach(
  (ruleName) => (allRules[ruleName] = obj[ruleName].default)
);

const PLUGIN_NAME = "@hokla/custom-rules";

//------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------

// import all rules in lib/rules
/**
 * @type {Plugin}
 */
module.exports = {
  rules: allRules,
  configs: {
    all: {
      rules: allRules.fo,
    },
    recommended: {
      plugins: [PLUGIN_NAME],
      rules: {
        "@hokla/custom-rules/react-query-specify-typing": "error",
        "@hokla/custom-rules/redux-saga-no-sequential-actions": "warn",
        "@hokla/custom-rules/no-value-export-in-declaration-file": "error"
      },
    },
    "react-native": {
      plugins: [PLUGIN_NAME],
      rules: {
        "@hokla/custom-rules/react-query-specify-typing": "error",
        "@hokla/custom-rules/redux-saga-no-sequential-actions": "warn",
      },
    },
  },
};
