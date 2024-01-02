import {
  RuleListener,
  RuleModule,
} from "@typescript-eslint/utils/dist/ts-eslint";

export type ConfigName =
  | "all"
  | "nestjs"
  | "react-native"
  | "react"
  | "recommended"
  | "redux"
  | "test"
  | "typeorm";

export type CustomConfig<T extends ConfigName> = (allRules: {
  [ruleName: string]: RuleModule<string, [], RuleListener> & {
    configs: ConfigName[];
  };
}) => Record<T, unknown>;
