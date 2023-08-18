# Any statement calling a queryRunner should be followed by a try/catch/finally block that ensures that the connection pool is released in any case by calling queryRunner.release() (`@hokla/custom-rules/typeorm-query-runner-release`)

<!-- end auto-generated rule header -->
