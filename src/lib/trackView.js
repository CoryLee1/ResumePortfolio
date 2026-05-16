import { getViews, recordView } from "./api.js";

const SESSION_KEY = "cv-view-recorded-v1";

export async function trackResumeView() {
  if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_KEY)) {
    return getViews().catch(() => ({ count: null }));
  }
  try {
    const result = await recordView();
    sessionStorage.setItem(SESSION_KEY, "1");
    return result;
  } catch {
    return { count: null, storage: "unavailable" };
  }
}

export async function fetchViewCount() {
  try {
    return await getViews();
  } catch {
    return { count: null };
  }
}
