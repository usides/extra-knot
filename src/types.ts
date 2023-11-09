export interface IFoundEntity {
  file: string;
  fileExt: string;
  lines: IFoundLine[];
}

export interface IFoundLine {
  lineNumber: number;
  line: string;
  codeBlock: string | null;
}
