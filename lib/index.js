// @ts-check

/**
 * @typedef {import('eslint').ESLint} Plugin
 */

"use strict";

//------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------

const requireIndex = require("requireindex");
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
module.exports.rules = allRules;
module.exports.configs = configs;
