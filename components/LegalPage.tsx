import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import { LEGAL_LINKS } from "@/lib/site";
import styles from "./LegalPage.module.css";

type Props = {
  title: string;
  updated: string;
  current: string;
  children: React.ReactNode;
};

/** Marca visible de un dato jurídico que el responsable del proyecto debe completar antes de publicar. */
export function Pending({ children }: { children: React.ReactNode }) {
  return (
    <mark className={styles.pending}>
      <span className="visually-hidden">Dato pendiente: </span>[{children}]
    </mark>
  );
}

export default function LegalPage({ title, updated, current, children }: Props) {
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Header variant="solid" />
      <main id="contenido" className={styles.main}>
        <div className={`container ${styles.layout}`}>
          <article className={styles.article}>
            <p className="eyebrow">Información legal</p>
            <h1 className="title-lg">{title}</h1>
            <p className={styles.updated}>Última actualización: {updated}</p>
            <div className={styles.body}>{children}</div>
          </article>

          <aside className={styles.aside} aria-label="Otros documentos legales">
            <p className={styles.asideTitle}>Documentos</p>
            <ul>
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={item.href === current ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/#contacto" className="btn btn--ghost">
              Volver al sitio
            </Link>
          </aside>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
