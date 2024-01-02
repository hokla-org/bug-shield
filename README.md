# Bug Shield (ESLint plugin)

<img src="./assets/bug-shield-logo.png" alt="Bug Shield Logo" title="Bug Shield Logo" width="100">

A team can build its own shield to kill bugs for good

## Shield your project :

#### Install

```
npm install @hokla/eslint-plugin-bug-shield --save-dev
```

#### Choose the configs made for your project
In your `.eslintrc.json` file :

```json
{
  "extends": [
    // [...],
    "plugin:@hokla/bug-shield/recommended",
    "plugin:@hokla/bug-shield/react"
  ],
  // In case you want to opt-out from specific rules:
  "rules": {
    "@hokla/bug-shield/react-query-specify-typing": "off" // "off" | "warn"
  }
}
```

## Kill bugs across many projects by crafting the shield :

#### Ensure a shield does not already exist in the open-source world

#### Generate a new rule

```
yarn rule:generate <your-rule-name>
```

#### Write unit tests

#### Implement the rule
- Find a good AST selector :
  - [https://typescript-eslint.io/play](https://typescript-eslint.io/play/#ts=5.3.3&showAST=es&fileType=.tsx&code=FAYw9gdgzgLgBAWwJ4FEAeBDBAHANgUwGEwATfOAXjgAoBKSgPjgG9g44SwAhDEgZRgBXAGbCAEvgBO%2BOgG42caUMkQ4wjLij55AXyA&eslintrc=N4KABGBEBOCuA2BTAzpAXGYBfEWg&tsconfig=N4KABGBEDGD2C2AHAlgGwKYCcDyiAuysAdgM6QBcYoEEkJemy0eAcgK6qoDCAFutAGsylBm3TgwAXxCSgA&tokens=false)
  - https://eslint.org/docs/latest/extend/selectors
- Debug the test in live to check the nature of the selected node:
  - In your rule implementation, set a large AST node selector (like "VariableDeclarator")
  - Add a break point inside your rule
  - Run the VSCode launch config "Tests Debugger" (optionnaly, modify the launch command by adding a file selector)
- Implement the rule
  - Get inspiration from other existing rules in this plugin
  - https://typescript-eslint.io/developers/custom-rules

#### Test your rule on the playground
- Build `yarn build`
- Restart your eslint server
- Paste some wrong code in `./src/playground.tsx`
- Assess that the working behavior

#### Generate the rule documentation
- Run `yarn create:eslint-docs` if you just created the rule, otherwise run `yarn update:eslint-docs`


#### Ask for a review !

#### Let the world know the shield is tougher !
- Let the world know they can improve their protection by running `yarn upgrade @hokla/eslint-plugin-bug-shield` or `npm update @hokla/eslint-plugin-bug-shield`.

## Configs

#### Create a new config
[TO BE IMPROVED]
- Create a [CONFIG_NAME].config.ts file in the config folder
- In this file, copy the following block
```ts
import {
  RuleListener,
  RuleModule,
} from "@typescript-eslint/utils/dist/ts-eslint";
import { Config, PLUGIN_NAME, getConfigCustomRules } from "../utils/config";

export const CONFIG_NAME = ...; // Use the same config name as your file name

export const getConfig: CustomConfig<typeof CONFIG_NAME> = (allRules) => {
  return {
    [CONFIG_NAME]: {
      plugins: [PLUGIN_NAME],
      rules: { ...getConfigCustomRules(CONFIG_NAME, allRules) },
    },
  };
};
```
- Modify the config as you please
- Add your config in .eslint-doc-generator.js
- Build `yarn build`
- Generate the documentation with the new config : `yarn update:eslint-docs`

## Rules

<!-- begin auto-generated rules list -->

💼 [Configurations](https://github.com/hokla-org/eslint-plugin-bug-shield) enabled in.\
⚠️ [Configurations](https://github.com/hokla-org/eslint-plugin-bug-shield) set to warn in.\
🦅 Set in the `nestjs` [configuration](https://github.com/hokla-org/eslint-plugin-bug-shield).\
🌐 Set in the `react` [configuration](https://github.com/hokla-org/eslint-plugin-bug-shield).\
⚛️ Set in the `react-native` [configuration](https://github.com/hokla-org/eslint-plugin-bug-shield).\
☑️ Set in the `recommended` [configuration](https://github.com/hokla-org/eslint-plugin-bug-shield).\
🔄 Set in the `redux` [configuration](https://github.com/hokla-org/eslint-plugin-bug-shield).\
📦 Set in the `typeorm` [configuration](https://github.com/hokla-org/eslint-plugin-bug-shield).\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

| Name                                                                                                               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                | 💼    | ⚠️ | 💡 |
| :----------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---- | :- | :- |
| [forbid-lowercase-jsx-tags](docs/rules/forbid-lowercase-jsx-tags.md)                                               | To be used in a React Native project: this rule forbids JSX tags that don't begin with a capital letter                                                                                                                                                                                                                                                                                                                                    | ⚛️    |    |    |
| [forbid-nestjs-cron-jobs](docs/rules/forbid-nestjs-cron-jobs.md)                                                   | Don't use NestJS cron jobs, as they can entail performance problems for your server, as well as concurrency issues (your job might run several times in parallel). Instead, define a CLI command to run your job in your NestJS project (for example with nest-commander) and call it from a cron job defined at the infrastructure level (e.g. in your Kubernetes cluster, or on the platform that hosts your server: Scalingo, Vercel…). | 🦅    |    |    |
| [luxon-force-zone-in-datetime](docs/rules/luxon-force-zone-in-datetime.md)                                         | force timezone option in DateTime object instantiation                                                                                                                                                                                                                                                                                                                                                                                     |       | ☑️ |    |
| [mandatory-attributes-for-svg-elements](docs/rules/mandatory-attributes-for-svg-elements.md)                       | Enforces the declaration of properties width, height and viewBox for svg elements to prevent non-desired display                                                                                                                                                                                                                                                                                                                           | 🌐 ⚛️ |    |    |
| [mutation-decorator-return-type-mismatch](docs/rules/mutation-decorator-return-type-mismatch.md)                   | Parameter of Mutation Decorator should match the method's return type                                                                                                                                                                                                                                                                                                                                                                      | ☑️    |    |    |
| [no-async-in-foreach](docs/rules/no-async-in-foreach.md)                                                           | Array.prototype.forEach is not designed for asynchronous code                                                                                                                                                                                                                                                                                                                                                                              | ☑️    |    |    |
| [no-key-or-ref-prop](docs/rules/no-key-or-ref-prop.md)                                                             | This rule forbids using props named `key` or `ref` in React function components, as they are reserved words and will not act as intended                                                                                                                                                                                                                                                                                                   | 🌐    |    |    |
| [no-useless-expression-statement](docs/rules/no-useless-expression-statement.md)                                   | A statement that only calls a variable does nothing. Usually, the developer meant to call a function but forgot the parentheses.                                                                                                                                                                                                                                                                                                           | ☑️    |    |    |
| [no-value-export-in-declaration-file](docs/rules/no-value-export-in-declaration-file.md)                           | This rule forbids exporting values from TypeScript declaration files (ending in ".d.ts"), which can lead to bugs since these files are dropped during transpilation.                                                                                                                                                                                                                                                                       | ☑️    |    |    |
| [property-decorator-type-mismatch](docs/rules/property-decorator-type-mismatch.md)                                 | Parameter of Type Decorator should match the property type                                                                                                                                                                                                                                                                                                                                                                                 | ☑️    |    |    |
| [react-query-specify-typing](docs/rules/react-query-specify-typing.md)                                             | Type parameters should always be specified when calling useQuery and useMutation from react-query                                                                                                                                                                                                                                                                                                                                          |       | 🌐 |    |
| [react-routes-must-be-wrapped-in-router](docs/rules/react-routes-must-be-wrapped-in-router.md)                     | enforce encapsulation of <...Routes> in <...Router> provider and explicit naming of components returning <...Routes> element                                                                                                                                                                                                                                                                                                               | 🌐    |    |    |
| [redux-saga-no-sequential-actions](docs/rules/redux-saga-no-sequential-actions.md)                                 | forbid multiple sequential action calls in redux dispatcher                                                                                                                                                                                                                                                                                                                                                                                |       | 🔄 |    |
| [typeorm-enforce-column-type](docs/rules/typeorm-enforce-column-type.md)                                           | The SQL column type in a TypeORM entity column must be specified to ensure the control of types in the database match your needs.                                                                                                                                                                                                                                                                                                          | 📦    |    | 💡 |
| [typeorm-enforce-repository-generic-method-typing](docs/rules/typeorm-enforce-repository-generic-method-typing.md) | enforce calls to repository generic methods (save, softRemove and recover) without type specification                                                                                                                                                                                                                                                                                                                                      |       | 📦 |    |
| [typeorm-query-runner-release](docs/rules/typeorm-query-runner-release.md)                                         | Any statement calling a queryRunner should be followed by a try/catch/finally block that ensures that the connection pool is released in any case by calling queryRunner.release().                                                                                                                                                                                                                                                        |       | 📦 |    |

<!-- end auto-generated rules list -->
