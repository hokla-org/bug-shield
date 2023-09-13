# Bug Shield (ESLint plugin)

<img src="./assets/bug-shield-logo.jpg" alt="Bug Shield Logo" title="Bug Shield Logo" width="100"> 

## Shield your project :

#### Install

```
yarn add --dev @hokla/eslint-plugin-bug-shield
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

#### Ensure a shield does not already exist

#### Generate a new rule
```
yarn rule:generate <your-rule-name>
```

#### Write unit tests

#### Implement the rule
- Find a good AST selector :
  - https://astexplorer.net/
  - https://estools.github.io/esquery/
  - https://typescript-eslint.io/play
  - https://www.notion.so/m33/Faire-ses-propres-r-gles-de-linter-AST-801c068aa15d40a4b39bc0ceff5e49aa
- Debug the test in live to check the nature of the selected node
- Implement the rule
  - https://eslint-utils.mysticatea.dev/
  - https://typescript-eslint.io/

#### Test your rule on the playground
- Build `yarn build`
- Paste some wrong code in `./src/playground.tsx`
- Assess that the working behavior


#### Ask for a review !

#### Let the world know the shield is tougher !
- Let the world know they can improve their protection by running `yarn upgrade @hokla/eslint-plugin-bug-shield` or `npm update @hokla/eslint-plugin-bug-shield`.

## Configs

Configs section would normally go here.

## Rules

<!-- begin auto-generated rules list -->

💼 [Configurations](https://github.com/hokla-org/eslint-plugin-bug-shield) enabled in.\
⚠️ [Configurations](https://github.com/hokla-org/eslint-plugin-bug-shield) set to warn in.\
🌐 Set in the `react` [configuration](https://github.com/hokla-org/eslint-plugin-bug-shield).\
☑️ Set in the `recommended` [configuration](https://github.com/hokla-org/eslint-plugin-bug-shield).

| Name                                                                                                               | Description                                                                                                                                                                         | 💼 | ⚠️ |
| :----------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :- | :- |
| [forbid-lowercase-jsx-tags](docs/rules/forbid-lowercase-jsx-tags.md)                                               | To be used in a React Native project: this rule forbids JSX tags that don't begin with a capital letter                                                                             |    |    |
| [luxon-force-zone-in-datetime](docs/rules/luxon-force-zone-in-datetime.md)                                         | force timezone option in DateTime object instantiation                                                                                                                              |    | ☑️ |
| [mutation-decorator-return-type-mismatch](docs/rules/mutation-decorator-return-type-mismatch.md)                   | Parameter of Mutation Decorator should match the method's return type                                                                                                               | ☑️ |    |
| [no-async-in-foreach](docs/rules/no-async-in-foreach.md)                                                           | Array.prototype.forEach is not designed for asynchronous code                                                                                                                       | ☑️ |    |
| [no-key-or-ref-prop](docs/rules/no-key-or-ref-prop.md)                                                             | This rule forbids using props named `key` or `ref` in React function components, as they are reserved words and will not act as intended                                            | 🌐 |    |
| [no-value-export-in-declaration-file](docs/rules/no-value-export-in-declaration-file.md)                           | This rule forbids exporting values from TypeScript declaration files (ending in ".d.ts"), which can lead to bugs since these files are dropped during transpilation.                | ☑️ |    |
| [property-decorator-type-mismatch](docs/rules/property-decorator-type-mismatch.md)                                 | Parameter of Type Decorator should match the property type                                                                                                                          | ☑️ |    |
| [react-query-specify-typing](docs/rules/react-query-specify-typing.md)                                             | Type parameters should always be specified when calling useQuery and useMutation from react-query                                                                                   |    | 🌐 |
| [react-routes-must-be-wrapped-in-router](docs/rules/react-routes-must-be-wrapped-in-router.md)                     | enforce encapsulation of <...Routes> in <...Router> provider and explicit naming of components returning <...Routes> element                                                        | 🌐 |    |
| [redux-saga-no-sequential-actions](docs/rules/redux-saga-no-sequential-actions.md)                                 | forbid multiple sequential action calls in redux dispatcher                                                                                                                         |    |    |
| [typeorm-enforce-repository-generic-method-typing](docs/rules/typeorm-enforce-repository-generic-method-typing.md) | enforce calls to repository generic methods (save, softRemove and recover) without type specification                                                                               |    |    |
| [typeorm-query-runner-release](docs/rules/typeorm-query-runner-release.md)                                         | Any statement calling a queryRunner should be followed by a try/catch/finally block that ensures that the connection pool is released in any case by calling queryRunner.release(). |    |    |

<!-- end auto-generated rules list -->
