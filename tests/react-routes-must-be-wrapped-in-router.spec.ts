import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "../lib/rules/react-routes-must-be-wrapped-in-router";

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
    function MainRoutes() {
      return (
        <Routes>
          <Route></Route>
        </Routes>
      );
    }
    `,
      parserOptions: { ...activateJsxParsingOption },
    },
    {
      code: `
    const MainRoutes = () => {
      return (
        <Routes />
      );
    }
    `,
      parserOptions: { ...activateJsxParsingOption },
    },
    {
      code: `
    const MainRoutes = () => {
      return (
        <MyRoutes />
      );
    }
    `,
      parserOptions: { ...activateJsxParsingOption },
    },
    {
      code: `
    const Main = () => {
      return (
        <MyRouter>
          <Anything>
            <MyRoutes>
              <Route></Route>
            </MyRoutes>
          </Anything>
        </MyRouter>
      );
    }
    `,
      parserOptions: { ...activateJsxParsingOption },
    },
  ],
  invalid: [
    {
      code: `
      const Main = () => {
        return (
            <Routes>
              <Route></Route>
            </Routes>
            );
      }
      `,
      parserOptions: { ...activateJsxParsingOption },
      errors: [
        { messageId: "ambiguous-naming-for-component-returning-routes" },
      ],
    },
    {
      code: `
      const Main = () => {
        return (
            <Routes />
            );
      }
      `,
      parserOptions: { ...activateJsxParsingOption },
      errors: [
        { messageId: "ambiguous-naming-for-component-returning-routes" },
      ],
    },
    {
      code: `
      const RoutesMain = () => {
        return (
            <Routes>
              <Route></Route>
            </Routes>
            );
      }
      `,
      parserOptions: { ...activateJsxParsingOption },
      errors: [
        { messageId: "ambiguous-naming-for-component-returning-routes" },
      ],
    },
    {
      code: `
      const RoutesMain = () => {
        return (
            <MyRoutes>
              <Route></Route>
            </MyRoutes>
            );
      }
      `,
      parserOptions: { ...activateJsxParsingOption },
      errors: [
        { messageId: "ambiguous-naming-for-component-returning-routes" },
      ],
    },
    {
      code: `
      const Main = () => {
        return (
            <Anything>
              <MyRoutes>
                <Route></Route>
              </MyRoutes>
            </Anything>
        );
      };
      `,
      parserOptions: { ...activateJsxParsingOption },
      errors: [
        { messageId: "no-routing-context-provided-to-routes-component" },
      ],
    },
  ],
});
