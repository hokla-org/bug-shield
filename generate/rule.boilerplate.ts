import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

import { ConfigName } from "../lib/utils/config.type";

type MessageIds = "RULE_NAME_PLACEHOLDER";

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`,
);

const rule = createRule<Options, MessageIds>({
  name: "RULE_NAME_PLACEHOLDER",
  defaultOptions: [],
  create(context) {
    return {
      // Select a node from the AST
      ["TODO"](node: TSESTree.JSXIdentifier) {
        return context.report({
          messageId: "RULE_NAME_PLACEHOLDER",
          node: node,
        });
      },
    };
  },
  meta: {
    docs: {
      recommended: "error",
      description: "TODO",
    },
    messages: {
      "RULE_NAME_PLACEHOLDER": "TODO",
    },
    type: "problem",
    schema: [],
  },
});

const configs: ConfigName[] = ["TODO"];

export default { ...rule, configs };
