import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

type MessageIds = "no-async-in-foreach";

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`
);

export const rule = createRule<Options, MessageIds>({
  name: "no-async-in-foreach",
  defaultOptions: [],
  create(context) {
    return {
      // Select a node from the AST
      ["CallExpression[callee.property.name='forEach']:has(ArrowFunctionExpression[async='true'])"](
        node: TSESTree.CallExpression
      ) {
        context.report({
          messageId: "no-async-in-foreach",
          node: node,
        });
      },
    };
  },
  meta: {
    docs: {
      recommended: "error",
      description:
        "Type parameters should always be specified when calling useQuery and useMutation from react-query",
    },
    messages: {
      "no-async-in-foreach":
        "Do not use async functions in foreach. Use Promise.all() instead.",
    },
    type: "problem",
    schema: [],
  },
});

export default rule;
