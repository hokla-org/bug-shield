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

## List of supported rules

| Rule                                    | Configuration | Description                                                                   |
| --------------------------------------- | ------------- | ----------------------------------------------------------------------------- |
| typeorm-query-runner-release            | recommended   | Ensure all queryRunner instances finally release their db connection          |
| react-query-specify-type                | recommended   | Force to specify data types when using methods useQuery and useMutation       |
| property-decorator-type-mismatch        | recommended   | Ensure attribute decorator @Type(...) is consistent with property type        |
| mutation-decorator-return-type-mismatch | recommended   | Ensure GraphQL @Mutation(...) decorator is consistent with method return type |
| no-async-in-foreach                     | recommended   | Ensure that we don't use async callbacks in foreach loops                     |
| redux-saga-no-sequential-actions        | recommended   | Prevent dispatching Redux Saga actions sequentially                           |

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

- Ask a review !

- Let the world know (slack the teams you want to share it with and tell them to upgrade by running `yarn upgrade @hokla/eslint-plugin-custom-rules` or `npm update @hokla/eslint-plugin-custom-rules`)
