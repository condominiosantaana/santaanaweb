"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PLANS } from "@/lib/images";
import { SoundOff, SoundOn } from "./Icons";
import styles from "./ImplantationVideo.module.css";

// Video optimizado (H.264 1280 × 720, 8 s, con pista de audio AAC). Original: IMAGENES RENDER/render video.mp4
const VIDEO_SRC = "/videos/implantacion-render.mp4";

type Mode = "pending" | "video" | "static";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/** Condiciones en las que se prefiere la imagen fija: movimiento reducido, ahorro de datos o conexión lenta. */
function prefersStatic() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData) return true;
  return ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "");
}

/**
 * Fondo audiovisual de la sección Implantación general.
 * - Imagen de respaldo (render aéreo) siempre presente debajo del video.
 * - El video solo se descarga cuando la sección se acerca a la pantalla y se pausa cuando sale de ella.
 * - Empieza silenciado; el sonido solo se activa por decisión del usuario.
 */
export default function ImplantationVideo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<Mode>("pending");
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [soundError, setSoundError] = useState(false);

  // Decisión inicial (solo en el navegador, sin afectar a la hidratación).
  useEffect(() => {
    const id = requestAnimationFrame(() => setMode(prefersStatic() ? "static" : "video"));
    return () => cancelAnimationFrame(id);
  }, []);

  // Cargar al acercarse; reproducir en pantalla y pausar fuera de ella.
  useEffect(() => {
    if (mode !== "video") return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (entry.isIntersecting) {
          setNear(true);
          if (video && video.paused && video.getAttribute("src")) video.play().catch(() => undefined);
        } else if (video && !video.paused) {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mode]);

  // Al acercarse la sección: asignar la fuente, cargarla e iniciar la reproducción silenciada.
  useEffect(() => {
    const video = videoRef.current;
    if (!near || !video || video.getAttribute("src")) return;
    video.muted = true;
    video.src = VIDEO_SRC;
    video.load();
    video.play().catch(() => undefined);
  }, [near]);

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;
    setSoundError(false);
    if (muted) {
      video.muted = false;
      try {
        if (video.paused) await video.play();
        setMuted(false);
      } catch {
        video.muted = true;
        setMuted(true);
        setSoundError(true);
      }
    } else {
      video.muted = true;
      setMuted(true);
    }
  };

  const fallback = PLANS[1];

  return (
    <>
      <div ref={wrapRef} className={styles.media} aria-hidden="true">
        <Image src={fallback.src} alt="" fill sizes="100vw" quality={75} placeholder="blur" className={styles.fallback} />
        {mode === "video" && (
          <video
            ref={videoRef}
            className={styles.video}
            data-playing={playing || undefined}
            muted
            loop
            playsInline
            preload="none"
            disablePictureInPicture
            onPlaying={() => setPlaying(true)}
            onError={() => setMode("static")}
          />
        )}
        <div className={styles.shade} />
      </div>

      {mode === "video" && playing && (
        <div className={styles.soundWrap}>
          <button
            type="button"
            className={styles.sound}
            onClick={toggleSound}
            aria-label={muted ? "Activar sonido" : "Silenciar sonido"}
            aria-pressed={!muted}
          >
            {muted ? <SoundOff width={20} height={20} /> : <SoundOn width={20} height={20} />}
          </button>
          <p className={styles.soundStatus} role="status">
            {soundError ? "No se pudo activar el sonido. Inténtalo de nuevo." : ""}
          </p>
        </div>
      )}
    </>
  );
}
