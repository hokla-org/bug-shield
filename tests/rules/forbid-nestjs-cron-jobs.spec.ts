import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "../../lib/rules/forbid-nestjs-cron-jobs";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run("{RULE_NAME}", rule, {
  valid: [
    `
    class MyController {
      @MyDecorator()
      async looksLikeAJCronobButIsNot() {}
    }
    `,
  ],
  invalid: [
    {
      code: `
      class MyController {
        @Cron(CronExpression.EVERY_DAY)
        async myCronJob() {}
      }
      `,
      errors: [{ messageId: "forbid-nestjs-cron-jobs" }],
    },
    {
      code: `
      class MyController {
        @Cron()
        async cronJobThatHasNoCronExpression() {}
      }
      `,
      errors: [{ messageId: "forbid-nestjs-cron-jobs" }],
    },
    {
      code: `
      class MyController {
        @Cron('0 * * * *')
        async myCronJob() {}
      }
      `,
      errors: [{ messageId: "forbid-nestjs-cron-jobs" }],
    },
  ],
});
