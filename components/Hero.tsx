import Image from "next/image";
import { PHOTOS } from "@/lib/images";
import { SITE } from "@/lib/site";
import { ArrowDown, ArrowRight, MapPin } from "./Icons";
import styles from "./Hero.module.css";

export default function Hero() {
  const photo = PHOTOS.arbolNativo;
  return (
    <section id="inicio" className={`${styles.hero} on-dark`} aria-labelledby="hero-title">
      <div className={styles.media}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          preload
          fetchPriority="high"
          placeholder="blur"
          quality={85}
          sizes="100vw"
          className={styles.image}
        />
        <div className={styles.shade} aria-hidden="true" />
      </div>

      <div className={`container ${styles.content}`}>
        <p className={styles.kicker}>Santa ANA · Condominio Campestre</p>
        <h1 id="hero-title" className={`title-xl ${styles.title}`}>
          Raíces que son{" "}
          <br />
          para siempre.
        </h1>
        <p className={styles.text}>
          Un lugar para construir recuerdos, disfrutar la naturaleza y proyectar el futuro de tu familia.
        </p>
        <p className={styles.location}>
          <MapPin width={16} height={16} />
          {SITE.locationShort}
        </p>
        <div className={`btn-row ${styles.buttons}`}>
          <a href="#nosotros" className="btn btn--light">
            Conoce el proyecto
            <ArrowRight />
          </a>
          <a href="#contacto" className="btn btn--outline-light">
            Solicitar información
          </a>
        </div>
      </div>

      <a href="#nosotros" className={styles.scrollCue}>
        <span className="visually-hidden">Desplazarse a la siguiente sección</span>
        <span aria-hidden="true">Descubre</span>
        <ArrowDown width={16} height={16} />
      </a>

      <p className={styles.tag}>Render de referencia</p>
    </section>
  );
}
