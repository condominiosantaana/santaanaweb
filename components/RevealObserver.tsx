"use client";

import { useEffect } from "react";

/**
 * Marca como visibles los elementos con [data-reveal] una sola vez, al entrar en pantalla.
 * Además del IntersectionObserver, una comprobación por fotograma durante el desplazamiento revela los
 * elementos que ya están en pantalla o por encima de ella: en un desplazamiento muy rápido, con el hilo
 * principal ocupado, el observador puede no llegar a ver una sección y esta quedaría oculta.
 */
export default function RevealObserver() {
  useEffect(() => {
    const pending = new Set(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    if (!("IntersectionObserver" in window)) {
      pending.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    let frame = 0;
    const reveal = (el: HTMLElement) => {
      el.classList.add("is-visible");
      pending.delete(el);
      io.unobserve(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    pending.forEach((el) => io.observe(el));

    const catchUp = () => {
      frame = 0;
      const limit = window.innerHeight * 0.92;
      const due = [...pending].filter((el) => el.getBoundingClientRect().top < limit);
      due.forEach(reveal);
      if (!pending.size) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(catchUp);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
