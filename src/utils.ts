import fs from "fs";
import path from "path";
import process from "process";
import { type IFoundEntity, type IFoundLine } from "./types";

export const scriptExecutionDir = process.cwd();

export const findFiles = ({
  dir,
  filePattern,
  excludePattern,
}: {
  dir: string;
  filePattern: RegExp;
  excludePattern?: RegExp;
}) => {
  const files: string[] = [];
  const dirFiles: string[] = [];

  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);

    if (excludePattern && excludePattern.test(filePath)) return;

    if (filePattern.test(file)) {
      files.push(filePath);
    } else {
      if (fs.statSync(filePath).isDirectory()) {
        dirFiles.push(
          ...findFiles({ dir: filePath, filePattern, excludePattern })
        );
      }
    }
  });

  return [...files, ...dirFiles];
};

export const findLines = (files: string[], searchPattern: RegExp) => {
  return files.reduce((prev: IFoundEntity[], file) => {
    const content = fs.readFileSync(file, "utf8");
    if (!searchPattern.test(content)) return prev;

    const lines = content.split("\n");

    return [
      ...prev,
      {
        file: path.relative(scriptExecutionDir, file),
        fileExt: path.extname(file).slice(1),
        lines: lines.reduce((prev: IFoundLine[], line, lineNumber) => {
          if (searchPattern.test(line)) {
            const matchCodeSettings = line.match(/\[(\d+)\]/);

            const codeSettings =
              (matchCodeSettings && parseInt(matchCodeSettings[1])) ?? 5;

            return [
              ...prev,
              {
                lineNumber,
                line,
                codeBlock:
                  codeSettings === 0
                    ? null
                    : lines
                        .slice(lineNumber + 1, lineNumber + codeSettings + 1)
                        .join("\n"),
              },
            ];
          }

          return prev;
        }, []),
      },
    ];
  }, []);
};

export const pluralize = (word: string, count: number) => {
  return count === 1 ? word : word + "s";
};
