import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "../../lib/rules/RULE_NAME_PLACEHOLDER";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("{RULE_NAME}", rule, {
  valid: [
    `
    TODO
    `
  ],
  invalid: [
    {
      code: `
      TODO
      `,
      errors: [{ messageId: "RULE_NAME_PLACEHOLDER" }],
    },
  ],
});

