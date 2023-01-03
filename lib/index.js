'use strict';

//------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------

const requireIndex = require('requireindex');
const obj = requireIndex(__dirname + '/rules');
const allRules = {};
Object.keys(obj).forEach((ruleName) => (allRules[ruleName] = obj[ruleName].default));

const eslintrcPlugins = [
  '@hokla/custom-rules',
];

//------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------

// import all rules in lib/rules
module.exports = { 
  rules: allRules, 
  configs: {
    all: {
      plugins: eslintrcPlugins,
      rules: allRules,
    },
} };
