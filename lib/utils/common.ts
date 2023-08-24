import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";

export const isIdentifier = (
  expr:
    | TSESTree.Expression
    | TSESTree.PrivateIdentifier
    | TSESTree.JSXIdentifier,
): expr is TSESTree.Identifier => expr.type === AST_NODE_TYPES.Identifier;

export const isJSXElement = (
  expr:
    | TSESTree.Expression
    | TSESTree.PrivateIdentifier
    | TSESTree.Node
    | undefined,
): expr is TSESTree.JSXElement => expr?.type === AST_NODE_TYPES.JSXElement;

export const isFunctionDeclarationWithoutName = (
  expr: TSESTree.FunctionDeclaration | TSESTree.VariableDeclarator,
): expr is TSESTree.FunctionDeclarationWithOptionalName =>
  expr.type === AST_NODE_TYPES.FunctionDeclaration && expr.id === null;

export const getFunctionalComponentName = (
  functionNode: TSESTree.VariableDeclarator | TSESTree.FunctionDeclaration,
): string => {
  if (isFunctionDeclarationWithoutName(functionNode)) {
    return "";
  }
  if (isIdentifier(functionNode.id)) {
    return functionNode.id.name;
  }
  return "";
};

export const getJSXElementTagName = (
  JSXElement: TSESTree.JSXElement,
): string => {
  const tagNameExpr = JSXElement.openingElement.name;
  if (tagNameExpr.type === AST_NODE_TYPES.JSXNamespacedName) {
    return tagNameExpr.name.name;
  }
  if (tagNameExpr.type === AST_NODE_TYPES.JSXIdentifier) {
    return tagNameExpr.name;
  }
  return "";
};
