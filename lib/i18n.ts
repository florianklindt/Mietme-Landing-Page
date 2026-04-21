import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export default getRequestConfig(async () => {
  const locale = defaultLocale;

  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    return { locale, messages };
  } catch {
    notFound();
  }
});
