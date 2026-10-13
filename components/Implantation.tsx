import { PLANS } from "@/lib/images";
import { LOTS, whatsappLink } from "@/lib/site";
import Counter from "./Counter";
import { ArrowRight, Home, Leaf, Store } from "./Icons";
import ImplantationVideo from "./ImplantationVideo";
import PlanViewer from "./PlanViewer";
import styles from "./Implantation.module.css";

const PLAN_MESSAGE =
  "Hola, quisiera recibir el plano de implantación de Santa ANA Condominio Campestre y la información de los lotes.";

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

type LotProps = {
  id: string;
  icon: React.ReactNode;
  kind: string;
  count: number;
  from: string;
  to: string;
  revealDelay: number;
  counterDuration?: number;
};

function LotCard({ id, icon, kind, count, from, to, revealDelay, counterDuration }: LotProps) {
  return (
    <article className={styles.lot} data-reveal style={delay(revealDelay)} aria-labelledby={id}>
      <div className={styles.lotTop}>
        <span className={styles.icon}>{icon}</span>
        <h3 id={id} className={styles.lotTitle}>
          Lotes para <strong>{kind}</strong>
        </h3>
        <p className={styles.count}>
          <Counter value={count} duration={counterDuration} />
        </p>
      </div>
      <dl className={styles.range}>
        <div>
          <dt>Desde</dt>
          <dd>
            {from}&nbsp;m<sup>2</sup>
          </dd>
        </div>
        <div>
          <dt>Hasta</dt>
          <dd>
            {to}&nbsp;m<sup>2</sup>
          </dd>
        </div>
      </dl>
    </article>
  );
}

export default function Implantation() {
  const { housing, commercial } = LOTS;
  return (
    <section id="implantacion" className={`on-dark ${styles.section}`} aria-labelledby="implantacion-title">
      <ImplantationVideo />

      <div className={`container ${styles.layout}`}>
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            Implantación general
          </p>
          <h2 id="implantacion-title" className={styles.title} data-reveal style={delay(80)}>
            <span>Tu espacio.</span> <span>Tu proyecto.</span> <span>Tu futuro.</span>
          </h2>
          <p className={styles.lead} data-reveal style={delay(160)}>
            Una propuesta campestre que integra lotes para vivienda y comercio en un entorno conectado con la
            naturaleza y la ciudad.
          </p>
        </header>

        <div className={styles.lots}>
          <LotCard
            id="lote-vivienda"
            icon={<Home width={22} height={22} />}
            kind="vivienda"
            count={housing.count}
            from={housing.from}
            to={housing.to}
            revealDelay={200}
          />
          <LotCard
            id="lote-comercio"
            icon={<Store width={22} height={22} />}
            kind="comercio"
            count={commercial.count}
            from={commercial.from}
            to={commercial.to}
            revealDelay={290}
            counterDuration={1100}
          />
        </div>

        <div className={`btn-row ${styles.cta}`} data-reveal style={delay(360)}>
          <a href="#contacto" className="btn btn--light">
            Solicitar información
          </a>
          <a href={whatsappLink(PLAN_MESSAGE)} className="btn btn--outline-light" target="_blank" rel="noopener noreferrer">
            Solicitar el plano
            <ArrowRight />
            <span className="visually-hidden">(abre WhatsApp en una pestaña nueva)</span>
          </a>
        </div>

        <div className={styles.plan} data-reveal="plan" style={delay(260)}>
          <PlanViewer
            plans={PLANS}
            note={
              <>
                <Leaf width={18} height={18} />
                <span>En la planta, el límite del proyecto se indica con línea punteada. Pulsa la imagen para ampliarla.</span>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}
