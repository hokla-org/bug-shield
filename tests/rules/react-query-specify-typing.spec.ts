import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "../../lib/rules/react-query-specify-typing";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("{RULE_NAME}", rule, {
  valid: [
    `
    useQuery<TypeSpecified>(queryKey, { queryFn: anyQueryFunction });
    `,
    `
    useQueryClient();
    `,
    `
    useMutation<TypeSpecified>({ mutationFn: anyMutationFunction });
    `,

    `
    useMutationWithCustomWrapper<TypeSpecified>({ mutationFn: anyMutationFunction });
    `,
  ],
  invalid: [
    {
      code: `
      useQuery(queryKey, { queryFn: anyQueryFunction });
      `,
      errors: [{ messageId: "missing-use-query-types" }],
    },
    {
      code: `
      useMutation({ mutationFn: anyMutationFunction });
      `,
      errors: [{ messageId: "missing-use-mutation-types" }],
    },
    {
      code: `
      useMutationWithInvalidation({ mutationFn: anyMutationFunction });
      `,
      errors: [{ messageId: "missing-use-mutation-types" }],
    },
  ],
});
