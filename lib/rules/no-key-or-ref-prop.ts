import {
  ESLintUtils,
  TSESTree,
} from '@typescript-eslint/utils';

type MessageIds = 'no-key-or-ref-prop';

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`
);

// Trying to follow example from this blog :
// https://ryankubik.com/blog/eslint-internal-state#Building-More-Complex-ESLint-Rules
// https://astexplorer.net/#/gist/1ff99fca3f85c2e7676ac041a88d7b53/179cf88e3a77c133741d9f96f0dc982b9f11ce4d

const isTsPropertySignature = (node: TSESTree.Node | undefined): node is TSESTree.TSPropertySignature => {
  return node !== undefined && node.type === 'TSPropertySignature';
}

const isTsInterfaceBody = (node: TSESTree.Node | undefined): node is TSESTree.TSInterfaceBody => {
  return node !== undefined && node.type === 'TSInterfaceBody';
}

const isTsInterfaceDeclaration = (node: TSESTree.Node | undefined): node is TSESTree.TSInterfaceDeclaration => {
  return node !== undefined && node.type === 'TSInterfaceDeclaration';
}

const isTsTypeLiteral = (node: TSESTree.Node | undefined): node is TSESTree.TSTypeLiteral => {
  return node !== undefined && node.type === 'TSTypeLiteral';
}

const isTsTypeAliasDeclaration = (node: TSESTree.Node | undefined): node is TSESTree.TSTypeAliasDeclaration => {
  return node !== undefined && node.type === 'TSTypeAliasDeclaration';
}

const rule = createRule<Options, MessageIds>({
  name: 'no-key-or-ref-prop',
  defaultOptions: [],
  create(context) {
    return {
      ["TSInterfaceDeclaration > TSInterfaceBody > TSPropertySignature > :matches(Identifier[name='ref'], Identifier[name='key'])"](
        node: TSESTree.Identifier
      ) {
        const propertySignature = node.parent;
        if (!isTsPropertySignature(propertySignature)) return;

        const interfaceBody = propertySignature.parent;
        if (!isTsInterfaceBody(interfaceBody)) return;

        const interfaceDeclaration = interfaceBody.parent;
        if (!isTsInterfaceDeclaration(interfaceDeclaration)) return;

        const identifier: TSESTree.Identifier = interfaceDeclaration.id;

        if (identifier.name.endsWith('Props')) {
          return context.report({
            messageId: 'no-key-or-ref-prop',
            node: node,
          });
        }
      },
      ["TSTypeAliasDeclaration > TSTypeLiteral > TSPropertySignature > :matches(Identifier[name='ref'], Identifier[name='key'])"](
        node: TSESTree.Identifier
      ) {
        const propertySignature = node.parent;
        if (!isTsPropertySignature(propertySignature)) return;

        const typeLiteral = propertySignature.parent;
        if (!isTsTypeLiteral(typeLiteral)) return;

        const typeAliasDeclaration = typeLiteral.parent;
        if (!isTsTypeAliasDeclaration(typeAliasDeclaration)) return;

        const identifier: TSESTree.Identifier = typeAliasDeclaration.id;

        if (identifier.name.endsWith('Props')) {
          return context.report({
            messageId: 'no-key-or-ref-prop',
            node: node,
          });
        }
      },
    };
  },
  meta: {
    docs: {
      recommended: 'error',
      description:
        'This rule forbids using props named `key` or `ref` in React function components, as they are reserved words and will not act as intended',
    },
    messages: {
      'no-key-or-ref-prop': "Do not use `key` or `ref` as prop names, as they won't work expectedly with React; rename them to something else or use forwardRef() instead."
    },
    type: 'problem',
    schema: [],
  },
});

export default {...rule, configs: []}
