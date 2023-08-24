import * as fs from "fs";
import * as readline from "readline";
import * as path from "path";

const RULE_BOILERPLATE_FILE = "rule.boilerplate.ts";
const RULE_TESTS_BOILERPLATE_FILE = "ruleTests.boilerplate.ts";

const SCRIPT_DIR = path.dirname(process.argv[1]);
process.chdir(SCRIPT_DIR);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Choose a rule name (separated by dashes): ",
  (ruleName: string) => {
    const ruleBoilerplate = fs.readFileSync(RULE_BOILERPLATE_FILE, "utf-8");
    const ruleFileContent = ruleBoilerplate.replace(
      /RULE_NAME_PLACEHOLDER/g,
      ruleName,
    );
    const ruleFilePath = path.join("..", "lib", "rules", `${ruleName}.ts`);
    fs.writeFileSync(ruleFilePath, ruleFileContent);

    const ruleTestsTemplate = fs.readFileSync(
      RULE_TESTS_BOILERPLATE_FILE,
      "utf-8",
    );
    const ruleTestsFileContent = ruleTestsTemplate.replace(
      /RULE_NAME_PLACEHOLDER/g,
      ruleName,
    );
    const ruleTestsFilePath = path.join(
      "..",
      "tests",
      "rules",
      `${ruleName}.spec.ts`,
    );
    fs.writeFileSync(ruleTestsFilePath, ruleTestsFileContent);

    rl.close();
  },
);
