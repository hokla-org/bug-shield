import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

import { ConfigName } from "../utils/config.type";

type MessageIds = "react-hook-form-specify-typing";

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`,
);

const rule = createRule<Options, MessageIds>({
  name: "react-hook-form-specify-typing",
  defaultOptions: [],
  create(context) {
    return {
      // Select a node from the AST
      ["CallExpression:matches([callee.name=useForm], [callee.name=/useFormContext*/])"](
        node: TSESTree.CallExpression,
      ) {
        if (!node.typeParameters) {
          const messageId = "react-hook-form-specify-typing";
          return context.report({
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
        "Type parameters should always be specified when calling useForm and useFormContext from react-hook-form",
    },
    messages: {
      "react-hook-form-specify-typing":
        "Type parameters should be specified when using useForm and useFormContext hook",
    },
    type: "problem",
    schema: [],
  },
});

const configs: ConfigName[] = ["react"];

export default { ...rule, configs };
