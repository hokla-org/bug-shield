import { ESLintUtils } from "@typescript-eslint/utils";

import rule from "../../lib/rules/react-hook-form-specify-typing";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("{RULE_NAME}", rule, {
  valid: [
    `
    useForm<TypeSpecified>({defaultValues: {value1: "value"}});
    `,
    `
    useFormContext<TypeSpecified>();
    `,
    `
    useComponentForm();
    `,
    `
    useComponentFormContext();
    `,
  ],
  invalid: [
    {
      code: `
      useForm({defaultValues: {value1: "value"}});
      `,
      errors: [{ messageId: "react-hook-form-specify-typing" }],
    },
    {
      code: `
      useFormContext();
      `,
      errors: [{ messageId: "react-hook-form-specify-typing" }],
    },
  ],
});
