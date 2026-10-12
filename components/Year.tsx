"use client";

/** Año actual calculado en el navegador, para que el copyright no dependa de la fecha de compilación. */
export default function Year() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
