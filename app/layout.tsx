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
    default: "mietme — Miete, was du brauchst, wann du es brauchst.",
    template: "%s · mietme",
  },
  description:
    "mietme ist die Peer-to-Peer Verleihplattform für deine Nachbarschaft. Leih dir Werkzeug, Sport, Kamera, Camping und mehr — lokal, verifiziert und geschützt.",
  keywords: [
    "mieten",
    "verleihen",
    "peer to peer",
    "nachbarschaft",
    "sharing",
    "werkzeug mieten",
    "kamera leihen",
    "mietme",
  ],
  authors: [{ name: "mietme" }],
  openGraph: {
    title: "mietme — Miete, was du brauchst, wann du es brauchst.",
    description:
      "Die Peer-to-Peer Verleihplattform für deine Nachbarschaft. Lokal, verifiziert, geschützt.",
    url: "https://mietme.app",
    siteName: "mietme",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mietme — Miete, was du brauchst, wann du es brauchst.",
    description:
      "Die Peer-to-Peer Verleihplattform für deine Nachbarschaft.",
  },
  robots: {
    index: true,
    follow: true,
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
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LenisProvider>{children}</LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
