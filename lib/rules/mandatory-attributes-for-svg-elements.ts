import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from "@typescript-eslint/utils";

type MessageIds = "mandatory-attributes-for-svg-elements";

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`,
);

const EXPECTED_ATTRIBUTE_NAMES = ["height", "width", "viewBox"];

const rule = createRule<Options, MessageIds>({
  name: "mandatory-attributes-for-svg-elements",
  defaultOptions: [],
  create(context) {
    return {
      // Select a node from the AST
      ["JSXOpeningElement[name.name=/[Ss]vg/]"](
        node: TSESTree.JSXOpeningElement,
      ) {
        const jsxAttributes = node.attributes.filter(
          (attribute) => attribute.type === AST_NODE_TYPES.JSXAttribute,
        ) as TSESTree.JSXAttribute[];

        const hasSpreadAttribute =
          jsxAttributes.length != node.attributes.length;

        if (hasSpreadAttribute) {
          return;
        }

        const attributeNames = jsxAttributes.map(({ name }) => name.name);

        const areExpectedAttributesIncluded = EXPECTED_ATTRIBUTE_NAMES.every(
          (expectedAttributeName) =>
            attributeNames.includes(expectedAttributeName),
        );

        if (!areExpectedAttributesIncluded) {
          return context.report({
            messageId: "mandatory-attributes-for-svg-elements",
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
        "Enforces the declaration of properties width, height and viewBox for svg elements to prevent non-desired display",
    },
    messages: {
      "mandatory-attributes-for-svg-elements":
        "Svg element is missing one of the following properties: width, height, viewBox",
    },
    type: "problem",
    schema: [],
  },
});

export default { ...rule, configs: ["recommended"] };
