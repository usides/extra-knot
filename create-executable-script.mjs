import fs from "fs";
import path from "path";
import process from "process";
import chalk from "chalk";

const scriptExecutionDir = process.cwd();

const filePath = path.join(scriptExecutionDir, "dist", "extra-knot.js");
const nodeShebang = "#!/usr/bin/env node\n";

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const updatedContent = nodeShebang + data;

  fs.writeFile(
    path.join(scriptExecutionDir, "dist", "extra-knot"),
    updatedContent,
    "utf8",
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(chalk.green.bold("Shell script created!"));
      process.exit(0);
    }
  );
});
