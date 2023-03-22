import { ESLintUtils } from "@typescript-eslint/utils";
import { rule } from "../lib/rules/no-key-or-ref-prop";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("{RULE_NAME}", rule, {
  valid: [
    `
    interface MyComponentProps {
      thisIsNotRef: any;
      thisIsNotKey: any;
    }
    `,
    `
    type MyComponentProps = {
      thisIsNotRef: any;
      thisIsNotKey: any;
    };
    `,
    `
    interface ItLooksLikePropsButIsNot {
      ref: any;
      key: any;
    }
    `,
    `
    type ItLooksLikePropsButIsNot = {
      ref: any;
      key: any;
    };
    `
  ],
  invalid: [
    {
      code: `
      interface MyComponentProps {
        ref: any;
        otherProp: any;
      }
      `,
      errors: [{ messageId: "no-key-or-ref-prop" }],
    },
    {
      code: `
      interface MyComponentProps {
        key: any;
        otherProp: any;
      }
      `,
      errors: [{ messageId: "no-key-or-ref-prop" }],
    },
    {
      code: `
      type MyComponentProps = {
        ref: any;
        otherProp: any;
      };
      `,
      errors: [{ messageId: "no-key-or-ref-prop" }],
    },
    {
      code: `
      type MyComponentProps = {
        key: any;
        otherProp: any;
      };
      `,
      errors: [{ messageId: "no-key-or-ref-prop" }],
    },
  ],
});
