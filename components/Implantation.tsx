import { LOTS, whatsappLink } from "@/lib/site";
import Counter from "./Counter";
import { ArrowRight, Home, Plan, Store } from "./Icons";
import styles from "./Implantation.module.css";

const PLAN_MESSAGE =
  "Hola, quisiera recibir el plano de implantación de Santa ANA Condominio Campestre y la información de los lotes.";

export default function Implantation() {
  const { housing, commercial } = LOTS;
  return (
    <section id="implantacion" className={`section ${styles.section}`} aria-labelledby="implantacion-title">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            Implantación general
          </p>
          <h2 id="implantacion-title" className="title-lg" data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
            Tu espacio. Tu proyecto. Tu futuro.
          </h2>
          <p className="lead" data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
            Una propuesta campestre que integra lotes para vivienda y comercio en un entorno conectado con la
            naturaleza y la ciudad.
          </p>
        </header>

        <div className={styles.lots}>
          <article className={styles.lot} data-reveal aria-labelledby="lote-vivienda">
            <div className={styles.lotTop}>
              <span className={styles.icon}>
                <Home width={24} height={24} />
              </span>
              <p className={styles.count}>
                <Counter value={housing.count} />
              </p>
            </div>
            <h3 id="lote-vivienda" className={styles.lotTitle}>
              Lotes para <strong>vivienda</strong>
            </h3>
            <dl className={styles.range}>
              <div>
                <dt>Desde</dt>
                <dd>
                  {housing.from}&nbsp;m<sup>2</sup>
                </dd>
              </div>
              <div>
                <dt>Hasta</dt>
                <dd>
                  {housing.to}&nbsp;m<sup>2</sup>
                </dd>
              </div>
            </dl>
          </article>

          <article
            className={`${styles.lot} ${styles.lotDark}`}
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            aria-labelledby="lote-comercio"
          >
            <div className={styles.lotTop}>
              <span className={styles.icon}>
                <Store width={24} height={24} />
              </span>
              <p className={styles.count}>
                <Counter value={commercial.count} duration={1100} />
              </p>
            </div>
            <h3 id="lote-comercio" className={styles.lotTitle}>
              Lotes para <strong>comercio</strong>
            </h3>
            <dl className={styles.range}>
              <div>
                <dt>Desde</dt>
                <dd>
                  {commercial.from}&nbsp;m<sup>2</sup>
                </dd>
              </div>
              <div>
                <dt>Hasta</dt>
                <dd>
                  {commercial.to}&nbsp;m<sup>2</sup>
                </dd>
              </div>
            </dl>
          </article>
        </div>

        <div className={styles.plan} data-reveal>
          <span className={styles.planIcon}>
            <Plan width={28} height={28} />
          </span>
          <div className={styles.planText}>
            <h3 className="title-md">Plano de implantación</h3>
            <p>
              Solicita el plano de implantación del proyecto a nuestro equipo comercial por WhatsApp o
              consúltalo en la sala de ventas.
            </p>
          </div>
          <div className="btn-row">
            <a href={whatsappLink(PLAN_MESSAGE)} className="btn" target="_blank" rel="noopener noreferrer">
              Solicitar el plano
              <ArrowRight />
              <span className="visually-hidden">(abre WhatsApp en una pestaña nueva)</span>
            </a>
            <a href="#contacto" className="btn btn--ghost">
              Solicita información
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
