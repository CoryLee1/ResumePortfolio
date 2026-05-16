const STORAGE_KEY = "cv-versions-v1";
const MAX_VERSIONS = 24;

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_VERSIONS)));
}

export function listVersions() {
  return readAll().sort((a, b) => b.createdAt - a.createdAt);
}

export function saveVersion({ name, data, meta = {} }) {
  const list = readAll();
  const entry = {
    id: `v_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: name?.trim() || `Version ${list.length + 1}`,
    createdAt: Date.now(),
    data: structuredClone(data),
    meta,
  };
  writeAll([entry, ...list]);
  return entry;
}

export function loadVersion(id) {
  return readAll().find((v) => v.id === id) ?? null;
}

export function deleteVersion(id) {
  writeAll(readAll().filter((v) => v.id !== id));
}

export function renameVersion(id, name) {
  const list = readAll();
  const i = list.findIndex((v) => v.id === id);
  if (i === -1) return null;
  list[i] = { ...list[i], name: name.trim() || list[i].name };
  writeAll(list);
  return list[i];
}
