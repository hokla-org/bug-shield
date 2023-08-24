import {
  RuleListener,
  RuleModule,
} from "@typescript-eslint/utils/dist/ts-eslint";

const RULE_LISTENER_MOCK: RuleListener = {};

export const ALL_RULES_MOCK: {
  [ruleName: string]: RuleModule<string, [], RuleListener> & {
    configs: string[];
  };
} = {
  rule_A: {
    configs: [],
    defaultOptions: [],
    meta: {
      schema: [],
      docs: { recommended: "warn", description: "description of the Rule" },
      messages: { rule: "How you should apply this rule" },
      type: "problem",
    },
    create: () => RULE_LISTENER_MOCK,
  },
  rule_B: {
    configs: ["test"],
    defaultOptions: [],
    meta: {
      schema: [],
      docs: { recommended: "error", description: "description of the Rule" },
      messages: { rule: "How you should apply this rule" },
      type: "problem",
    },
    create: () => RULE_LISTENER_MOCK,
  },
  rule_C: {
    configs: ["other"],
    defaultOptions: [],
    meta: {
      schema: [],
      docs: { recommended: "error", description: "description of the Rule" },
      messages: { rule: "How you should apply this rule" },
      type: "problem",
    },
    create: () => RULE_LISTENER_MOCK,
  },
  rule_D: {
    configs: ["other", "test"],
    defaultOptions: [],
    meta: {
      schema: [],
      docs: { recommended: "warn", description: "description of the Rule" },
      messages: { rule: "How you should apply this rule" },
      type: "problem",
    },
    create: () => RULE_LISTENER_MOCK,
  },
};
