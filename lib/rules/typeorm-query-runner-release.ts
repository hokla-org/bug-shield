import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from "@typescript-eslint/utils";

type MessageIds = "missing-query-runner-final-release";

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`
);

// Trying to follow example from this blog :
// https://ryankubik.com/blog/eslint-internal-state#Building-More-Complex-ESLint-Rules
// https://astexplorer.net/#/gist/1ff99fca3f85c2e7676ac041a88d7b53/179cf88e3a77c133741d9f96f0dc982b9f11ce4d

type NodeWithBody = TSESTree.Node & {
  body: TSESTree.BlockStatement;
};

const rule = createRule<Options, MessageIds>({
  name: "typeorm-query-runner-release",
  defaultOptions: [],
  create(context) {
    function isNodeWithBody(node: TSESTree.Node): node is NodeWithBody {
      return "body" in node;
    }
    function getTryCatchFinalizerStatements(scopeNode: TSESTree.Node) {
      const tryStatements: TSESTree.BlockStatement[] = [];

      if (isNodeWithBody(scopeNode)) {
        const block = Array.isArray(scopeNode.body)
          ? scopeNode.body
          : scopeNode.body?.body;
        block.forEach((statement) => {
          if (
            statement.type === AST_NODE_TYPES.TryStatement &&
            statement.finalizer !== null
          )
            tryStatements.push(statement.finalizer);
        });
      }

      return tryStatements;
    }
    function containsCallToReleaseMethod(code: string) {
      const patternToFind = ".release(";
      return code.includes(patternToFind);
    }

    return {
      // Select a node from the AST
      ["CallExpression[callee.property.name='createQueryRunner']"](
        node: TSESTree.CallExpression
      ) {
        // Block Statement
        const scopeNode = context.getScope()?.block;

        // Find a try catch statement in the block
        const finalizerStatements = getTryCatchFinalizerStatements(scopeNode);

        // If it does not exist, return error : should be followed by a try catch statement
        if (finalizerStatements.length === 0) {
          const messageId = "missing-query-runner-final-release";
          return context.report({
            messageId: messageId,
            node: node,
          });
        }

        const code = context.getSourceCode().getText(finalizerStatements[0]);
        if (!containsCallToReleaseMethod(code)) {
          const messageId = "missing-query-runner-final-release";
          return context.report({
            messageId: messageId,
            node: node,
          });
        }
      },
    };
  },
  meta: {
    docs: {
      recommended: "warn",
      description:
        "Any statement calling a queryRunner should be followed by a try/catch/finally block that ensures that the connection pool is released in any case by calling queryRunner.release().",
    },
    messages: {
      "missing-query-runner-final-release":
        "Missing query runner release call in a finalizer block. Use try { ... } finally { queryRunner.release(); }",
    },
    type: "problem",
    schema: [],
  },
});

export default {...rule, configs: []}
