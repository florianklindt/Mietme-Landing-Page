import type { Metadata } from "next";
import { SiteNav } from "@/components/nav/site-nav";
import { SiteFooter } from "@/components/sections/site-footer";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung von mietme.",
  alternates: { canonical: "https://mietme.app/impressum" },
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="bg-bg text-ink-body">
        <section className="relative w-full py-section-y">
          <div className="container-px mx-auto max-w-[760px]">
            <p className="font-mono text-[12px] uppercase tracking-caps text-ink-muted">
              Rechtliches
            </p>
            <h1 className="mt-4 text-section">Impressum</h1>
            <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.55] text-ink-muted md:text-step-1">
              Angaben gemäß § 5 TMG.
            </p>

            <div className="mt-14 space-y-12 text-[16px] leading-[1.65] md:mt-20">
              <Block title="Anbieter">
                <p>mietme</p>
                <ul className="mt-2 list-disc pl-5 marker:text-ink-muted">
                  <li>Florian Klindt</li>
                  <li>Felix Rauh</li>
                  <li>Niels Schwarz</li>
                </ul>
              </Block>

              <Block title="Kontakt">
                <p>
                  E-Mail:{" "}
                  <a
                    href="mailto:hello@mietme.app"
                    className="link-underline text-ink hover:text-accent"
                  >
                    hello@mietme.app
                  </a>
                </p>
              </Block>

              <Block title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
                <p>Florian Klindt, Felix Rauh, Niels Schwarz</p>
                <p>Anschrift wie oben.</p>
              </Block>

              <Block title="Streitschlichtung">
                <p>
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit:{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-ink hover:text-accent"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>
                  . Unsere E-Mail-Adresse findest du oben im Impressum.
                </p>
                <p>
                  Wir sind nicht bereit oder verpflichtet, an
                  Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </Block>

              <Block title="Haftung für Inhalte">
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
                  Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                  verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                  gespeicherte fremde Informationen zu überwachen oder nach
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                  hinweisen.
                </p>
                <p>
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                  Informationen nach den allgemeinen Gesetzen bleiben hiervon
                  unberührt. Eine diesbezügliche Haftung ist jedoch erst ab
                  dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                  möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen
                  werden wir diese Inhalte umgehend entfernen.
                </p>
              </Block>

              <Block title="Haftung für Links">
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf
                  deren Inhalte wir keinen Einfluss haben. Deshalb können wir
                  für diese fremden Inhalte auch keine Gewähr übernehmen. Für
                  die Inhalte der verlinkten Seiten ist stets der jeweilige
                  Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </Block>

              <Block title="Urheberrecht">
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke
                  auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                  der schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers.
                </p>
              </Block>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-mono text-[12px] uppercase tracking-caps text-ink-muted">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-ink-body">{children}</div>
    </div>
  );
}
