import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from "@typescript-eslint/utils";

type MessageIds = "mutation-decorator-return-type-mismatch";

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`,
);

// Type: RuleModule<"uppercase", ...>
const rule = createRule<Options, MessageIds>({
  name: "mutation-decorator-return-type-mismatch",
  defaultOptions: [],
  create(context) {
    function isMethodDefinition(
      node?: TSESTree.Node,
    ): node is TSESTree.MethodDefinition {
      return node?.type === AST_NODE_TYPES.MethodDefinition;
    }

    function getMethodDefinitionFromDecorator(
      node: TSESTree.Decorator,
    ): TSESTree.MethodDefinition | undefined {
      const parent = node.parent;

      if (!isMethodDefinition(parent)) {
        return undefined;
      }
      return parent;
    }

    function getMethodReturnType(
      node: TSESTree.MethodDefinition,
    ): TSESTree.TSTypeAnnotation["typeAnnotation"] | undefined {
      return node?.value?.returnType?.typeAnnotation;
    }

    function getMutationDecoratorReturnType(
      node: TSESTree.Decorator,
    ): TSESTree.BlockStatement | TSESTree.Expression | undefined {
      if (node.expression.type !== AST_NODE_TYPES.CallExpression)
        return undefined;

      const callNode = node.expression;
      const firstArgument = callNode.arguments[0];

      if (firstArgument?.type !== AST_NODE_TYPES.ArrowFunctionExpression)
        return undefined;

      return firstArgument.body;
    }

    return {
      ['MethodDefinition > Decorator[expression.callee.name="Mutation"]'](
        node: TSESTree.Decorator,
      ) {
        const methodDefinition = getMethodDefinitionFromDecorator(node);
        if (methodDefinition === undefined) return;

        const methodReturnType = getMethodReturnType(methodDefinition);
        const methodReturnTypeText = context
          .getSourceCode()
          .getText(methodReturnType);

        const mutationDecoratorReturnType =
          getMutationDecoratorReturnType(node);
        const mutationDecoratorReturnTypeText = context
          .getSourceCode()
          .getText(mutationDecoratorReturnType);

        if (methodReturnTypeText !== mutationDecoratorReturnTypeText) {
          context.report({
            messageId: "mutation-decorator-return-type-mismatch",
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
        "Parameter of Mutation Decorator should match the method's return type",
    },
    messages: {
      "mutation-decorator-return-type-mismatch":
        "Return type in Mutation Decorator's parameter does not match the mutation's return type",
    },
    type: "problem",
    schema: [],
  },
});

export default { ...rule, configs: ["recommended"] };
