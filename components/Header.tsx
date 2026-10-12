"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { Close, Phone } from "./Icons";
import logoColor from "@/public/brand/logo-color.png";
import logoIvory from "@/public/brand/logo-ivory.png";
import styles from "./Header.module.css";

type Props = {
  /** "overlay": transparente sobre la portada hasta desplazarse. "solid": siempre con fondo. */
  variant?: "overlay" | "solid";
};

export default function Header({ variant = "overlay" }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !toggleRef.current?.contains(t)) close(false);
    };
    const mq = window.matchMedia("(min-width: 1080px)");
    const onMq = () => mq.matches && close(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    mq.addEventListener("change", onMq);
    document.documentElement.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      mq.removeEventListener("change", onMq);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open, close]);

  const solid = variant === "solid" || scrolled || open;

  return (
    <header className={`${styles.header} ${solid ? styles.solid : styles.overlay}`} data-open={open || undefined}>
      <div className={`container ${styles.bar}`}>
        <Link href="/#inicio" className={styles.logo} aria-label={`${SITE.name}, ir al inicio`}>
          <Image src={logoIvory} alt="" className={styles.logoIvory} sizes="120px" preload />
          <Image src={logoColor} alt="" className={styles.logoColor} sizes="120px" preload />
        </Link>

        <nav aria-label="Principal" className={styles.desktopNav}>
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="/#contacto" className={`btn ${solid ? "" : "btn--light"} ${styles.cta}`}>
            Solicitar información
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="visually-hidden">{open ? "Cerrar menú" : "Abrir menú"}</span>
            <span className={styles.burger} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        id="menu-movil"
        ref={panelRef}
        className={styles.panel}
        hidden={!open}
        onClickCapture={(e) => {
          if (!(e.target as HTMLElement).closest("a")) return;
          // Libera el bloqueo de desplazamiento antes de que el enlace navegue hasta la sección.
          document.documentElement.classList.remove("menu-open");
          close(false);
        }}
      >
        <nav aria-label="Menú móvil" className="container">
          <ul className={styles.mobileList}>
            {NAV.map((item, i) => (
              <li key={item.href} style={{ "--i": i } as React.CSSProperties}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className={styles.mobileFooter}>
            <Link href="/#contacto" className="btn">
              Solicitar información
            </Link>
            <a href={SITE.phoneHref} className={styles.mobilePhone}>
              <Phone width={18} height={18} />
              {SITE.phoneDisplay}
            </a>
          </div>
          <button type="button" className={styles.closeInline} onClick={() => close(true)}>
            <Close width={18} height={18} />
            Cerrar menú
          </button>
        </nav>
      </div>
    </header>
  );
}
