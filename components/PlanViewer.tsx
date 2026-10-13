"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Photo } from "@/lib/images";
import { ChevronLeft, ChevronRight, Close, Expand } from "./Icons";
import { photoTag } from "./Photo";
import zoom from "./Carousel.module.css";
import styles from "./PlanViewer.module.css";

type Props = {
  /** El primer plano es el principal; el segundo, el complemento. */
  plans: Photo[];
  /** Contenido que acompaña al plano complementario (texto de la sección). */
  children?: React.ReactNode;
};

/**
 * Planos de zonificación con visor ampliado accesible (<dialog> nativo: Escape, foco y capa superior).
 * El visor permite ajustar el plano a la pantalla o verlo a tamaño real y recorrerlo con desplazamiento.
 */
export default function PlanViewer({ plans, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [actualSize, setActualSize] = useState(false);
  const current = plans[index];
  const total = plans.length;

  const openAt = (i: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setIndex(i);
    setActualSize(false);
    setOpen(true);
    dialogRef.current?.showModal();
  };
  const go = (step: number) => {
    setIndex((i) => (i + step + total) % total);
    setActualSize(false);
  };

  const figure = (photo: Photo, i: number, main: boolean) => (
    <figure className={`${styles.figure} ${main ? styles.main : ""}`} data-reveal="plan">
      <button type="button" className={styles.trigger} onClick={(e) => openAt(i, e.currentTarget)}>
        <span className={styles.frame}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            placeholder="blur"
            sizes={main ? "(min-width: 1024px) 60vw, 92vw" : "(min-width: 1024px) 38vw, 92vw"}
            quality={85}
            className={styles.image}
          />
          <span className="image-tag">{photoTag(photo)}</span>
          <span className={styles.zoomHint} aria-hidden="true">
            <Expand width={16} height={16} />
            Ampliar
          </span>
        </span>
        <span className="visually-hidden">Ampliar: {photo.caption}</span>
      </button>
      <figcaption className={styles.caption}>{photo.caption}</figcaption>
    </figure>
  );

  return (
    <>
      <div className={styles.grid}>
        {figure(plans[0], 0, true)}
        <div className={styles.side}>
          {plans[1] && figure(plans[1], 1, false)}
          {children}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className={zoom.dialog}
        aria-label={`Plano ampliado: ${current.caption}`}
        onClose={() => {
          setOpen(false);
          triggerRef.current?.focus();
        }}
        onKeyDown={(e) => {
          if (actualSize) return; // a tamaño real, las flechas desplazan el plano
          if (e.key === "ArrowRight") go(1);
          else if (e.key === "ArrowLeft") go(-1);
        }}
      >
        {open && (
          <div className={zoom.zoomInner}>
            {actualSize ? (
              <div className={styles.scroller} tabIndex={0} aria-label="Plano a tamaño real; use las flechas o arrastre para recorrerlo">
                <Image
                  key={`${current.caption}-real`}
                  src={current.src}
                  alt={current.alt}
                  sizes={`${current.src.width}px`}
                  quality={85}
                  className={styles.actual}
                  style={{ width: current.src.width }}
                  draggable={false}
                />
              </div>
            ) : (
              <div className={zoom.zoomFrame}>
                <Image
                  key={current.caption}
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  quality={85}
                  className={zoom.zoomImage}
                  draggable={false}
                />
              </div>
            )}
            <div className={zoom.zoomBar}>
              <p className={zoom.zoomCaption} aria-live="polite">
                {index + 1} / {total} · {current.caption} · {photoTag(current)}
              </p>
              <div className={zoom.zoomControls}>
                <button type="button" className={styles.textBtn} onClick={() => setActualSize((v) => !v)} aria-pressed={actualSize}>
                  {actualSize ? "Ajustar a la pantalla" : "Ver a tamaño real"}
                </button>
                {total > 1 && (
                  <>
                    <button type="button" className={zoom.iconBtn} onClick={() => go(-1)}>
                      <ChevronLeft width={22} height={22} />
                      <span className="visually-hidden">Plano anterior</span>
                    </button>
                    <button type="button" className={zoom.iconBtn} onClick={() => go(1)}>
                      <ChevronRight width={22} height={22} />
                      <span className="visually-hidden">Plano siguiente</span>
                    </button>
                  </>
                )}
                <button type="button" className={zoom.iconBtn} onClick={() => dialogRef.current?.close()} autoFocus>
                  <Close width={20} height={20} />
                  <span className="visually-hidden">Cerrar plano ampliado</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
