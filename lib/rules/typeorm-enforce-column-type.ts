import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from "@typescript-eslint/utils";
import {
  findDecoratorArguments,
  findParentClass,
} from "../utils/treeTraversal";
import {
  ColumnType,
  convertArgumentToColumnType,
  convertTypeToColumnType,
  isTypesEqual,
  typeToString,
} from "../utils/typeorm/columnTypes";

type MessageIds =
  | "typeorm-column-type-missing"
  | "typeorm-column-type-mismatch";

type Options = [];

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://hokla.com/rule/${name}`,
);

const rule = createRule<Options, MessageIds>({
  name: "typeorm-enforce-column-type",
  defaultOptions: [],
  create(context) {
    function reportMissingTypeOrmColumnType(node: TSESTree.Node) {
      return context.report({
        messageId: "typeorm-column-type-missing",
        node: node,
      });
    }

    function reportTypesMismatch(
      propertyDefinition: TSESTree.PropertyDefinition,
      typeormSqlType: ColumnType,
      typescriptType: ColumnType,
      typeAnnotation: TSESTree.TSTypeAnnotation,
    ) {
      const fixReplace = typeToString(typeormSqlType, {
        literal: typescriptType.literal,
      });

      const propertyName =
        propertyDefinition.key?.type === AST_NODE_TYPES.Identifier
          ? propertyDefinition.key.name
          : "property";
      const classObject = findParentClass(propertyDefinition);
      const className = classObject?.id ? ` in ${classObject.id.name}` : "";
      const expectedValue = fixReplace ? ` (expected type: ${fixReplace})` : "";

      // Report the error
      return context.report({
        messageId: "typeorm-column-type-mismatch",
        data: {
          className,
          propertyName,
          expectedValue,
        },
        suggest: fixReplace
          ? [
              {
                messageId: "typeorm-column-type-mismatch",
                fix: (fixer) =>
                  fixer.replaceText(typeAnnotation, `: ${fixReplace}`),
                data: {
                  propertyName,
                  expectedValue: fixReplace,
                },
              },
            ]
          : undefined,
        loc: propertyDefinition.loc,
      });
    }

    return {
      ['ClassDeclaration:has(Decorator[expression.callee.name="Entity"]) PropertyDefinition'](
        propertyDefinition: TSESTree.PropertyDefinition,
      ) {
        const decorators = propertyDefinition.decorators;
        const columnArguments = findDecoratorArguments(decorators, "Column");
        const typeormSqlType = convertArgumentToColumnType(
          columnArguments?.[0],
        );
        if (typeormSqlType === undefined) {
          return reportMissingTypeOrmColumnType(propertyDefinition);
        }

        const typeAnnotationNode = propertyDefinition?.typeAnnotation;
        const typescriptType = convertTypeToColumnType(
          typeAnnotationNode?.typeAnnotation,
        );
        if (typeAnnotationNode === undefined || typescriptType === undefined) {
          return reportMissingTypeOrmColumnType(propertyDefinition);
        }

        if (!isTypesEqual(typeormSqlType, typescriptType)) {
          return reportTypesMismatch(
            propertyDefinition,
            typeormSqlType,
            typescriptType,
            typeAnnotationNode,
          );
        }

        return;
      },
    };
  },
  meta: {
    docs: {
      recommended: "error",
      description:
        "The SQL column type in a TypeORM entity column must be specified to ensure the control of types in the database match your needs.",
    },
    hasSuggestions: true,
    messages: {
      "typeorm-column-type-missing": "Missing type in column definition : ",
      "typeorm-column-type-mismatch":
        "SQL and Typescript types mismatch in column definition.",
    },
    type: "problem",
    schema: [],
  },
});

export default { ...rule, configs: ["TODO"] };
