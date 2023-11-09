import path from "path";
import fs from "fs";
import { findFiles, findLines, scriptExecutionDir } from "./utils";
import { getExportText } from "./text-generation";
import {
  printDirCreationLog,
  printFileCreationLog,
  printLogo,
  printText,
  printError,
  printExportDetails,
} from "./log-helpers";

printLogo();

const fileExtForSearch = ["js", "jsx", "ts", "tsx", "css", "scss", "html"];

const fileSearchPattern = new RegExp(
  `[\\w-]+\\.(${fileExtForSearch.join("|")})\\b`
);
const excludePattern = /node_modules|.git|dist/;
const stringSearchPattern = /NOTE(\(\d+\))?(\[\d+\])?:/;
const outDirName = "docs";
const fileName = "notes.md";

const scriptExecutionDirBase = path.basename(scriptExecutionDir);
const outFileName = `${scriptExecutionDirBase}-${fileName}`;
const outDirLocation = path.join(scriptExecutionDir, outDirName);
const outFileLocation = path.join(outDirLocation, outFileName);

const files = findFiles({
  dir: scriptExecutionDir,
  filePattern: fileSearchPattern,
  excludePattern,
});

const foundNotes = findLines(files, stringSearchPattern);

if (foundNotes.length > 0) {
  if (!fs.existsSync(outDirLocation)) {
    fs.mkdirSync(outDirLocation);
    printDirCreationLog(outDirLocation);
  }

  fs.writeFile(
    outFileLocation,
    getExportText(foundNotes, scriptExecutionDirBase),
    (err) => {
      if (err) {
        printError(`An error occurred while creating ${outFileName} file`, err);
      } else {
        printFileCreationLog(outFileName, outDirLocation);
        printExportDetails(foundNotes);
      }
    }
  );
} else {
  printText("Notes not found! :(");
}
