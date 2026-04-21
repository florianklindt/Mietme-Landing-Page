import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { SiteNav } from "@/components/nav/site-nav";
import { AboutHero } from "@/components/sections/about-hero";
import { AboutIdea } from "@/components/sections/about-idea";
import { AboutTeamImage } from "@/components/sections/about-team-image";
import { AboutCta } from "@/components/sections/about-cta";
import { SiteFooter } from "@/components/sections/site-footer";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "about.meta" });
  const title = t("title");
  const description = t("description");
  const url = "https://mietme.app/ueber-uns";
  const ogLocale = locale === "en" ? "en_US" : "de_DE";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · mietme`,
      description,
      url,
      siteName: "mietme",
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · mietme`,
      description,
    },
  };
}

export default function UeberUnsPage() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <AboutHero />
        <AboutIdea />
        <AboutTeamImage />
        <AboutCta />
      </main>
      <SiteFooter />
    </>
  );
}
