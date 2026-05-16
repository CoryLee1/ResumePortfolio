import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReceiptResume from "./ReceiptResume.jsx";
import { DATA } from "./cvData.js";
import { withHttps } from "./withHttps.js";

document.documentElement.style.background = "#070707";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {});
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReceiptResume data={DATA} withHttps={withHttps} />
  </StrictMode>
);
