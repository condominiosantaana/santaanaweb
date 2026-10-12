import { PHOTOS } from "@/lib/images";
import { ArrowRight, Car, Gate, Shield, Walk } from "./Icons";
import Photo from "./Photo";
import styles from "./Access.module.css";

const FEATURES = [
  { icon: Shield, label: "Seguridad 24/7" },
  { icon: Gate, label: "Portería moderna" },
  { icon: Car, label: "Acceso vehicular" },
  { icon: Walk, label: "Acceso peatonal" },
];

export default function Access() {
  return (
    <section id="acceso" className={`section ${styles.section}`} aria-labelledby="acceso-title">
      <div className={`container ${styles.grid}`}>
        <Photo photo={PHOTOS.porteria} ratio="3 / 2" className={styles.photo} sizes="(min-width: 960px) 56vw, 92vw" />

        <div className={styles.copy}>
          <p className="eyebrow" data-reveal>
            Acceso principal
          </p>
          <h2 id="acceso-title" className="title-lg" data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
            Tranquilidad desde la entrada.
          </h2>
          <p className="lead" data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
            Una portería moderna con acceso vehicular y peatonal, pensada para facilitar el ingreso al condominio.
          </p>
          <ul className={styles.features}>
            {FEATURES.map(({ icon: Icon, label }, i) => (
              <li key={label} data-reveal style={{ "--reveal-delay": `${200 + i * 70}ms` } as React.CSSProperties}>
                <Icon width={24} height={24} />
                <span>{label}</span>
              </li>
            ))}
          </ul>
          <div data-reveal>
            <a href="#contacto" className="text-link">
              Visita nuestra sala de ventas
              <ArrowRight width={16} height={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
