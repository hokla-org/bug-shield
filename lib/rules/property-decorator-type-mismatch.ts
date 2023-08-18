import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from "@typescript-eslint/utils";

type MessageIds = "property-decorator-type-mismatch";

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`
);

// Type: RuleModule<"uppercase", ...>
const rule = createRule<Options, MessageIds>({
  name: "property-decorator-type-mismatch",
  defaultOptions: [],
  create(context) {
    function getPropertyDefinitionFromDecorator(
      node: TSESTree.Decorator
    ): TSESTree.PropertyDefinition | null {
      const parent = node.parent;

      if (!isPropertyDefinition(parent)) {
        return null;
      }
      return parent;
    }

    function getTypeDecoratorType(node: TSESTree.Decorator): string | null {
      if (node.expression.type !== AST_NODE_TYPES.CallExpression) return null;

      const callNode = node.expression;
      const firstArgument = callNode.arguments[0];

      if (firstArgument?.type !== AST_NODE_TYPES.ArrowFunctionExpression)
        return null;

      if (firstArgument.body.type !== AST_NODE_TYPES.Identifier) return null;

      const body = firstArgument.body as TSESTree.Identifier;

      return body.name;
    }

    function isPropertyDefinition(
      node?: TSESTree.Node
    ): node is TSESTree.PropertyDefinition {
      return node?.type === AST_NODE_TYPES.PropertyDefinition;
    }

    return {
      ['PropertyDefinition > Decorator[expression.callee.name="Type"]'](
        node: TSESTree.Decorator
      ) {
        const propertyDefinition = getPropertyDefinitionFromDecorator(node);

        if (propertyDefinition === null) return;

        const propertyTypeName = context
          .getSourceCode()
          .getText(propertyDefinition?.typeAnnotation?.typeAnnotation);

        const decoratorTypeName = getTypeDecoratorType(node);
        if (decoratorTypeName !== propertyTypeName) {
          context.report({
            messageId: "property-decorator-type-mismatch",
            node: node,
          });
        }
      },
    };
  },
  meta: {
    docs: {
      recommended: "error",
      description: "Parameter of Type Decorator should match the property type",
    },
    messages: {
      "property-decorator-type-mismatch":
        "Type Decorator's parameter does not match the property type",
    },
    type: "problem",
    schema: [],
  },
});

export default {...rule, configs: ["recommended"]}
