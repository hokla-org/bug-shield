import type { Rule } from "eslint";
import type { AST } from "jsonc-eslint-parser";
import type { RuleModule, PartialRuleModule } from "../utils/types";
import path from "path";
import * as jsoncESLintParser from "jsonc-eslint-parser";

function createRule(ruleName: string, rule: PartialRuleModule): RuleModule {
  return {
    meta: {
      ...rule.meta,
      docs: {
        ...rule.meta.docs,
        url: `https://ota-meshi.github.io/eslint-plugin-jsonc/rules/${ruleName}.html`,
        ruleId: `jsonc/${ruleName}`,
        ruleName,
      },
    },
    jsoncDefineRule: rule,
    create(context: Rule.RuleContext) {
      if (
        typeof context.parserServices.defineCustomBlocksVisitor ===
          "function" &&
        path.extname(context.getFilename()) === ".vue"
      ) {
        return context.parserServices.defineCustomBlocksVisitor(
          context,
          jsoncESLintParser,
          {
            target(lang: string | null) {
              if (lang) {
                return /^json[5c]?$/i.test(lang);
              }
            },
            create(blockContext: Rule.RuleContext) {
              return rule.create(blockContext, {
                customBlock: true,
              });
            },
          }
        );
      }
      return rule.create(context, {
        customBlock: false,
      });
    },
  };
}

const rule = createRule("enforce-strict-null-checks", {
  create(context: Rule.RuleContext) {
    if (!context.parserServices.isJSON) {
      return {};
    }
    return {
      //
      JSONLiteral(node: AST.JSONStringLiteral) {
        if (context.filename.includes("tsconfig.json") && isNodeStrict(node)) {
          return context.report({
            messageId: "enforce-strict-null-checks",
            loc: node.loc,
          });
        }
      },
    };
  },
  meta: {
    docs: {
      recommended: null,
      description: "TODO",
      extensionRule: "test",
      layout: false,
    },
    messages: {
      "enforce-strict-null-checks":
        'The "strictNullChecks" field in tsconfig.json should be set to "error".',
    },
    type: "problem",
    schema: [],
  },
});

function isNodeStrict(node: AST.JSONStringLiteral) {
  return node.value === "strict";
}

export default { ...rule, configs: ["recommended"] };
