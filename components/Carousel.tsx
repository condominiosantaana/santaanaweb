"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Photo } from "@/lib/images";
import { ChevronLeft, ChevronRight, Close, Expand, Pause, Play } from "./Icons";
import { photoTag } from "./Photo";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Carousel.module.css";

type Props = {
  photos: Photo[];
  label: string;
  /** Intervalo de avance automático en milisegundos. Sin valor, el carrusel no avanza solo. */
  autoplay?: number;
  thumbnails?: boolean;
  lightbox?: boolean;
  sizes?: string;
  ratio?: string;
};

const SWIPE_THRESHOLD = 40;

function useSwipe(onPrev: () => void, onNext: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  return {
    onPointerDown: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      start.current = { x: e.clientX, y: e.clientY };
    },
    onPointerUp: (e: React.PointerEvent) => {
      const s = start.current;
      start.current = null;
      if (!s) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) onNext();
        else onPrev();
      }
    },
    onPointerCancel: () => {
      start.current = null;
    },
  };
}

export default function Carousel({
  photos,
  label,
  autoplay,
  thumbnails = false,
  lightbox = false,
  sizes = "(min-width: 1240px) 1240px, 100vw",
  ratio = "16 / 9",
}: Props) {
  const total = photos.length;
  const id = useId();
  const [index, setIndex] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0, 1 % total, (total - 1) % total]));
  const reducedMotion = useReducedMotion();
  // "auto": avanza solo si el usuario no prefiere movimiento reducido. Cualquier control manual la detiene ("off");
  // el botón de reproducción la reanuda de forma explícita ("on").
  const [mode, setMode] = useState<"auto" | "on" | "off">("auto");
  const playing = !!autoplay && (mode === "on" || (mode === "auto" && !reducedMotion));
  const [hold, setHold] = useState(false);
  const [inView, setInView] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const zoomTriggerRef = useRef<HTMLButtonElement>(null);

  const go = useCallback(
    (next: number) => {
      const i = (next + total) % total;
      setIndex(i);
      setVisited((prev) => {
        const n = new Set(prev);
        n.add(i);
        n.add((i + 1) % total);
        n.add((i - 1 + total) % total);
        return n;
      });
    },
    [total],
  );

  // Cualquier interacción manual detiene el avance automático.
  const userGo = useCallback(
    (next: number) => {
      setMode("off");
      go(next);
    },
    [go],
  );
  const prev = useCallback(() => userGo(index - 1), [userGo, index]);
  const next = useCallback(() => userGo(index + 1), [userGo, index]);

  // Pausar fuera de pantalla.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !autoplay) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [autoplay]);

  useEffect(() => {
    if (!autoplay || !playing || hold || !inView || zoomOpen) return;
    const t = window.setTimeout(() => {
      if (document.visibilityState === "visible") go(index + 1);
    }, autoplay);
    return () => window.clearTimeout(t);
  }, [autoplay, playing, hold, inView, zoomOpen, index, go]);

  // Mantener visible la miniatura activa sin desplazar la página.
  useEffect(() => {
    const strip = thumbsRef.current;
    const active = strip?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!strip || !active) return;
    const left = active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2;
    strip.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [index]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const openZoom = () => {
    setMode("off");
    dialogRef.current?.showModal();
    setZoomOpen(true);
  };
  const closeZoom = () => dialogRef.current?.close();

  const swipe = useSwipe(prev, next);
  const zoomSwipe = useSwipe(prev, next);
  const current = photos[index];
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      ref={rootRef}
      className={styles.carousel}
      aria-roledescription="carrusel"
      aria-label={label}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHold(false);
      }}
    >
      <div className={styles.viewport} style={{ aspectRatio: ratio }} {...swipe}>
        <div className={styles.slides} aria-live={playing ? "off" : "polite"} id={`${id}-slides`}>
          {photos.map((photo, i) => {
            const active = i === index;
            return (
              <div
                key={photo.caption}
                className={styles.slide}
                data-active={active || undefined}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${i + 1} de ${total}: ${photo.caption}`}
                aria-hidden={!active}
                inert={!active}
              >
                {visited.has(i) && (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={sizes}
                    placeholder="blur"
                    className={styles.image}
                    draggable={false}
                  />
                )}
              </div>
            );
          })}
        </div>

        <span className="image-tag">{photoTag(current)}</span>

        {lightbox && (
          <button ref={zoomTriggerRef} type="button" className={`${styles.iconBtn} ${styles.zoomBtn}`} onClick={openZoom}>
            <Expand width={18} height={18} />
            <span className="visually-hidden">Ampliar imagen: {current.caption}</span>
          </button>
        )}

        <div className={styles.arrows}>
          <button type="button" className={styles.iconBtn} onClick={prev} aria-controls={`${id}-slides`}>
            <ChevronLeft width={22} height={22} />
            <span className="visually-hidden">Imagen anterior</span>
          </button>
          <button type="button" className={styles.iconBtn} onClick={next} aria-controls={`${id}-slides`}>
            <ChevronRight width={22} height={22} />
            <span className="visually-hidden">Imagen siguiente</span>
          </button>
        </div>
      </div>

      <div className={styles.bar}>
        <p className={styles.caption}>
          <span className={styles.counter} aria-hidden="true">
            {pad(index + 1)} <span>/ {pad(total)}</span>
          </span>
          <span>{current.caption}</span>
        </p>

        <div className={styles.controls}>
          {autoplay && (
            <button
              type="button"
              className={`${styles.iconBtn} ${styles.playBtn}`}
              onClick={() => {
                // Reanudar es una petición explícita: no la bloquea el foco ni el puntero sobre el carrusel.
                setHold(false);
                setMode(playing ? "off" : "on");
              }}
              aria-pressed={!playing}
            >
              {playing ? <Pause width={18} height={18} /> : <Play width={18} height={18} />}
              <span className="visually-hidden">{playing ? "Pausar presentación automática" : "Reanudar presentación automática"}</span>
            </button>
          )}
          {!thumbnails && (
            <div className={styles.dots} role="group" aria-label="Seleccionar imagen">
              {photos.map((photo, i) => (
                <button
                  key={photo.caption}
                  type="button"
                  className={styles.dot}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => userGo(i)}
                >
                  <span className="visually-hidden">
                    Ver imagen {i + 1} de {total}: {photo.caption}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {thumbnails && (
        <div className={styles.thumbs} ref={thumbsRef} role="group" aria-label="Miniaturas de la galería">
          {photos.map((photo, i) => (
            <button
              key={photo.caption}
              type="button"
              className={styles.thumb}
              aria-current={i === index ? "true" : undefined}
              onClick={() => userGo(i)}
            >
              <Image src={photo.src} alt="" fill sizes="140px" className={styles.image} />
              <span className="visually-hidden">
                Ver imagen {i + 1} de {total}: {photo.caption}
              </span>
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <dialog
          ref={dialogRef}
          className={styles.dialog}
          aria-label={`Vista ampliada: ${current.caption}`}
          onClose={() => {
            setZoomOpen(false);
            zoomTriggerRef.current?.focus();
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeZoom();
          }}
          onKeyDown={(e) => {
            // Las flechas navegan dentro de la vista ampliada sin propagar al carrusel.
            e.stopPropagation();
            onKeyDown(e);
          }}
        >
          {zoomOpen && (
            <div className={styles.zoomInner} {...zoomSwipe}>
              <div className={styles.zoomFrame}>
                <Image
                  key={current.caption}
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  quality={85}
                  className={styles.zoomImage}
                  draggable={false}
                />
              </div>
              <div className={styles.zoomBar}>
                <p className={styles.zoomCaption} aria-live="polite">
                  {pad(index + 1)} / {pad(total)} · {current.caption} · {photoTag(current)}
                </p>
                <div className={styles.zoomControls}>
                  <button type="button" className={styles.iconBtn} onClick={prev}>
                    <ChevronLeft width={22} height={22} />
                    <span className="visually-hidden">Imagen anterior</span>
                  </button>
                  <button type="button" className={styles.iconBtn} onClick={next}>
                    <ChevronRight width={22} height={22} />
                    <span className="visually-hidden">Imagen siguiente</span>
                  </button>
                  <button type="button" className={styles.iconBtn} onClick={closeZoom} autoFocus>
                    <Close width={20} height={20} />
                    <span className="visually-hidden">Cerrar vista ampliada</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </dialog>
      )}
    </section>
  );
}
