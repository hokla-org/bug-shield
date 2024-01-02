import { ESLintUtils } from "@typescript-eslint/utils";

import rule from "../../lib/rules/mandatory-attributes-for-svg-elements";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

const activateJsxParsingOption = {
  ecmaFeatures: {
    jsx: true,
  },
};

ruleTester.run("{RULE_NAME}", rule, {
  valid: [
    {
      code: `
    <Svg height="100" width="100" viewBox="0 0 100 100"></Svg>
    `,
      parserOptions: { ...activateJsxParsingOption },
    },
    {
      code: `
      <svg height={height} width={width} viewBox={viewBox}/>
    `,
      parserOptions: { ...activateJsxParsingOption },
    },
    {
      code: `
      <svg {...props}/>
    `,
      parserOptions: { ...activateJsxParsingOption },
    },
  ],
  invalid: [
    {
      code: `
      <svg />
      `,
      errors: [{ messageId: "mandatory-attributes-for-svg-elements" }],
      parserOptions: { ...activateJsxParsingOption },
    },
    {
      code: `
      <Svg width={width} viewBox={viewBox}/>
      `,
      errors: [{ messageId: "mandatory-attributes-for-svg-elements" }],
      parserOptions: { ...activateJsxParsingOption },
    },
    {
      code: `
      <svg viewBox={viewBox}/>
      `,
      errors: [{ messageId: "mandatory-attributes-for-svg-elements" }],
      parserOptions: { ...activateJsxParsingOption },
    },
    {
      code: `
      <Svg height="100" width={width}/>
      `,
      errors: [{ messageId: "mandatory-attributes-for-svg-elements" }],
      parserOptions: { ...activateJsxParsingOption },
    },
  ],
});
