"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import idData from "./id.json";
import enData from "./en.json";

type Lang = "id" | "en";

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

const idCache = idData;
const enCache = enData;

function resolve(obj: any, path: string): any {
  const keys = path.split(".");
  let val = obj;
  for (const k of keys) {
    if (val == null || typeof val !== "object") return undefined;
    val = val[k];
  }
  return val;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "id" || saved === "en") {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "id" ? "en" : "id");
  }, [lang, setLang]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const dict = lang === "id" ? idCache : enCache;
      let val = resolve(dict, key);
      if (val == null) {
        const fallback = lang === "id" ? enCache : idCache;
        val = resolve(fallback, key);
      }
      if (typeof val !== "string") return key;
      if (!params) return val;
      return val.replace(/\{(\w+)\}/g, (_, k) =>
        params[k] != null ? String(params[k]) : `{${k}}`
      );
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
