import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

type MessageIds = "missing-repository-generic-method-type";

type Options = [];

const getCalleeObjectName = (
  callee: TSESTree.LeftHandSideExpression
): string => {
  // I can't get the typing to work here.
  // LeftHandSideExpression is a union of types where only a few cases have an "object" property (MemberExpression)
  // @ts-ignore
  return callee?.object?.name ?? callee?.object?.property?.name ?? "";
};

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`
);

export const rule = createRule<Options, MessageIds>({
  name: "typeorm-enforce-repository-generic-method-typing",
  defaultOptions: [],
  create(context) {
    return {
      "CallExpression[callee.property.name='save'], CallExpression[callee.property.name='softRemove'], CallExpression[callee.property.name='recover']"(
        callExpression: TSESTree.CallExpression
      ) {
        const callee = callExpression.callee;
        const calleeObjectName = getCalleeObjectName(callee);

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

export default rule;
