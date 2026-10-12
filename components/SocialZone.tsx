import { SOCIAL_GALLERY } from "@/lib/images";
import { SHOW_SOCIAL_CAPACITY } from "@/lib/site";
import Carousel from "./Carousel";
import styles from "./SocialZone.module.css";

export default function SocialZone() {
  return (
    <section id="zona-social" className={`section ${styles.section}`} aria-labelledby="zona-social-title">
      <div className="container">
        <header className={styles.head}>
          <div className={styles.titleCol}>
            <p className="eyebrow" data-reveal>
              Zona social
            </p>
            <h2 id="zona-social-title" className="title-lg" data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
              Momentos que se convierten en recuerdos.
            </h2>
          </div>
          <div className={styles.textCol} data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
            <p className="lead">
              Un espacio social que integra naturaleza, arquitectura y un lago central que invita al descanso, la
              recreación y los momentos inolvidables en familia.
            </p>
            {SHOW_SOCIAL_CAPACITY ? (
              <p>
                La zona social cuenta con amplias zonas verdes y una capacidad informada de hasta 150 personas,
                ofreciendo un espacio para eventos, reuniones y actividades familiares.
              </p>
            ) : (
              <p>
                La zona social cuenta con amplias zonas verdes, pensadas para eventos, reuniones y actividades
                familiares.
              </p>
            )}
          </div>
        </header>

        <div data-reveal="image">
          <Carousel photos={SOCIAL_GALLERY} label="Imágenes de la zona social" ratio="16 / 9" />
        </div>
      </div>
    </section>
  );
}
