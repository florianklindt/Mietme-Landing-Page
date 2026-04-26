import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { LenisProvider } from "@/components/motion/lenis-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mietme.app"),
  title: {
    default: "mietme — Berlins einfachste Verleihplattform",
    template: "%s · mietme",
  },
  description:
    "Werkzeug, Camping Equipment und Haushaltsgeräte aus deiner Berliner Nachbarschaft mieten. Verifizierte Profile, Schadensschutz und persönliche Übergabe.",
  applicationName: "mietme",
  keywords: [
    "mieten Berlin",
    "verleihen Berlin",
    "Werkzeug mieten Berlin",
    "Bohrer mieten Berlin",
    "Hochdruckreiniger leihen Berlin",
    "Camping Equipment leihen Berlin",
    "Verleihplattform Berlin",
    "Peer to Peer Verleih",
    "Nachbarschaft Berlin",
    "Kiez",
    "mietme",
  ],
  authors: [
    { name: "Felix Rauh" },
    { name: "Florian Klindt" },
    { name: "Niels Schwarz" },
  ],
  creator: "mietme",
  publisher: "mietme",
  alternates: {
    canonical: "/",
    languages: {
      "de-DE": "/",
      "en-US": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "mietme — Berlins einfachste Verleihplattform",
    description:
      "Werkzeug, Camping Equipment und Haushaltsgeräte aus deiner Berliner Nachbarschaft mieten. Verifizierte Profile, Schadensschutz und persönliche Übergabe.",
    url: "https://mietme.app",
    siteName: "mietme",
    locale: "de_DE",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mietme — Berlins einfachste Verleihplattform",
    description:
      "Werkzeug, Camping Equipment und Haushaltsgeräte aus deiner Berliner Nachbarschaft mieten.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "marketplace",
  other: {
    "geo.region": "DE-BE",
    "geo.placename": "Berlin",
    "geo.position": "52.520008;13.404954",
    ICBM: "52.520008, 13.404954",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#FFFFFF" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "mietme",
  url: "https://mietme.app",
  logo: "https://mietme.app/opengraph-image",
  description:
    "Berlins einfachste Verleihplattform. Werkzeug, Camping Equipment und Haushaltsgeräte aus der Nachbarschaft mieten.",
  founder: [
    { "@type": "Person", name: "Felix Rauh" },
    { "@type": "Person", name: "Florian Klindt" },
    { "@type": "Person", name: "Niels Schwarz" },
  ],
  foundingDate: "2024",
  foundingLocation: {
    "@type": "Place",
    name: "HTW Berlin",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Berlin",
      addressRegion: "Berlin",
      addressCountry: "DE",
    },
  },
  areaServed: { "@type": "City", name: "Berlin" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "hello@mietme.app",
    availableLanguage: ["de", "en"],
  },
  sameAs: [
    "https://www.instagram.com/mietme.app",
    "https://www.linkedin.com/company/mietme",
  ],
};

const organizationJsonLdString = JSON.stringify(organizationJsonLd).replace(
  /</g,
  "\\u003c"
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, locale] = await Promise.all([getMessages(), getLocale()]);
  const skipLabel = locale === "en" ? "Skip to content" : "Zum Inhalt springen";

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans text-step-0 text-ink-body bg-bg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          {skipLabel}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLdString }}
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LenisProvider>{children}</LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
