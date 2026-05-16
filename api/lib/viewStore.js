const KEY = "cv:views:total";

async function upstash(command, ...args) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const res = await fetch(`${url}/${command}/${KEY}${args.length ? `/${args.join("/")}` : ""}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Upstash ${command} failed: ${res.status}`);
  return res.json();
}

function memoryCount() {
  if (!global.__cvViewCount) global.__cvViewCount = 0;
  return global.__cvViewCount;
}

export async function getViewCount() {
  try {
    const data = await upstash("get");
    if (data?.result != null) return Number(data.result) || 0;
  } catch (e) {
    console.warn("[views] get", e.message);
  }
  return memoryCount();
}

export async function incrementViewCount() {
  try {
    const data = await upstash("incr");
    if (data?.result != null) return Number(data.result);
  } catch (e) {
    console.warn("[views] incr", e.message);
  }
  global.__cvViewCount = memoryCount() + 1;
  return global.__cvViewCount;
}

export function viewsStorageMode() {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return "upstash";
  }
  return "memory";
}
