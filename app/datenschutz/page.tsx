import type { Metadata } from "next";
import { SiteNav } from "@/components/nav/site-nav";
import { SiteFooter } from "@/components/sections/site-footer";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten bei mietme.",
  alternates: { canonical: "https://mietme.app/datenschutz" },
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="bg-bg text-ink-body">
        <section className="relative w-full py-section-y">
          <div className="container-px mx-auto max-w-[760px]">
            <p className="font-mono text-[12px] uppercase tracking-caps text-ink-muted">
              Rechtliches
            </p>
            <h1 className="mt-4 text-section">Datenschutzerklärung</h1>
            <p className="mt-6 max-w-[60ch] text-[16px] leading-[1.55] text-ink-muted md:text-step-1">
              Wir nehmen den Schutz deiner personenbezogenen Daten sehr ernst.
              Im Folgenden informieren wir dich über die Verarbeitung deiner
              Daten bei der Nutzung von mietme.
            </p>

            <div className="mt-14 space-y-12 text-[16px] leading-[1.65] md:mt-20">
              <Block title="1. Verantwortlicher">
                <p>
                  Verantwortlich für die Datenverarbeitung auf dieser Website
                  im Sinne der Datenschutz-Grundverordnung (DSGVO) sind:
                </p>
                <p>Florian Klindt, Felix Rauh, Niels Schwarz — mietme (GbR)</p>
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

              <Block title="2. Erhebung allgemeiner Informationen beim Besuch unserer Website">
                <p>
                  Wenn du auf unsere Website zugreifst, werden automatisch
                  Informationen allgemeiner Natur erfasst. Diese Informationen
                  (Server-Logfiles) beinhalten etwa die Art des Webbrowsers,
                  das verwendete Betriebssystem, den Domainnamen deines
                  Internet-Service-Providers, deine IP-Adresse und Ähnliches.
                </p>
                <p>
                  Sie werden verarbeitet, um die einwandfreie Darstellung und
                  Stabilität unserer Seite zu gewährleisten. Rechtsgrundlage
                  ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
                </p>
              </Block>

              <Block title="3. Kontaktaufnahme">
                <p>
                  Nimmst du per E-Mail Kontakt mit uns auf, verarbeiten wir
                  deine Angaben zum Zwecke der Bearbeitung deiner Anfrage auf
                  Grundlage von Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO. Deine
                  Daten werden nach abschließender Bearbeitung gelöscht,
                  sofern keine gesetzlichen Aufbewahrungspflichten entgegen­
                  stehen.
                </p>
              </Block>

              <Block title="4. Cookies">
                <p>
                  Unsere Website verwendet aktuell ausschließlich technisch
                  notwendige Cookies bzw. Speichermechanismen, die für den
                  Betrieb der Seite erforderlich sind (z. B. Spracheinstellung).
                  Eine darüber hinausgehende Analyse oder Nachverfolgung findet
                  derzeit nicht statt.
                </p>
              </Block>

              <Block title="5. Hosting">
                <p>
                  Diese Website wird bei einem externen Dienstleister gehostet.
                  Die personenbezogenen Daten, die auf dieser Website erfasst
                  werden, werden auf den Servern des Hosters gespeichert. Die
                  Verarbeitung erfolgt zur Erfüllung unserer vorvertraglichen
                  und vertraglichen Verpflichtungen gegenüber unseren Nutzern
                  (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren,
                  schnellen und effizienten Bereitstellung unseres Angebots
                  (Art. 6 Abs. 1 lit. f DSGVO).
                </p>
              </Block>

              <Block title="6. Deine Rechte">
                <p>Dir stehen nach der DSGVO folgende Rechte zu:</p>
                <ul className="list-disc space-y-1 pl-5 marker:text-ink-muted">
                  <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                  <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                  <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                  <li>
                    Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)
                  </li>
                  <li>
                    Recht auf Datenübertragbarkeit (Art. 20 DSGVO)
                  </li>
                  <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
                  <li>
                    Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77
                    DSGVO)
                  </li>
                </ul>
                <p>
                  Zur Ausübung deiner Rechte genügt eine formlose Nachricht an
                  die oben genannte E-Mail-Adresse.
                </p>
              </Block>

              <Block title="7. Speicherdauer">
                <p>
                  Wir verarbeiten und speichern personenbezogene Daten nur für
                  den Zeitraum, der zur Erreichung des Speicherzwecks
                  erforderlich ist oder sofern dies gesetzlich vorgesehen
                  wurde. Nach Fortfall des Zwecks bzw. nach Ablauf der Frist
                  werden die Daten routinemäßig gelöscht.
                </p>
              </Block>

              <Block title="8. Änderungen dieser Datenschutzerklärung">
                <p>
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen,
                  damit sie stets den aktuellen rechtlichen Anforderungen
                  entspricht oder um Änderungen unserer Leistungen in der
                  Datenschutzerklärung umzusetzen.
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
