import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

type MessageIds = "no-value-export-in-declaration-file";

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`,
);

const rule = createRule<Options, MessageIds>({
  name: "no-value-export-in-declaration-file",
  defaultOptions: [],
  create(context) {
    return {
      [":matches(ExportNamedDeclaration[exportKind='value'], ExportDefaultDeclaration[exportKind='value'])"](
        node:
          | TSESTree.ExportNamedDeclaration
          | TSESTree.ExportDefaultDeclaration,
      ) {
        const filename = context.getFilename();

        if (filename.endsWith(".d.ts")) {
          context.report({
            messageId: "no-value-export-in-declaration-file",
            node,
          });
        }
      },
    };
  },
  meta: {
    docs: {
      recommended: "error",
      description:
        'This rule forbids exporting values from TypeScript declaration files (ending in ".d.ts"), which can lead to bugs since these files are dropped during transpilation.',
    },
    messages: {
      "no-value-export-in-declaration-file":
        'Cannot export values from declaration files (ending in ".d.ts")',
    },
    type: "problem",
    schema: [],
  },
});

export default { ...rule, configs: ["recommended"] };
