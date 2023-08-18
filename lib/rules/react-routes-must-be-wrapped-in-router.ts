import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import {
  getFunctionalComponentName,
  isJSXElement,
  getJSXElementTagName,
} from "../utils/common";

type MessageIds =
  | "ambiguous-naming-for-component-returning-routes"
  | "no-routing-context-provided-to-routes-component";

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`
);

const rule = createRule<Options, MessageIds>({
  name: "react-routes-must-be-wrapped-in-router",
  defaultOptions: [],
  create(context) {
    const sendReportWhenFunctionalComponentDoesNotEndWithRoutes = (
      node: TSESTree.VariableDeclarator | TSESTree.FunctionDeclaration
    ) => {
      const functionalComponentName = getFunctionalComponentName(node);
      if (!functionalComponentName.endsWith("Routes")) {
        context.report({
          messageId: "ambiguous-naming-for-component-returning-routes",
          node: node,
        });
      }
    };
    return {
      ["VariableDeclarator:has(ReturnStatement > JSXElement > JSXOpeningElement[name.name=/.*Routes/])"](
        variableDeclarator: TSESTree.VariableDeclarator
      ) {
        sendReportWhenFunctionalComponentDoesNotEndWithRoutes(
          variableDeclarator
        );
      },
      ["FunctionDeclaration:has(ReturnStatement > JSXElement > JSXOpeningElement[name.name=/.*Routes/])"](
        functionDeclaration: TSESTree.FunctionDeclaration
      ) {
        sendReportWhenFunctionalComponentDoesNotEndWithRoutes(
          functionDeclaration
        );
      },
      ["JSXElement JSXElement JSXOpeningElement[name.name=/.*Routes/]"](
        routesNode: TSESTree.JSXOpeningElement
      ) {
        const DEPTH_SEARCH_LIMIT = 30;

        let currentSearchDepth = 0;
        let currentParentNode: TSESTree.Node | undefined = routesNode;

        while (currentSearchDepth < DEPTH_SEARCH_LIMIT) {
          currentSearchDepth += 1;
          currentParentNode = currentParentNode?.parent;

          if (!isJSXElement(currentParentNode)) break;

          const currentParentNodeName = getJSXElementTagName(currentParentNode);

          if (currentParentNodeName.endsWith("Router")) return; // Early return, no error
        }

        // If we got out of the loop without early return, it means error
        context.report({
          messageId: "no-routing-context-provided-to-routes-component",
          node: routesNode,
        });
      },
    };
  },
  meta: {
    docs: {
      recommended: "error",
      description:
        "enforce encapsulation of <...Routes> in <...Router> provider and explicit naming of components returning <...Routes> element",
    },
    messages: {
      "ambiguous-naming-for-component-returning-routes":
        "A functional component returning a ...Routes element should explicit its type by being named ...Routes.\nIf you intend to return the main routing component, <...Routes> should be encapsulated inside a <...Router> component to provide a routing navigation context.",
      "no-routing-context-provided-to-routes-component":
        "A <...Routes> should be encapsulated inside a <...Router> component to provide a routing navigation context.",
    },
    type: "problem",
    schema: [],
  },
});

export default {...rule, configs: []}
