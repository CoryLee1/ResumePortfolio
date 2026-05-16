import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { messages } from "./messages.js";

const I18nContext = createContext(null);
const STORAGE_KEY = "cv-locale-v1";

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    if (typeof localStorage === "undefined") return "zh";
    return localStorage.getItem(STORAGE_KEY) || "zh";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const setLocale = useCallback((l) => {
    if (messages[l]) setLocaleState(l);
  }, []);

  const t = useCallback(
    (key) => messages[locale]?.[key] ?? messages.en[key] ?? key,
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
