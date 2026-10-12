import { SITE } from "@/lib/site";
import { ArrowRight, MapPin, School, Services, ShoppingBag, Sport } from "./Icons";
import styles from "./Location.module.css";

const CONNECTIONS = [
  { icon: ShoppingBag, label: "Centros comerciales" },
  { icon: School, label: "Instituciones educativas" },
  { icon: Sport, label: "Zonas deportivas" },
  { icon: Services, label: "Servicios esenciales" },
];

// Búsqueda de la vía en Google Maps: no fija un punto ni presenta coordenadas como entrada del condominio.
const MAPS_SEARCH = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Vía Sirivana, Yopal, Casanare")}`;

export default function Location() {
  return (
    <section id="ubicacion" className={`section on-dark ${styles.location}`} aria-labelledby="ubicacion-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow" data-reveal>
            El proyecto · Ubicación
          </p>
          <h2 id="ubicacion-title" className="title-lg" data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
            Conectado con Yopal. En armonía con la naturaleza.
          </h2>
          <p className="lead" data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
            Localización estratégica sobre la vía Sirivana, a 10 minutos del casco urbano de Yopal y próximo a
            equipamientos clave de la ciudad.
          </p>
          <p className={styles.nearby} data-reveal style={{ "--reveal-delay": "200ms" } as React.CSSProperties}>
            Cerca de Unicentro, Alkosto, Unisangil y los colegios.
          </p>

          <ul className={styles.connections}>
            {CONNECTIONS.map(({ icon: Icon, label }, i) => (
              <li key={label} data-reveal style={{ "--reveal-delay": `${240 + i * 70}ms` } as React.CSSProperties}>
                <span className={styles.iconWrap}>
                  <Icon width={22} height={22} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <aside className={styles.card} aria-label="Distancia y sala de ventas" data-reveal>
          <div className={styles.route} aria-hidden="true">
            <span className={styles.stop}>Yopal</span>
            <span className={styles.track}>
              <span className={styles.dot} />
              <span className={styles.line} />
              <span className={`${styles.dot} ${styles.dotEnd}`} />
            </span>
            <span className={`${styles.stop} ${styles.stopEnd}`}>Santa ANA</span>
          </div>

          <p className={styles.minutes}>
            <span className={styles.number}>10</span>
            <span className={styles.unit}>minutos</span>
          </p>
          <p className={styles.minutesText}>del casco urbano de Yopal por la vía Sirivana.</p>

          <div className={styles.sales}>
            <MapPin width={20} height={20} />
            <div>
              <p className={styles.salesLabel}>Sala de ventas</p>
              <p>{SITE.salesRoom}</p>
            </div>
          </div>

          <a href={MAPS_SEARCH} className="btn btn--light" target="_blank" rel="noopener noreferrer">
            Ver la vía en Google Maps
            <ArrowRight />
            <span className="visually-hidden">(se abre en una pestaña nueva)</span>
          </a>
          <p className={styles.note}>
            El enlace abre una búsqueda de la vía Sirivana; no señala la entrada exacta del condominio.
          </p>
        </aside>
      </div>
    </section>
  );
}
