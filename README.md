# Hokla's Eslint plugin

Recommended custom eslint rules at Hokla

# How to use

## Install

```
yarn add --dev @hokla/eslint-plugin-custom-rules
```

**Optional:** In case you also need to setup eslint :

```
yarn add --dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

## Use rules in your projects

In your `.eslintrc.json` file :

```json
{
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@hokla/custom-rules/recommended"
  ],
  "plugins": ["@typescript-eslint"],
  "parser": "@typescript-eslint/parser",
  // In case you want to customize the level of warning (default to 'warn')
  "rules": {
    "@hokla/custom-rules/react-query-specify-typing": "warn" // "error" | "warn
  }
}
```

                   |

# Contribute

- Create a new branch and PR: https://github.com/hokla-org/eslint-plugin-custom-rules/compare

- Write a test with valid and invalid code samples

- Use online tools to specify AST selectors and implement the rule

  - https://astexplorer.net/
  - https://estools.github.io/esquery/
  - https://typescript-eslint.io/play
  - https://www.notion.so/m33/Faire-ses-propres-r-gles-de-linter-AST-801c068aa15d40a4b39bc0ceff5e49aa
  - https://eslint-utils.mysticatea.dev/
  - https://typescript-eslint.io/

- Build rules with `yarn build`, create the doc file for your rule in `docs/rules/[YOUR_RULE_NAME].md` (empty file is ok) and run `yarn update:eslint-docs` to update rules docs.

- Ask a review !

- Let the world know (slack the teams you want to share it with and tell them to upgrade by running `yarn upgrade @hokla/eslint-plugin-custom-rules` or `npm update @hokla/eslint-plugin-custom-rules`)

## Configs

Configs section would normally go here.

## Rules

<!-- begin auto-generated rules list -->

💼 [Configurations](https://github.com/hokla-org/eslint-plugin-custom-rules) enabled in.\
⚠️ [Configurations](https://github.com/hokla-org/eslint-plugin-custom-rules) set to warn in.\
🤓 Set in the `all` [configuration](https://github.com/hokla-org/eslint-plugin-custom-rules).\
☑️ Set in the `recommended` [configuration](https://github.com/hokla-org/eslint-plugin-custom-rules).

| Name                                                                                                               | Description                                                                                                                                                                         | 💼    | ⚠️ |
| :----------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---- | :- |
| [forbid-lowercase-jsx-tags](docs/rules/forbid-lowercase-jsx-tags.md)                                               | To be used in a React Native project: this rule forbids JSX tags that don't begin with a capital letter                                                                             | 🤓    |    |
| [luxon-force-zone-in-datetime](docs/rules/luxon-force-zone-in-datetime.md)                                         | TODO                                                                                                                                                                                |       | 🤓 |
| [mutation-decorator-return-type-mismatch](docs/rules/mutation-decorator-return-type-mismatch.md)                   | Parameter of Mutation Decorator should match the method's return type                                                                                                               | 🤓    |    |
| [no-async-in-foreach](docs/rules/no-async-in-foreach.md)                                                           | Array.prototype.forEach is not designed for asynchronous code                                                                                                                       | 🤓 ☑️ |    |
| [no-key-or-ref-prop](docs/rules/no-key-or-ref-prop.md)                                                             | This rule forbids using props named `key` or `ref` in React function components, as they are reserved words and will not act as intended                                            | 🤓    |    |
| [no-value-export-in-declaration-file](docs/rules/no-value-export-in-declaration-file.md)                           | This rule forbids exporting values from TypeScript declaration files (ending in ".d.ts"), which can lead to bugs since these files are dropped during transpilation.                | 🤓 ☑️ |    |
| [property-decorator-type-mismatch](docs/rules/property-decorator-type-mismatch.md)                                 | Parameter of Type Decorator should match the property type                                                                                                                          | 🤓 ☑️ |    |
| [react-query-specify-typing](docs/rules/react-query-specify-typing.md)                                             | Type parameters should always be specified when calling useQuery and useMutation from react-query                                                                                   |       | 🤓 |
| [react-routes-must-be-wrapped-in-router](docs/rules/react-routes-must-be-wrapped-in-router.md)                     | enforce encapsulation of <...Routes> in <...Router> provider and explicit naming of components returning <...Routes> element                                                        | 🤓    |    |
| [redux-saga-no-sequential-actions](docs/rules/redux-saga-no-sequential-actions.md)                                 | description here                                                                                                                                                                    |       | 🤓 |
| [typeorm-enforce-repository-generic-method-typing](docs/rules/typeorm-enforce-repository-generic-method-typing.md) | enforce calls to repository generic methods (save, softRemove and recover) without type specification                                                                               |       | 🤓 |
| [typeorm-query-runner-release](docs/rules/typeorm-query-runner-release.md)                                         | Any statement calling a queryRunner should be followed by a try/catch/finally block that ensures that the connection pool is released in any case by calling queryRunner.release(). |       | 🤓 |

<!-- end auto-generated rules list -->
