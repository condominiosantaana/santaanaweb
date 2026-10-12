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

// No hay coordenadas oficiales del condominio. El mapa muestra una vista de Yopal y su entorno oriental
// (centro y zoom, sin marcador) para orientar al visitante sin señalar un punto como la entrada del proyecto.
// La búsqueda "Vía Sirivana, Yopal" de Google resuelve a una ficha de terceros, por eso no se usa.
const MAP_VIEW = { lat: 5.345, lng: -72.37, zoom: 12 };
const MAP_EMBED = `https://maps.google.com/maps?ll=${MAP_VIEW.lat},${MAP_VIEW.lng}&z=${MAP_VIEW.zoom}&t=m&hl=es&output=embed`;
const MAP_LINK = `https://www.google.com/maps/@${MAP_VIEW.lat},${MAP_VIEW.lng},${MAP_VIEW.zoom}z`;

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
            title="Mapa de referencia de Yopal y su entorno, en Google Maps"
            className={styles.map}
          />
          <p className={styles.mapNote}>
            Vista de referencia de Yopal y su entorno. El mapa no señala la ubicación exacta del condominio.
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
