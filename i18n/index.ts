import type { I18nTranslations } from "@app-types/types";
import { PUBLIC_R2_PUBLIC_URL } from "astro:env/client";
import english from "./en.json";
import spanish from "./es.json";

const Languages = {
  ENGLISH: "en",
  SPANISH: "es",
} as const;

const REMOTE_TIMEOUT_MS = 2000;

const getLocal = (locale: string): I18nTranslations =>
  (locale === Languages.ENGLISH ? english : spanish) as I18nTranslations;

const mergeContent = <T>(local: T, remote: unknown): T => {
  if (remote === undefined || remote === null) return local;

  if (Array.isArray(local)) {
    if (!Array.isArray(remote)) return local;
    const template = local[0];
    return remote.map((item) => mergeContent(template, item)) as T;
  }

  if (typeof local === "object" && local !== null) {
    if (typeof remote !== "object" || Array.isArray(remote)) return local;
    const result: Record<string, unknown> = {};
    const remoteObj = remote as Record<string, unknown>;
    for (const [key, localValue] of Object.entries(local)) {
      result[key] = mergeContent(localValue, remoteObj[key]);
    }
    if (isDynamicRecord(local)) {
      const template = Object.values(local)[0];
      for (const [key, value] of Object.entries(remoteObj)) {
        if (!(key in result)) result[key] = mergeContent(template, value);
      }
    }
    return result as T;
  }

  return (typeof remote === typeof local ? remote : local) as T;
};

const isDynamicRecord = (obj: object) => {
  const values = Object.values(obj);
  if (values.length < 2 || values.some((v) => typeof v !== "object" || v === null)) return false;
  const keys = Object.keys(values[0]).join();
  return values.every((v) => Object.keys(v).join() === keys);
};

const fetchRemote = async (locale: string): Promise<unknown> => {
  if (!PUBLIC_R2_PUBLIC_URL) return null;
  try {
    const url = `${PUBLIC_R2_PUBLIC_URL.replace(/\/$/, "")}/lang/${locale}.json`;
    const response = await fetch(url, { signal: AbortSignal.timeout(REMOTE_TIMEOUT_MS) });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.warn(`[i18n] No se pudo leer ${locale}.json de R2, se usa el local:`, error);
    return null;
  }
};

export const getI18N = async ({
  currentLocale = "es",
}: {
  currentLocale: string | undefined;
}): Promise<I18nTranslations> => {
  const locale = currentLocale === Languages.ENGLISH ? Languages.ENGLISH : Languages.SPANISH;
  const local = getLocal(locale);
  const remote = await fetchRemote(locale);
  return mergeContent(local, remote);
};
