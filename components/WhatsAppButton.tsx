"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/site";
import { WhatsAppGlyph } from "./Icons";
import styles from "./WhatsAppButton.module.css";

/** Botón flotante de WhatsApp. Se oculta mientras el formulario está en pantalla para no tapar su envío. */
export default function WhatsAppButton() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const form = document.getElementById("formulario");
    if (!form) return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      rootMargin: "0px 0px -15% 0px",
    });
    io.observe(form);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={whatsappLink()}
      className={styles.button}
      data-hidden={hidden || undefined}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppGlyph className={styles.glyph} />
      <span className={styles.label} aria-hidden="true">
        Escríbenos
      </span>
      <span className="visually-hidden">Escríbenos por WhatsApp al 321 265 3172 (se abre en una pestaña nueva)</span>
    </a>
  );
}
