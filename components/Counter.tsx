"use client";

import { useEffect, useRef, useState } from "react";

type Props = { value: number; duration?: number };

/**
 * Contador progresivo que se ejecuta una sola vez al entrar en pantalla.
 * Sin JavaScript o con movimiento reducido muestra directamente el valor final.
 * Los lectores de pantalla leen siempre el valor final.
 */
export default function Counter({ value, duration = 1600 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    // Si ya está visible al cargar, no lo reiniciamos para evitar parpadeos.
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    let frame = 0;
    setDisplay(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(eased * value));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">{display}</span>
      <span className="visually-hidden">{value}</span>
    </span>
  );
}
