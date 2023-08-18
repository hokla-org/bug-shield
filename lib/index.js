// @ts-check

/**
 * @typedef {import('eslint').ESLint} Plugin
 */

"use strict";

//------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-var-requires
const requireIndex = require("requireindex");
// eslint-disable-next-line no-undef
const rulesExports = requireIndex(__dirname + "/rules");
const allRules = {};
Object.keys(rulesExports).forEach(
  (ruleName) => {
    allRules[ruleName] = rulesExports[ruleName].default
  }
);

//------------------------------------------------------------------
// Configurations
//------------------------------------------------------------------

// eslint-disable-next-line no-undef
const configExports = requireIndex(__dirname + "/configs");
const configs = {};

Object.keys(configExports).forEach(
  (configName) => {
    Object.assign(configs, configExports[configName].getConfig(allRules));
  }
);

//------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------

// import all rules in lib/rules
/**
 * @type {Plugin}
 */
// eslint-disable-next-line no-undef
module.exports.rules = allRules;
// eslint-disable-next-line no-undef
module.exports.configs = configs;
