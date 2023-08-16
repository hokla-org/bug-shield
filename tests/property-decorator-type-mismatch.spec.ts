import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "../lib/rules/property-decorator-type-mismatch";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("{RULE_NAME}", rule, {
  valid: [
    `
    export class RGDSPatient {
      @Type(() => AdressEntity)
      adress!: AdressEntity;
    } 
    `,
  ],
  invalid: [
    {
      code: `
      export class RGDSPatient {
        @Type(() => String)
        adress!: AdressEntity;
      }
      `,
      errors: [{ messageId: "property-decorator-type-mismatch" }],
    },
  ],
});
