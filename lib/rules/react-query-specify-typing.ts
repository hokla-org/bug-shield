import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

type MessageIds = "missing-use-query-types" | "missing-use-mutation-types";

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`
);

export const rule = createRule<Options, MessageIds>({
  name: "react-query-specify-typing",
  defaultOptions: [],
  create(context) {
    return {
      // Select a node from the AST
      ["CallExpression:matches([callee.name=useQuery], [callee.name=/useMutation*/])"](
        node: TSESTree.CallExpression
      ) {
        if (!node.typeParameters) {
          const messageId =
            (node.callee as TSESTree.Identifier).name === "useQuery"
              ? "missing-use-query-types"
              : "missing-use-mutation-types";
          context.report({
            messageId: messageId,
            node: node,
          });
        }
      },
    };
  },
  meta: {
    docs: {
      recommended: "warn",
      description:
        "Type parameters should always be specified when calling useQuery and useMutation from react-query",
    },
    messages: {
      "missing-use-query-types":
        "Type parameters should be specified when using useQuery hook",
      "missing-use-mutation-types":
        "Type parameters should be specified when using useMutation hook",
    },
    type: "problem",
    schema: [],
  },
});

export default rule;
