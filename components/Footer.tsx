import Image from "next/image";
import Link from "next/link";
import { LEGAL_LINKS, NAV, SITE, whatsappLink } from "@/lib/site";
import logoIvory from "@/public/brand/logo-ivory.png";
import Year from "./Year";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`on-dark ${styles.footer}`}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Link href="/#inicio" className={styles.logo} aria-label={`${SITE.name}, ir al inicio`}>
            <Image src={logoIvory} alt="" sizes="180px" />
          </Link>
          <p className={styles.slogan}>{SITE.slogan}</p>
        </div>

        <div className={styles.col}>
          <h2 className={styles.heading}>Sala de ventas</h2>
          <p>{SITE.salesRoom}</p>
          <p>
            <a href={SITE.phoneHref}>
              Tel. {SITE.phoneDisplay}
              <span className="visually-hidden"> (llamar)</span>
            </a>
          </p>
          <p>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              WhatsApp {SITE.phoneIntl}
              <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
            </a>
          </p>
        </div>

        <nav className={styles.col} aria-label="Secciones">
          <h2 className={styles.heading}>Navegación</h2>
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.col} aria-label="Legal">
          <h2 className={styles.heading}>Legal</h2>
          <ul>
            {LEGAL_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.disclaimer}>{SITE.renderDisclaimer} Las fotografías de paisaje son ilustrativas.</p>
        <p>
          © <Year /> {SITE.name} · {SITE.legalName} · NIT {SITE.nit}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
