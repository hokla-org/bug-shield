import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

type MessageIds = "forbid-nestjs-cron-jobs";

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`,
);

// Type: RuleModule<"uppercase", ...>
const rule = createRule<Options, MessageIds>({
  name: "forbid-nestjs-cron-jobs",
  defaultOptions: [],
  create(context) {
    return {
      ['Decorator > CallExpression[callee.name="Cron"]'](
        node: TSESTree.Decorator,
      ) {
        context.report({
          messageId: "forbid-nestjs-cron-jobs",
          node: node,
        });
      },
    };
  },
  meta: {
    docs: {
      recommended: "error",
      description:
        "Don't use NestJS cron jobs, as they can entail performance problems for your server, as well as concurrency issues (your job might run several times in parallel). Instead, define a CLI command to run your job in your NestJS project (for example with nest-commander) and call it from a cron job defined at the infrastructure level (e.g. in your Kubernetes cluster, or on the platform that hosts your server: Scalingo, Vercel…).",
    },
    messages: {
      "forbid-nestjs-cron-jobs":
        "Don't use NestJS cron jobs, as they can entail performance problems for your server, as well as concurrency issues (your job might run several times in parallel). Instead, define a CLI command to run your job in your NestJS project (for example with nest-commander) and call it from a cron job defined at the infrastructure level (e.g. in your Kubernetes cluster, or on the platform that hosts your server: Scalingo, Vercel…).",
    },
    type: "problem",
    schema: [],
  },
});

export default { ...rule, configs: ["nestjs"] };
