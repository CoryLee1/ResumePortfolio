const BASE =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "";

export async function apiFetch(path, options = {}) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.error || `Request failed (${res.status})`);
  }
  return json;
}

export function postTailor(body) {
  return apiFetch("/api/tailor", { method: "POST", body: JSON.stringify(body) });
}

export function postCompose(body) {
  return apiFetch("/api/compose", { method: "POST", body: JSON.stringify(body) });
}

export function getViews() {
  return apiFetch("/api/views");
}

export function recordView() {
  return apiFetch("/api/views", { method: "POST" });
}
