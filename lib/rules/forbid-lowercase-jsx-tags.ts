import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

import { ConfigName } from "../utils/config.type";

type MessageIds = "forbid-lowercase-jsx-tags";

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`,
);

// Trying to follow example from this blog :
// https://ryankubik.com/blog/eslint-internal-state#Building-More-Complex-ESLint-Rules
// https://astexplorer.net/#/gist/1ff99fca3f85c2e7676ac041a88d7b53/179cf88e3a77c133741d9f96f0dc982b9f11ce4d

const rule = createRule<Options, MessageIds>({
  name: "forbid-lowercase-jsx-tags",
  defaultOptions: [],
  create(context) {
    return {
      ["JSXOpeningElement > JSXIdentifier"](node: TSESTree.JSXIdentifier) {
        const lowercaseRegex = /[a-z]/u;

        if (lowercaseRegex.test(node.name.charAt(0))) {
          return context.report({
            messageId: "forbid-lowercase-jsx-tags",
            node: node,
          });
        }
      },
    };
  },
  meta: {
    docs: {
      recommended: "error",
      description:
        "To be used in a React Native project: this rule forbids JSX tags that don't begin with a capital letter",
    },
    messages: {
      "forbid-lowercase-jsx-tags":
        "JSX tags must begin with a capital letter; did you try to use an HTML tag in a React Native project?",
    },
    type: "problem",
    schema: [],
  },
});

const ruleConfigs: ConfigName[] = ["react-native"];

export default { ...rule, configs: ruleConfigs };
