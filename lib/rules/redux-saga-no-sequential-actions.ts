import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from "@typescript-eslint/utils";

type MessageIds = "sequential-redux-actions";

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`
);

export const rule = createRule<Options, MessageIds>({
  name: "redux-saga-no-sequential-actions",
  defaultOptions: [],
  create(context) {
    return {
      // Select a node that yields a put immediately after another yield put
      ["ExpressionStatement:has(YieldExpression CallExpression[callee.name = 'put']) + ExpressionStatement:has(YieldExpression CallExpression[callee.name = 'put'])"](
        node: TSESTree.CallExpression
      ) {
        return context.report({
          messageId: "sequential-redux-actions",
          node: node,
        });
      },
    };
  },
  meta: {
    docs: {
      recommended: "warn",
      description:
        "Avoid dispatching two actions sequentially as it will result in multiple UI updates, and unexpected display due to illegal intermediate states. Prefer using a single 'event'-type action that respects domain/name or you can use batch() to batch multiple actions together. \n\nSee standard https://redux.js.org/style-guide/#avoid-dispatching-many-actions-sequentially. \nSee defect https://www.notion.so/m33/Timebox-1h-APP-Screen-is-blinking-while-logging-out-of-in-clinic-mode-55e774890d3b414786dd0064e91ce70a",
    },
    messages: {
      "sequential-redux-actions":
        "Avoid dispatching two actions sequentially as it will result in multiple UI updates, and unexpected display due to illegal intermediate states.\n\nPrefer using a single 'event'-type action that respects domain/ name or you can use batch() to batch multiple actions together. \n\nSee standard https://redux.js.org/style-guide/#avoid-dispatching-many-actions-sequentially. \nSee defect https://www.notion.so/m33/Timebox-1h-APP-Screen-is-blinking-while-logging-out-of-in-clinic-mode-55e774890d3b414786dd0064e91ce70a",
    },
    type: "problem",
    schema: [],
  },
});

export default rule;
