import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "../lib/rules/typeorm-query-runner-release";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("{RULE_NAME}", rule, {
  valid: [
    `
    const anyVarName = this.connection.createQueryRunner();
    doSomething();
    try {
      doAnything();
    } finally {
      anyVarName.release();
    }
    `,
    `
    const mainFunction = () => {
      const anyVarName = this.connection.createQueryRunner();
      doSomething();
      try {
        doAnything();
      } finally {
        anyVarName.release();
      }
    }
    `,
  ],
  invalid: [
    {
      code: `
        const anyVarName = this.connection.createQueryRunner();
        nothingElse();
      `,
      errors: [{ messageId: "missing-query-runner-final-release" }],
    },
    {
      code: `
        const anyVarName = this.connection.createQueryRunner();
        doSomething();
        anyVarName.release(); // should release in a finally statement
      `,
      errors: [{ messageId: "missing-query-runner-final-release" }],
    },
    {
      code: `
        const myFunction = () => {
          const queryRunner = this.connection.createQueryRunner();
          queryRunner.query();
          try {
            console.log('in the try');
          } catch {
            console.log('in the catch');
          } finally {
            notUsingCallingRelease();
          }
        }
        function anotherFunction() {
          const queryRunner = 'anythingElse';
          queryRunner.release();
        }
      `,
      errors: [{ messageId: "missing-query-runner-final-release" }],
    },
  ],
});
