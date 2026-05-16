export function withHttps(url) {
  if (!url || typeof url !== "string") return "";
  const u = url.trim();
  if (/^https?:\/\//i.test(u)) return u;
  return `https://${u}`;
}
