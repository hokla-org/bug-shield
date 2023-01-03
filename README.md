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

```
{
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": ["@typescript-eslint", "@hokla/eslint-plugin-custom-rules"],
  "parser": "@typescript-eslint/parser",
  // If you want to customize the level of warning (default to 'warn')
  "rules": {
    "@hokla/custom-rules/react-query-specify-typing": "off" // "error" | "warn
  }
}
```

#### Contribute

- Create a new PR: https://github.com/hokla-org/eslint-plugin-custom-rules/compare

- Write a test with valid and invalid code samples

- Use online tools to specify AST selectors and implement the rule
  - https://astexplorer.net/
  - https://estools.github.io/esquery/
  - https://typescript-eslint.io/play
  - https://www.notion.so/m33/Faire-ses-propres-r-gles-de-linter-AST-801c068aa15d40a4b39bc0ceff5e49aa
  - https://eslint-utils.mysticatea.dev/
  - https://typescript-eslint.io/

#### Ideas for next recommended rules and plugins

- No dynamic component in render

Ideas for new rules

- No destructuring react query object https://www.notion.so/m33/ETQMI-lorsque-je-prescris-un-ou-plusieurs-bolus-la-dose-cumul-e-est-actualis-e-7353bb4b62554814b9268db33d245e14

- Release connection pool
  https://www.notion.so/m33/Dashboard-display-overview-long-time-in-the-past-doesn-t-work-28313bc54c2645b49fbc0ad9ee649dc3

- Prevent await un loops, maps, ...
  https://www.notion.so/m33/ETQDev-lorsque-j-appelle-la-route-POST-tables-je-peux-cr-er-une-nouvelle-table-et-la-remplir-avec--9a12e2c8764f4497898130a71212616c

- No Not(null) in typeOrm findOptions but rather Not(IsNull()) https://www.notion.so/m33/576f703512bb424999423e2b05cf8dde?v=853d3074f7eb447eb7e8b34127e1105c&p=3aa206931aa74691bb0b61ca1bdbb9ca&pm=s
- https://github.com/hokla-org/dojo-eslint-rules/blob/master/eslint/lib/rules/type-mismatch.ts
