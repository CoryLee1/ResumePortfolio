import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const DIR = path.dirname(fileURLToPath(import.meta.url));

const cache = new Map();

/** @param {string} name filename without extension */
export function loadPrompt(name) {
  if (cache.has(name)) return cache.get(name);
  const file = path.join(DIR, `${name}.md`);
  const text = fs.readFileSync(file, "utf8").trim();
  cache.set(name, text);
  return text;
}

export function clearPromptCache() {
  cache.clear();
}
