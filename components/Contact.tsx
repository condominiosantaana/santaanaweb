import { SITE, whatsappLink } from "@/lib/site";
import ContactForm from "./ContactForm";
import { MapPin, Phone, WhatsAppGlyph } from "./Icons";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contacto" className={`section on-dark ${styles.section}`} aria-labelledby="contacto-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow" data-reveal>
            Contacto
          </p>
          <h2 id="contacto-title" className="title-lg" data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
            Tu próxima historia puede comenzar aquí.
          </h2>
          <p className="lead" data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
            Conoce Santa ANA Condominio Campestre y recibe información sobre el proyecto y los lotes disponibles.
          </p>

          <ul className={styles.info} data-reveal style={{ "--reveal-delay": "220ms" } as React.CSSProperties}>
            <li>
              <MapPin width={22} height={22} />
              <div>
                <p className={styles.label}>Sala de ventas</p>
                <p>{SITE.salesRoom}</p>
              </div>
            </li>
            <li>
              <Phone width={22} height={22} />
              <div>
                <p className={styles.label}>Teléfono</p>
                <a href={SITE.phoneHref}>
                  {SITE.phoneDisplay}
                  <span className="visually-hidden"> (llamar)</span>
                </a>
              </div>
            </li>
            <li>
              <WhatsAppGlyph width={22} height={22} />
              <div>
                <p className={styles.label}>WhatsApp</p>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  Habla con nuestro equipo
                  <span className="visually-hidden"> (abre WhatsApp en una pestaña nueva)</span>
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div id="formulario" className={styles.formWrap} data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <h3 className="visually-hidden">Formulario de solicitud de información</h3>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
