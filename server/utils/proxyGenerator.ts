import { readFileSync } from "fs";

export const proxyGenerator = (path: string) => {
  const list = readFileSync(path).toString("utf-8");

  const lines = list.split("\n").filter((l) => l !== "");

  return lines.map((l, i) => ({
    url: l,
    usageCounter: 0,
    lastUsed: Date.now(),
    index: i,
  }));
};
