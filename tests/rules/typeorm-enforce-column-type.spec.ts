import { ESLintUtils } from "@typescript-eslint/utils";

import rule from "../../lib/rules/typeorm-enforce-column-type";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("{RULE_NAME}", rule, {
  valid: [
    `
    @Entity()
    class MyDbEntity {
      @Column({ type: 'string' })
      str: string;
      @Column({ type: 'number' })
      num: number;
      @Column({ type: 'boolean' })
      bool: boolean;
      @Column({ type: 'timestamp' })
      date: Date;
      @Column({ type: 'timestamp' })
      dateStr: string;
      @Column({ type: 'varchar', nullable: true })
      strNullable: string | null;
      @Column({ type: 'int', nullable: true })
      numNullable: number | null;
      @Column({ type: 'bool', nullable: true })
      boolNullable: boolean | null;
      @Column({ type: 'timestamp', nullable: true })
      dateNullable: Date | null;
      @Column({ type: 'string' })
      strLiteral: 'one' | 'two';
      @Column({ type: 'string' })
      strLiteral: 'one' | 'two';
      @Column({ type: 'number' })
      numLiteral: 1 | 2;
      @Column({ type: 'boolean' })
      numLiteral: true;
    }
    `,
    `
    export class WithNoEntityDecorator {
      @Column({ type: 'string' })
      wrongProperty: number;
    }
    `,
  ],
  invalid: [
    {
      code: `
      @Entity()
      class MyDbEntity {
        @Column()
        nb: number;
      }`,
      errors: [{ messageId: "typeorm-column-type-missing" }],
    },
    {
      code: `
      @Entity()
      class MyDbEntity {
        @Column({type: "varchar"})
        str;
      }`,
      errors: [{ messageId: "typeorm-column-type-missing" }],
    },
    {
      code: `
      @Entity()
      class MyDbEntity {
        @Column({ type: 'string' })
        str: string | null;
      }`,
      errors: [{ messageId: "typeorm-column-type-mismatch" }],
    },
    {
      code: `
      @Entity()
      class MyDbEntity {
        @Column({ type: 'string', nullable: true })
        str!: string ;
      }`,
      errors: [{ messageId: "typeorm-column-type-mismatch" }],
    },
    {
      code: `
      @Entity()
      class MyDbEntity {
      @Column({ type: 'string', nullable: true })
      str: 'one' | 'true';
      }`,
      errors: [{ messageId: "typeorm-column-type-mismatch" }],
    },
  ],
});
