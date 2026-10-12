import { PHOTOS } from "@/lib/images";
import { ArrowRight } from "./Icons";
import Photo from "./Photo";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="nosotros" className={`section ${styles.about}`} aria-labelledby="nosotros-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow" data-reveal>
            Nosotros
          </p>
          <h2 id="nosotros-title" className="title-lg" data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
            Un entorno pensado para vivir mejor.
          </h2>
          <div className={styles.text} data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
            <p className="lead">
              Santa ANA Condominio Campestre es un proyecto ubicado estratégicamente sobre la vía Sirivana, a solo
              10&nbsp;minutos del casco urbano de Yopal.
            </p>
            <p>
              Integra la tranquilidad del entorno natural con la cercanía a centros comerciales, instituciones
              educativas, zonas deportivas y servicios esenciales.
            </p>
            <p className={styles.closing}>
              Una propuesta para quienes buscan un espacio propio, rodeado de naturaleza y conectado con la ciudad.
            </p>
          </div>
          <div className="btn-row" data-reveal style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
            <a href="#implantacion" className="btn">
              Descubre la implantación
              <ArrowRight />
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <Photo
            photo={PHOTOS.lagoZonaSocial}
            ratio="4 / 5"
            className={styles.main}
            sizes="(min-width: 960px) 40vw, 92vw"
          />
          <Photo
            photo={PHOTOS.llanoArbol}
            ratio="1 / 1"
            className={styles.inset}
            sizes="(min-width: 960px) 18vw, 44vw"
            delay={160}
          />
        </div>
      </div>
    </section>
  );
}
