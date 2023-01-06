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

const eslintrcPlugins = ["@hokla/custom-rules"];

//------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------

console.log(allRules);

// import all rules in lib/rules
/**
 * @type {Plugin}
 */
module.exports = {
  rules: allRules,
  configs: {
    recommended: {
      plugins: eslintrcPlugins,
      rules: {
        "@hokla/custom-rules/react-query-specify-typing": "error",
      },
    },
  },
};
