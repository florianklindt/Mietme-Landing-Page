import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";
export const LOCALE_COOKIE = "NEXT_LOCALE";

function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (locales as readonly string[]).includes(v);
}

export default getRequestConfig(async () => {
  const stored = cookies().get(LOCALE_COOKIE)?.value;
  const locale: Locale = isLocale(stored) ? stored : defaultLocale;

  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    return { locale, messages };
  } catch {
    notFound();
  }
});
