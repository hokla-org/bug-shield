import rule from "../../lib/rules/enforce-strict-null-checks";
import { RuleTester } from "eslint";
import path from "path";

const ruleTester = new RuleTester({
  parser: require.resolve("jsonc-eslint-parser"),
  parserOptions: {
    ecmaVersion: 2020,
  },
});

const ROOT_DIR = path.join(__dirname, "../../fixtures/auto");

ruleTester.run("{RULE_NAME}", rule, {
  valid: [
    {
      code: `{
        "validKey": "validValue",
      }`,
      filename: path.join(ROOT_DIR, "tsconfig.json"),
    },
  ],
  invalid: [
    {
      code: `{
      "validKey": "validValue",
      "strict": "",
    }`,
      filename: path.join(ROOT_DIR, "tsconfig.json"),
    },
  ],
});
