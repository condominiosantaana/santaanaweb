"use client";

import { useEffect, useState } from "react";
import { SOCIAL } from "@/lib/site";
import { FacebookGlyph, InstagramGlyph, TikTokGlyph } from "./Icons";
import styles from "./SocialRail.module.css";

const LINKS = [
  { href: SOCIAL.facebook, label: "Facebook", Icon: FacebookGlyph },
  { href: SOCIAL.instagram, label: "Instagram", Icon: InstagramGlyph },
  { href: SOCIAL.tiktok, label: "TikTok", Icon: TikTokGlyph },
];

/**
 * Columna flotante de redes sociales: a media altura del borde derecho desde 680 px de ancho,
 * y apilada sobre el botón de WhatsApp en móvil. Se oculta, igual que WhatsApp, mientras el formulario está en pantalla.
 * En móvil también espera mientras los botones de la portada (que ocupan todo el ancho) están visibles, para no taparlos.
 */
export default function SocialRail() {
  const [formInView, setFormInView] = useState(false);
  const [heroCtaInView, setHeroCtaInView] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const form = document.getElementById("formulario");
    if (!form) return;
    const io = new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting), {
      rootMargin: "0px 0px -15% 0px",
    });
    io.observe(form);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 679px)");
    const onChange = () => setMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    const cta = document.querySelector("#inicio .btn-row");
    const io = cta ? new IntersectionObserver(([entry]) => setHeroCtaInView(entry.isIntersecting)) : null;
    if (cta && io) io.observe(cta);
    return () => {
      mq.removeEventListener("change", onChange);
      io?.disconnect();
    };
  }, []);

  const hidden = formInView || (mobile && heroCtaInView);

  return (
    <nav className={styles.rail} aria-label="Redes sociales" data-hidden={hidden || undefined}>
      <ul>
        {LINKS.map(({ href, label, Icon }) => (
          <li key={label}>
            <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
              <Icon className={styles.icon} />
              <span className="visually-hidden">{label} (se abre en una pestaña nueva)</span>
              <span className={styles.tip} aria-hidden="true">
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
