import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from "@typescript-eslint/utils";

import { ConfigName } from "../utils/config.type";

type MessageIds = "missing-repository-generic-method-type";

type Options = [];

const isMemberExpression = (
  expr: TSESTree.Expression | TSESTree.PrivateIdentifier,
): expr is TSESTree.MemberExpression =>
  expr.type === AST_NODE_TYPES.MemberExpression;
const isIdentifier = (
  expr: TSESTree.Expression | TSESTree.PrivateIdentifier,
): expr is TSESTree.Identifier => expr.type === AST_NODE_TYPES.Identifier;

const getCalleeObjectName = (
  callee: TSESTree.Expression | TSESTree.PrivateIdentifier,
): string => {
  if (isIdentifier(callee)) {
    return callee.name;
  } else if (isMemberExpression(callee)) {
    return getCalleeObjectName(callee.property);
  }

  return "";
};

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`,
);

const rule = createRule<Options, MessageIds>({
  name: "typeorm-enforce-repository-generic-method-typing",
  defaultOptions: [],
  create(context) {
    return {
      "CallExpression[callee.property.name='save'], CallExpression[callee.property.name='softRemove'], CallExpression[callee.property.name='recover']"(
        callExpression: TSESTree.CallExpression,
      ) {
        const callee = callExpression.callee;

        if (!isMemberExpression(callee)) return;
        const calleeObjectName = getCalleeObjectName(callee.object);

        // Refine selection programmatically
        if (
          callee !== undefined &&
          (calleeObjectName.endsWith("repository") ||
            calleeObjectName.endsWith("Repository"))
        ) {
          // Type must be specified
          const callTypeParams = callExpression.typeParameters?.params;
          if (!callTypeParams || callTypeParams.length === 0) {
            context.report({
              messageId: "missing-repository-generic-method-type",
              node: callExpression,
            });
          }
        }
      },
    };
  },
  meta: {
    docs: {
      recommended: "warn",
      description:
        "enforce calls to repository generic methods (save, softRemove and recover) without type specification",
    },
    messages: {
      "missing-repository-generic-method-type":
        "Type parameters should be specified when using typeorm repository generic methods (save, softRemove, recover). It allows to detect inconsistencies between the input and the database entity table",
    },
    type: "suggestion",
    schema: [],
  },
});

const ruleConfigs: ConfigName[] = ["typeorm"];

export default { ...rule, configs: ruleConfigs };
