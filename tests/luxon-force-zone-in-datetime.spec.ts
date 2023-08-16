import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "../lib/rules/luxon-force-zone-in-datetime";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("{RULE_NAME}", rule, {
  valid: [
    `
    const firstLoginText = firstLoginDate
      ? formatDateTime(
        DateTime.fromISO(firstLoginDate, { zone: patient.timezone }),
        DATETIME_DISPLAY_FORMAT_STRING
      )
    : '-';
    `,
    `
    const firstLoginText = firstLoginDate
      ? formatDateTime(
        DateTime.fromISO(firstLoginDate, { zone: patient.timezone, name: 'coucou' }),
        DATETIME_DISPLAY_FORMAT_STRING
      )
    : '-';
    `
  ],
  invalid: [
    {
      code: `
      const firstLoginText = firstLoginDate
			? formatDateTime(
        DateTime.fromISO(firstLoginDate),
        DATETIME_DISPLAY_FORMAT_STRING
      )
    : '-';
      `,
      errors: [{ messageId: "missing-zone-in-datetime" }],
    },
    {
      code: `
      const firstLoginText = firstLoginDate
      ? formatDateTime(
        DateTime.fromISO(firstLoginDate, { name: 'coucou' }),
        DATETIME_DISPLAY_FORMAT_STRING
      )
    : '-';
      `,
      errors: [{ messageId: "missing-zone-in-datetime" }],
    },
    
  ],
});
