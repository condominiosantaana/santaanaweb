import { GALLERY } from "@/lib/images";
import { SITE } from "@/lib/site";
import Carousel from "./Carousel";
import styles from "./Gallery.module.css";

export default function Gallery() {
  return (
    <section id="galeria" className={`section ${styles.section}`} aria-labelledby="galeria-title">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            Galería
          </p>
          <h2 id="galeria-title" className="title-lg" data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
            Recorre Santa ANA.
          </h2>
          <p className={styles.help} data-reveal style={{ "--reveal-delay": "140ms" } as React.CSSProperties}>
            Usa las flechas, desliza o elige una miniatura. Puedes ampliar cada imagen y pausar la presentación.
          </p>
        </header>

        <div data-reveal="image">
          <Carousel
            photos={GALLERY}
            label="Galería de renders del proyecto"
            autoplay={5000}
            thumbnails
            lightbox
            ratio="3 / 2"
          />
        </div>

        <p className={`disclaimer ${styles.disclaimer}`}>{SITE.renderDisclaimer}</p>
      </div>
    </section>
  );
}
