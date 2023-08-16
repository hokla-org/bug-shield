import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "../lib/rules/forbid-lowercase-jsx-tags";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    }
  }
});

ruleTester.run("{RULE_NAME}", rule, {
  valid: [
    `
    const Component = () => {
      return <View><Text>Bonjour !</Text></View>;
    }
    `,
    `
    const Component = () => {
      return <View />;
    }
    `,
  ],
  invalid: [
    {
      code: `
      const Component = () => {
        return <Svg><path d="M17 11H9.41l3.3-3.29a1.004 1.004" /></Svg>;
      }
      `,
      errors: [{ messageId: "forbid-lowercase-jsx-tags" }],
    },
    {
      code: `
      const Component = () => {
        return <div><p>Bonjour !</p></div>;
      }
      `,
      errors: [{ messageId: "forbid-lowercase-jsx-tags" }, { messageId: "forbid-lowercase-jsx-tags" }],
    },
    {
      code: `
      const Component = () => {
        return <div />;
      }
      `,
      errors: [{ messageId: "forbid-lowercase-jsx-tags" }],
    }
  ],
});
