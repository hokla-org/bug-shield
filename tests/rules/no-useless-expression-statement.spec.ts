import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "../../lib/rules/no-useless-expression-statement";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("{RULE_NAME}", rule, {
  valid: [
    `
    myFunction();
    `,
    `
    myVariable = 6;
    `,
  ],
  invalid: [
    {
      code: `
      myFunction;
      `,
      errors: [{ messageId: "no-useless-expression-statement" }],
    },
  ],
});
