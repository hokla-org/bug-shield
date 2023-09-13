import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from "@typescript-eslint/utils";

type MessageIds = "missing-zone-in-datetime";

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`,
);

// Trying to follow example from this blog :
// https://ryankubik.com/blog/eslint-internal-state#Building-More-Complex-ESLint-Rules
// https://astexplorer.net/#/gist/1ff99fca3f85c2e7676ac041a88d7b53/179cf88e3a77c133741d9f96f0dc982b9f11ce4d

const rule = createRule<Options, MessageIds>({
  name: "luxon-force-zone-in-datetime",
  defaultOptions: [],
  create(context) {
    return {
      // Select a node from the AST
      ["CallExpression[callee.property.name='fromISO']"](
        node: TSESTree.CallExpression,
      ) {
        const objectExpressionArgument = node.arguments.find(
          (argument) => argument.type === AST_NODE_TYPES.ObjectExpression,
        );

        if (objectExpressionArgument === undefined) {
          return context.report({
            messageId: "missing-zone-in-datetime",
            node: node,
          });
        }

        const hasZoneProperty =
          (
            objectExpressionArgument as unknown as TSESTree.ObjectExpression
          ).properties.find(
            (property) =>
              ((property as TSESTree.Property).key as TSESTree.Identifier)
                .name === "zone",
          ) !== undefined;

        if (!hasZoneProperty) {
          return context.report({
            messageId: "missing-zone-in-datetime",
            node: node,
          });
        }
      },
    };
  },
  meta: {
    docs: {
      recommended: "warn",
      description: "force timezone option in DateTime object instantiation",
    },
    messages: {
      "missing-zone-in-datetime":
        "Missing timezone in DateTime instantiation.\nThe timezone should be set to avoid any dependency with the timezone of the server or the end-user.",
    },
    type: "problem",
    schema: [],
  },
});

export default { ...rule, configs: ["recommended"] };
