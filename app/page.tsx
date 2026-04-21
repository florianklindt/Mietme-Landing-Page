import { SiteNav } from "@/components/nav/site-nav";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Categories } from "@/components/sections/categories";
import { SplitBlock } from "@/components/sections/split-block";
import { Sustainability } from "@/components/sections/sustainability";
import { Trust } from "@/components/sections/trust";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
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
          imageAlt="Wanderin mit Rucksack und Kamera vor Bergsee und Dolomiten-Panorama."
        />
        <SplitBlock
          id="vermieter"
          tone="subtle"
          imageSide="right"
          imageMode="mockup"
          nsKey="hosts"
          ctaHref="https://go.mietme.app"
          imageSrc="/images/hosts-mockup.png"
          imageAlt="mietme App: Inserat für einen Bosch Werkzeugkoffer mit Preisen und Beschreibung."
        />
        <Sustainability />
        <Trust />
        <AboutTeaser />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
