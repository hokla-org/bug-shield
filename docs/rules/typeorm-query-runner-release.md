# Any statement calling a queryRunner should be followed by a try/catch/finally block that ensures that the connection pool is released in any case by calling queryRunner.release() (`@hokla/bug-shield/typeorm-query-runner-release`)

⚠️ This rule _warns_ in the `typeorm` [config](https://github.com/hokla-org/eslint-plugin-bug-shield).

<!-- end auto-generated rule header -->
