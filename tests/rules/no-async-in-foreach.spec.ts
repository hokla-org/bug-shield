import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "../../lib/rules/no-async-in-foreach";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("{RULE_NAME}", rule, {
  valid: [
    `
		campaign.auditees.forEach((auditee) => {
			auditeesWithResponseDraftStatus.push({
				...auditee,
				hasResponseDraft: (responseService.findResponseByEvaluationId(auditee._id)) !== null,
			});
		});
    `,
  ],
  invalid: [
    {
      code: `
		campaign.auditees.forEach(async (auditee) => {
			auditeesWithResponseDraftStatus.push({
				...auditee,
				hasResponseDraft: (await responseService.findResponseByEvaluationId(auditee._id)) !== null,
			});
		});      `,
      errors: [{ messageId: "no-async-in-foreach" }],
    },
  ],
});
