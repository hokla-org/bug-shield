import { ESLintUtils } from "@typescript-eslint/utils";

import rule from "../../lib/rules/max-params-but-better";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("{RULE_NAME}", rule, {
  valid: [
    `
    [].map((cc, index) => 12);
    `,
    `
    [].sort((cc, index) => 12);
    `,
    `
    [].filter((cc, index) => true);
    `,
    `
    [].reduce((acc, c) => acc+c, 0);
    `,
    `
    const a = (cc) => 12;
    `,
  ],
  invalid: [
    {
      code: `
        const a = (cc, index) => 12;
      `,
      errors: [{ messageId: "max-params-but-better" }],
    },
    {
      code: `
        function yop(a, b) {
        return null;
        };
      `,
      errors: [{ messageId: "max-params-but-better" }],
    },
  ],
});
