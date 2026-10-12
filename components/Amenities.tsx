import Image from "next/image";
import { PHOTOS, type Photo } from "@/lib/images";
import { ArrowRight, Leaf, Parking, Store, Trail } from "./Icons";
import { photoTag } from "./Photo";
import styles from "./Amenities.module.css";

type Featured = { title: string; text: string; photo: Photo; wide?: boolean };

const FEATURED: Featured[] = [
  {
    title: "Casa del Árbol",
    text: "Un árbol nativo se convierte en protagonista del diseño, dando vida a una Casa del Árbol única que ofrece un espacio de juego, aventura y conexión con la naturaleza.",
    photo: PHOTOS.casaDelArbol,
    wide: true,
  },
  {
    title: "Parque infantil",
    text: "Un espacio infantil rodeado de naturaleza, con sombra y un entorno pensado para el juego, la recreación y los momentos en familia.",
    photo: PHOTOS.parqueInfantil,
  },
  {
    title: "Cancha de pádel",
    text: "Un lugar para disfrutar del pádel en un ambiente tranquilo y rodeado de vegetación.",
    photo: PHOTOS.canchaPadel,
  },
  {
    title: "Oratorio",
    text: "Un espacio para el recogimiento, las ceremonias íntimas y los momentos de armonía.",
    photo: PHOTOS.oratorio,
  },
  {
    title: "Salón social",
    text: "Un espacio para compartir reuniones, encuentros y actividades familiares.",
    photo: PHOTOS.salonSocialLago,
  },
];

// Amenidades sin render oficial disponible: se presentan sin imagen para no mostrar espacios que no corresponden.
const LISTED = [
  {
    title: "Bosque y laguna nativa",
    text: "Espacios naturales que invitan a disfrutar del paisaje y conectar con el entorno campestre.",
    icon: Leaf,
  },
  {
    title: "Senderos",
    text: "Recorridos para disfrutar de la vegetación y de momentos al aire libre.",
    icon: Trail,
  },
  {
    title: "Parqueaderos",
    text: "Zonas de parqueo contempladas dentro de la propuesta del condominio.",
    icon: Parking,
  },
  {
    title: "Zona comercial",
    text: "Un espacio destinado a lotes comerciales dentro de la propuesta de implantación del proyecto.",
    icon: Store,
  },
];

export default function Amenities() {
  return (
    <section id="amenidades" className={`section ${styles.section}`} aria-labelledby="amenidades-title">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            Zonas comunes
          </p>
          <h2 id="amenidades-title" className="title-lg" data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
            Espacios para disfrutar cada momento.
          </h2>
          <p className="lead" data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
            Un entorno que reúne naturaleza, recreación y espacios para compartir en familia.
          </p>
        </header>

        <ul className={styles.cards}>
          {FEATURED.map((item, i) => (
            <li
              key={item.title}
              className={`${styles.card} ${item.wide ? styles.wide : ""}`}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
            >
              <article>
                <div className={styles.media}>
                  <Image
                    src={item.photo.src}
                    alt={item.photo.alt}
                    fill
                    placeholder="blur"
                    sizes={item.wide ? "(min-width: 960px) 62vw, 92vw" : "(min-width: 960px) 31vw, (min-width: 640px) 46vw, 92vw"}
                    className={styles.image}
                  />
                  <span className="image-tag">{photoTag(item.photo)}</span>
                </div>
                <div className={styles.body}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <ul className={styles.list}>
          {LISTED.map(({ title, text, icon: Icon }, i) => (
            <li key={title} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
              <Icon width={28} height={28} />
              <h3 className={styles.listTitle}>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>

        <div className={styles.cta} data-reveal>
          <a href="#galeria" className="btn btn--ghost">
            Explora la galería
            <ArrowRight />
          </a>
          <a href="#contacto" className="btn">
            Solicita información
          </a>
        </div>
      </div>
    </section>
  );
}
