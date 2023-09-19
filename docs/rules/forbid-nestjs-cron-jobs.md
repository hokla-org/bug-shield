# Don't use NestJS cron jobs, as they can entail performance problems for your server, as well as concurrency issues (your job might run several times in parallel). Instead, define a CLI command to run your job in your NestJS project (for example with nest-commander) and call it from a cron job defined at the infrastructure level (e.g. in your Kubernetes cluster, or on the platform that hosts your server: Scalingo, Vercel…) (`@hokla/bug-shield/forbid-nestjs-cron-jobs`)

💼 This rule is enabled in the ☑️ `recommended` [config](https://github.com/hokla-org/eslint-plugin-bug-shield).

<!-- end auto-generated rule header -->
