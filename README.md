# eslint-custom-rules

Recommended custom eslint rules at Hokla

# How to use

## Install

```
yarn add --dev @hokla/eslint-plugin-custom-rules
```

In case you also need to setup eslint :

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
  "rules": {
    "@hokla/custom-rules/react-query-specify-typing": "warn"
  }
}
```

#### Contribute

TODO
