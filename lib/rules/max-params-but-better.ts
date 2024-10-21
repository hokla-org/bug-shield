/* eslint-disable @typescript-eslint/no-explicit-any */
import { ESLintUtils } from "@typescript-eslint/utils";

import { ConfigName } from "../utils/config.type";

type MessageIds = "max-params-but-better";

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`,
);

const rule = createRule<Options, MessageIds>({
  name: "max-params-but-better",
  defaultOptions: [],
  create(context: any) {
    const option = context.options[0];
    let numParams = 1;

    if (
      typeof option === "object" &&
      (Object.prototype.hasOwnProperty.call(option, "maximum") ||
        Object.prototype.hasOwnProperty.call(option, "max"))
    ) {
      numParams = option.maximum || option.max;
    }
    if (typeof option === "number") {
      numParams = option;
    }

    /**
     * Checks if the function is a callback for an Array method like `map`, `reduce`, `sort`, or `filter`.
     * @param {ASTNode} node The function node to check.
     * @returns {boolean} True if the function is a callback for Array methods, false otherwise.
     */

    function isArrayMethodCallback(node: any) {
      const parent = node.parent;

      // Check if the parent is a CallExpression (e.g., map, reduce, filter)
      if (parent && parent.type === "CallExpression") {
        const callee = parent.callee;

        // Ensure the callee is a member expression like `array.map`, `array.reduce`, etc.
        if (callee && callee.type === "MemberExpression") {
          const methodName = callee.property.name;

          // Check if it's one of the Array methods we want to ignore
          const arrayMethods = [
            "map",
            "reduce",
            "filter",
            "sort",
            "forEach",
            "every",
            "some",
            "find",
            "findIndex",
            "findLast",
            "findLastIndex",
            "flatMap",
            "reduceRight",
            "toSorted",
          ];
          return arrayMethods.includes(methodName);
        }
      }

      return false;
    }

    /**
     * Checks a function to see if it has too many parameters.
     * @param {ASTNode} node The node to check.
     * @returns {void}
     * @private
     */
    function checkFunction(node: any) {
      // Skip the check if the function is a callback for an array method
      if (isArrayMethodCallback(node)) {
        return;
      }

      if (node.params.length > numParams) {
        let loc;

        if (
          node.type === "FunctionDeclaration" ||
          node.type === "FunctionExpression"
        ) {
          // Highlight only the function name
          loc = node.id ? node.id.loc : node.loc;
        } else if (node.type === "ArrowFunctionExpression") {
          // Highlight the arrow (=>) for arrow functions
          const arrowToken = context
            .getSourceCode()
            .getTokenBefore(node.body, (token: any) => token.value === "=>");
          loc = arrowToken ? arrowToken.loc : node.loc;
        }

        context.report({
          node,
          messageId: "max-params-but-better",
          loc, // Use the calculated location to highlight only the function name or arrow
          data: {
            count: node.params.length,
            max: numParams,
          },
        });
      }
    }

    return {
      FunctionDeclaration: checkFunction,
      ArrowFunctionExpression: checkFunction,
      FunctionExpression: checkFunction,
    };
  },
  meta: {
    type: "problem",

    docs: {
      description:
        "Enforce a maximum number of parameters in function definitions",
      recommended: "warn",
    },
    schema: [
      {
        oneOf: [
          {
            type: "integer",
            minimum: 0,
          },
          {
            type: "object",
            properties: {
              maximum: {
                type: "integer",
                minimum: 0,
              },
              max: {
                type: "integer",
                minimum: 0,
              },
            },
            additionalProperties: false,
          },
        ],
      },
    ],
    messages: {
      "max-params-but-better":
        "Function has too many parameters ({{count}}). Maximum allowed is {{max}}.",
    },
  },
});

const configs: ConfigName[] = ["all"];

export default { ...rule, configs };
