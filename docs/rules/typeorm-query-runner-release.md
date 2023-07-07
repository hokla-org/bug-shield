# Any statement calling a queryRunner should be followed by a try/catch/finally block that ensures that the connection pool is released in any case by calling queryRunner.release() (`@hokla/custom-rules/typeorm-query-runner-release`)

⚠️ This rule _warns_ in the 🤓 `all` [config](https://github.com/hokla-org/eslint-plugin-custom-rules).

<!-- end auto-generated rule header -->
