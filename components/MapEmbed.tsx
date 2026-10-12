"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; title: string; className?: string };

/**
 * Inserta el mapa de Google solo cuando su contenedor se acerca a la pantalla.
 * `loading="lazy"` no basta: en móvil Chrome lo carga desde el inicio (~450 KB) y retrasa la primera pantalla.
 */
export default function MapEmbed({ src, title, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible ? (
        <iframe src={src} title={title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
      ) : (
        <noscript>
          <iframe src={src} title={title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        </noscript>
      )}
    </div>
  );
}
