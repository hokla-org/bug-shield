import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "../../lib/rules/mutation-decorator-return-type-mismatch";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("{RULE_NAME}", rule, {
  valid: [
    `
    class MyService {
      @Mutation(() => GivenType)
      async anyServiceMethod(
        deletePortalUsersFields: DeletePortalUsersDto,
      ): GivenType {
        doAnything();
        doAnythingElse();
        return objectOfTypeGivenType;
      }
    }
    `,
    `
    class MyService {
      @Mutation(() => Promise<PortalUser[]>)
      async deletePortalUsers(
        deletePortalUsersFields: DeletePortalUsersDto,
      ): Promise<PortalUser[]> {
        return this.portalUserService.deletePortalUsers(
          portalUser,
          deletePortalUsersFields,
        );
      }
    }
    `,
  ],
  invalid: [
    {
      code: `
      class MyService {
        @Mutation(() => GivenType1)
        async anyServiceMethod(
          deletePortalUsersFields: DeletePortalUsersDto,
        ): GivenType2 {
          doAnything();
          doAnythingElse();
          return objectOfTypeGivenType2; 
        }
      }
      `,
      errors: [{ messageId: "mutation-decorator-return-type-mismatch" }],
    },
    {
      code: `
      class MyService {
        @Mutation(() => Promise<PortalUser[]>)
        async deletePortalUsers(
          deletePortalUsersFields: DeletePortalUsersDto,
        ): Promise<number> {
          return this.portalUserService.deletePortalUsers(
            portalUser,
            deletePortalUsersFields,
          );
        }
      }
    `,
      errors: [{ messageId: "mutation-decorator-return-type-mismatch" }],
    },
  ],
});
