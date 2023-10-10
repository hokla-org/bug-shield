import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

type MessageIds = "no-useless-expression-statement";

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`,
);

const rule = createRule<Options, MessageIds>({
  name: "no-useless-expression-statement",
  defaultOptions: [],
  create(context) {
    return {
      ["ExpressionStatement > Identifier"](node: TSESTree.Identifier) {
        return context.report({
          messageId: "no-useless-expression-statement",
          node: node,
        });
      },
    };
  },
  meta: {
    docs: {
      recommended: "error",
      description: "A statement that only calls a variable does nothing. Usually, the developer meant to call a function but forgot the parentheses.",
    },
    messages: {
      "no-useless-expression-statement": "This statement does nothing. Did you mean to call a function instead?",
    },
    type: "problem",
    schema: [],
  },
});

export default { ...rule, configs: ["recommended"] };
