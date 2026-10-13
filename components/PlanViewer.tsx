"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Photo } from "@/lib/images";
import { ChevronLeft, ChevronRight, Close, Expand, Plan as PlanIcon } from "./Icons";
import { photoTag } from "./Photo";
import zoom from "./Carousel.module.css";
import styles from "./PlanViewer.module.css";

type Props = {
  /** El primer plano es el que se muestra en el panel; los demás se recorren dentro del visor. */
  plans: Photo[];
  /** Nota breve bajo la miniatura. */
  note?: React.ReactNode;
};

/**
 * Panel compacto con el plano de implantación y visor ampliado accesible (<dialog> nativo: Escape, foco y
 * capa superior). El visor permite ajustar el plano a la pantalla o verlo a tamaño real y recorrerlo.
 */
export default function PlanViewer({ plans, note }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [actualSize, setActualSize] = useState(false);
  const current = plans[index];
  const total = plans.length;
  const plan = plans[0];

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

  return (
    <>
      <div className={styles.panel}>
        <div className={styles.panelHead}>
          <span className={styles.panelIcon}>
            <PlanIcon width={20} height={20} />
          </span>
          <div className={styles.panelText}>
            <p className={styles.panelLabel}>Plano de implantación</p>
            <p className={styles.panelHint}>Consulta la distribución del proyecto.</p>
          </div>
        </div>
        <div className={styles.thumb}>
          <button type="button" className={styles.trigger} onClick={(e) => openAt(0, e.currentTarget)}>
            <span className={styles.frame}>
              <Image
                src={plan.src}
                alt={plan.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1200px) 480px, 92vw"
                quality={85}
                className={styles.image}
              />
              <span className="image-tag">{photoTag(plan)}</span>
            </span>
            <span className="visually-hidden">Ver ampliado: {plan.caption}</span>
          </button>
          <button type="button" className={styles.expandBtn} onClick={(e) => openAt(0, e.currentTarget)}>
            <Expand width={15} height={15} />
            Ampliar plano
          </button>
        </div>
        {note && <p className={styles.note}>{note}</p>}
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
