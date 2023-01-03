import { ESLintUtils } from "@typescript-eslint/utils";
import { rule } from "../lib/rules/property-decorator-type-mismatch";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("property-decorator-type-mismatch", rule, {
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
      errors: [{ messageId: "mismatch" }],
    },
  ],
});
