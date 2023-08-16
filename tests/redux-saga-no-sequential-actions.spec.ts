import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "../lib/rules/redux-saga-no-sequential-actions";

const ruleTester = new ESLintUtils.RuleTester({
    parser: "@typescript-eslint/parser",
});

ruleTester.run("{RULE_NAME}", rule, {
    valid: [
        `
    yield put(orderAdded({pizza: 1, coke: 1}));
    `,
        `
    yield put(orderAdded({pizza: 1, coke: 1}));
    const pizzaCount = yield select(getPizzaCount);
    `,
        `
    yield call(fetchPizza);
    yield put(orderAdded({pizza: 1, coke: 1}));
    `,
        `
    yield put(batchActions(
      [
        setPizzasOrdered({pizza: 1}),
        setCokesOrdered({coke: 1})
      ],
      "ORDER_ADDED"
    ))
    `
    ],
    invalid: [
        {
            code: `
        yield put(setPizzasOrdered({pizza: 1}));
        yield put(setCokesOrdered({coke: 1}));
      `,
            errors: [{ messageId: "sequential-redux-actions" }],
        }
    ],
});
