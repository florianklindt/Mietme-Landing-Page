import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SiteNav } from "@/components/nav/site-nav";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Categories } from "@/components/sections/categories";
import { SplitBlock } from "@/components/sections/split-block";
import { Sustainability } from "@/components/sections/sustainability";
import { Trust } from "@/components/sections/trust";
import { TrustAnchors } from "@/components/sections/trust-anchors";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { SiteFooter } from "@/components/sections/site-footer";
import { JsonLd } from "@/components/seo/json-ld";

const LANDING_TITLE = "Mieten in Berlin. So einfach wie Kaufen. | mietme";
const LANDING_DESCRIPTION =
  "Werkzeug, Camping Equipment und Haushaltsgeräte aus deiner Berliner Nachbarschaft mieten. Verifizierte Profile, Schadensschutz und persönliche Übergabe.";

export const metadata: Metadata = {
  title: { absolute: LANDING_TITLE },
  description: LANDING_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: LANDING_TITLE,
    description: LANDING_DESCRIPTION,
    url: "https://mietme.app",
    siteName: "mietme",
    locale: "de_DE",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mieten in Berlin. So einfach wie Kaufen.",
    description:
      "Werkzeug, Camping Equipment und Haushaltsgeräte aus deiner Berliner Nachbarschaft mieten.",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://mietme.app/#localbusiness",
  name: "mietme",
  url: "https://mietme.app",
  image: "https://mietme.app/opengraph-image",
  description:
    "Peer-to-Peer Verleihplattform für Berlin. Werkzeug, Camping Equipment und Haushaltsgeräte aus der Nachbarschaft.",
  priceRange: "€",
  areaServed: { "@type": "City", name: "Berlin" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Berlin",
    addressRegion: "Berlin",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 52.520008,
    longitude: 13.404954,
  },
  founder: [
    { "@type": "Person", name: "Felix Rauh" },
    { "@type": "Person", name: "Florian Klindt" },
    { "@type": "Person", name: "Niels Schwarz" },
  ],
  foundingDate: "2022-10",
  foundingLocation: {
    "@type": "Place",
    name: "HTW Berlin",
  },
  sameAs: [
    "https://www.instagram.com/mietme.app",
    "https://www.linkedin.com/company/mietme",
  ],
};

export default async function Home() {
  const t = await getTranslations("faq");
  const faqItems = t.raw("items") as { q: string; a: string }[];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Categories />
        <SplitBlock
          id="mieter"
          tone="light"
          imageSide="left"
          nsKey="renters"
          ctaHref="https://go.mietme.app"
          imageSrc="/images/for-renters.jpg"
          imageAlt="Wanderin mit Rucksack und geliehener Kamera vor Bergsee."
        />
        <SplitBlock
          id="vermieter"
          tone="subtle"
          imageSide="right"
          imageMode="mockup"
          nsKey="hosts"
          ctaHref="https://go.mietme.app"
          imageSrc="/images/hosts-mockup.png"
          imageAlt="mietme App auf dem Smartphone: Inserat für einen Bosch Werkzeugkoffer in Berlin mit Preis, Kaution und Beschreibung."
        />
        <Sustainability />
        <Trust />
        <TrustAnchors />
        <AboutTeaser />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <JsonLd data={localBusinessJsonLd} />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
