import { SITE } from "@/lib/site";
import { ArrowRight, MapPin, School, Services, ShoppingBag, Sport } from "./Icons";
import MapEmbed from "./MapEmbed";
import styles from "./Location.module.css";

const CONNECTIONS = [
  { icon: ShoppingBag, label: "Centros comerciales" },
  { icon: School, label: "Instituciones educativas" },
  { icon: Sport, label: "Zonas deportivas" },
  { icon: Services, label: "Servicios esenciales" },
];

// Ubicación oficial confirmada por el cliente: ficha de Google "Santa Ana Condominio Campestre"
// (5.351234, -72.359857). El mapa insertado busca esa ficha, de modo que su marcador y su enlace
// "Abrir en Maps" llevan al mismo lugar que el botón, que usa el enlace oficial compartido por el cliente.
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent("Santa Ana Condominio Campestre, Yopal, Casanare")}&z=14&hl=es&output=embed`;
const MAP_LINK = "https://maps.app.goo.gl/VaxeCX163dGWs8w49";

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

        <aside className={styles.card} aria-label="Mapa y sala de ventas" data-reveal>
          <MapEmbed
            src={MAP_EMBED}
            title="Ubicación de Santa ANA Condominio Campestre en Google Maps"
            className={styles.map}
          />
          <p className={styles.mapNote}>
            Ubicación de Santa ANA Condominio Campestre en Google Maps.
          </p>

          <div className={styles.sales}>
            <MapPin width={20} height={20} />
            <div>
              <p className={styles.salesLabel}>Sala de ventas</p>
              <p>{SITE.salesRoom}</p>
            </div>
          </div>

          <a href={MAP_LINK} className="btn btn--light" target="_blank" rel="noopener noreferrer">
            Ver ubicación en Google Maps
            <ArrowRight />
            <span className="visually-hidden">(se abre en una pestaña nueva)</span>
          </a>
        </aside>
      </div>
    </section>
  );
}
