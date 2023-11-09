import chalk from "chalk";
import { IFoundEntity } from "./types";
import { pluralize } from "./utils";

const logo = `
    ______     __             __ __              __ 
   / ____/  __/ /__________ _/ //_/____  ____   / /_
  / __/ | |/_/ __/ ___/ __  / ,<  / __ \\/ __  \\/ __/
 / /____>  </ /_/ /  / /_/ / /| |/ / / / /_/ / /_  
/_____/_/|_|\\__/_/   \\__,_/_/ |_/_/ /_/\\____/\\__/  
                                                
`;

export const printLogo = () => {
  console.log(chalk.blue.bold(logo));
};

export const printFileCreationLog = (fileName: string, location: string) => {
  console.log(
    chalk.blue("File ") +
      chalk.green.bold(fileName) +
      chalk.blue(" was created at location ") +
      chalk.green.bold(location)
  );
};

export const printDirCreationLog = (location: string) => {
  console.log(chalk.blue("Created directory ") + chalk.green.bold(location));
};

export const printText = (text: string) => {
  console.log(chalk.blue(text));
};

export const printError = (text: string, err: NodeJS.ErrnoException) => {
  console.log(chalk.red(text), err);
};

export const printExportDetails = (notes: IFoundEntity[]) => {
  const notesSum = notes.reduce((sum, el) => sum + el.lines.length, 0);
  const sumText = `${notesSum} ${pluralize("note", notesSum)} found:\n`;

  const fileAndCountText = notes
    .map(({ file, lines }) => `${file} - ${lines.length}`)
    .join("\n");

  console.log(chalk.yellow(sumText) + chalk.blue(fileAndCountText));
};
