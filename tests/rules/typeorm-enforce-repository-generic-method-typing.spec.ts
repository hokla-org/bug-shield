import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "../../lib/rules/typeorm-enforce-repository-generic-method-typing";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("{RULE_NAME}", rule, {
  valid: [
    `
    this.PortalUserRepository.save<PortalUser>({id: 'blabla'});
    `,
    `
    repository.save<AnyType>({});
    `,
    `
    this.PortalUserRepository.softRemove<PortalUser>({id: 'blabla'});
    `,
    `
    repository.softRemove<AnyType>({});
    `,
    `
    this.PortalUserRepository.recover<PortalUser>({id: 'blabla'});
    `,
    `
    repository.recover<AnyType>({});
    `,
    `
    this.is.a.very.long.expression.repository.save<AnyType>({});
    `,
  ],
  invalid: [
    {
      code: `
      this.PortalUserRepository.save({id: 'blabla'});
      `,
      errors: [{ messageId: "missing-repository-generic-method-type" }],
    },
    {
      code: `
      repository.save({});
      `,
      errors: [{ messageId: "missing-repository-generic-method-type" }],
    },
    {
      code: `
      this.PortalUserRepository.softRemove({id: 'blabla'});
      `,
      errors: [{ messageId: "missing-repository-generic-method-type" }],
    },
    {
      code: `
      repository.softRemove({});
      `,
      errors: [{ messageId: "missing-repository-generic-method-type" }],
    },
    {
      code: `
      this.PortalUserRepository.recover({id: 'blabla'});
      `,
      errors: [{ messageId: "missing-repository-generic-method-type" }],
    },
    {
      code: `
      repository.recover({});
      `,
      errors: [{ messageId: "missing-repository-generic-method-type" }],
    },
    {
      code: `
      this.is.a.very.long.expression.repository.save({});
      `,
      errors: [{ messageId: "missing-repository-generic-method-type" }],
    },
  ],
});
