import fs from "fs";
import path from "path";

export const loadFile = (input: string, splitter = /\r?\n/): string[] =>
  fs.readFileSync(path.join(__dirname, input), "utf-8").split(splitter);
