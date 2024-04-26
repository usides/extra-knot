import { IFoundEntity, IFoundLine } from "./types";

const modifyNoteLine = (line: string) => {
  const matchNumber = line.match(/\((\d+)\)/);
  const noteNumber = matchNumber ? String(parseInt(matchNumber[1])) : "";

  const text = line.split(
    /NOTE\(\d+\):\s*|NOTE\(\d+\)\[\d+\]:\s*|NOTE:\s*|NOTE\[\d+\]:\s*|\s*\*\/}|\s*-->|\s*\*\//
  )[1];

  const isHeading = text.startsWith("#");

  return `${isHeading ? "" : "-"} ${
    noteNumber ? `(${noteNumber}) ` : ""
  }${text}`;
};

const getLineAndBlockText = (lines: IFoundLine[], fileExt: string) =>
  lines
    .map(
      ({ line, codeBlock }) =>
        `${modifyNoteLine(line)}${
          codeBlock ? `\n\n\`\`\`${fileExt}\n${codeBlock}\n\`\`\`` : ""
        }`
    )
    .join("\n\n");

const getFileNotesText = (notes: IFoundEntity[]) =>
  notes
    .map(
      ({ file, fileExt, lines }) =>
        `## ${file}\n<!-- [[${file}]] -->\n\n${getLineAndBlockText(
          lines,
          fileExt
        )}\n`
    )
    .join("\n");

export const getExportText = (notes: IFoundEntity[], currentDir: string) => `
# NOTES for "${currentDir}"

${getFileNotesText(notes)}
`;
