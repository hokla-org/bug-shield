import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "../../lib/rules/no-value-export-in-declaration-file";

const ruleTesterDeclarationFile = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

// We want to forbid value exports only in declaration files, so here we mock being in one.
// In the next test below, we mock being in a normal file, where value exports are allowed.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ruleTesterDeclarationFile.getFilename = () => "declaration-file.d.ts";

ruleTesterDeclarationFile.run("{RULE_NAME}", rule, {
  valid: [
    `
    const value = 'bonjour';
    `,
    `
    export type MyType = 'bonjour';
    `,
    `
    export interface MyInterface { property: 'bonjour' }
    `,
  ],
  invalid: [
    {
      code: `
      export const value = 'bonjour';
      `,
      errors: [{ messageId: "no-value-export-in-declaration-file" }],
    },
    {
      code: `
      const value = 'bonjour';
      export default value;
      `,
      errors: [{ messageId: "no-value-export-in-declaration-file" }],
    },
  ],
});

const ruleTesterNormalFile = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ruleTesterNormalFile.getFilename = () => "normal-file.ts";

ruleTesterNormalFile.run("{RULE_NAME}", rule, {
  valid: [
    `
    const value = 'bonjour';
    `,
    `
    export type MyType = 'bonjour';
    `,
    `
    export interface MyInterface { property: 'bonjour' }
    `,
    `
    export const value = 'bonjour';
    `,
    `
    const value = 'bonjour';
    export default value;
    `,
  ],
  invalid: [],
});
