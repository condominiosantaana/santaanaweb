"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { whatsappLink } from "@/lib/site";
import { WhatsAppGlyph } from "./Icons";
import styles from "./ContactForm.module.css";

const INTERESTS = ["Lote para vivienda", "Lote comercial", "Información general del proyecto"] as const;

type Values = {
  nombre: string;
  telefono: string;
  email: string;
  ciudad: string;
  interes: string;
  mensaje: string;
  autorizacion: boolean;
};

type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = {
  nombre: "",
  telefono: "",
  email: "",
  ciudad: "",
  interes: "",
  mensaje: "",
  autorizacion: false,
};

const ORDER: Field[] = ["nombre", "telefono", "email", "ciudad", "interes", "mensaje", "autorizacion"];
const NAME_RE = /^\p{L}[\p{L}\s'.-]{1,79}$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_MESSAGE = 600;

function validate(v: Values): Errors {
  const e: Errors = {};
  const name = v.nombre.trim();
  if (!name) e.nombre = "Escribe tu nombre completo.";
  else if (name.length < 3 || !NAME_RE.test(name)) e.nombre = "El nombre solo puede contener letras y espacios (mínimo 3 caracteres).";

  const digits = v.telefono.replace(/[\s()+.-]/g, "");
  if (!v.telefono.trim()) e.telefono = "Escribe un teléfono o WhatsApp de contacto.";
  else if (!/^\d{7,15}$/.test(digits)) e.telefono = "Escribe un número válido, solo con dígitos (entre 7 y 15). Ejemplo: 321 265 3172.";

  if (v.email.trim() && !EMAIL_RE.test(v.email.trim())) e.email = "Revisa el formato del correo. Ejemplo: nombre@correo.com.";
  if (v.ciudad.trim().length > 60) e.ciudad = "La ciudad no puede superar 60 caracteres.";
  if (!v.interes) e.interes = "Selecciona el tipo de interés.";
  if (v.mensaje.length > MAX_MESSAGE) e.mensaje = `El mensaje no puede superar ${MAX_MESSAGE} caracteres.`;
  if (!v.autorizacion) e.autorizacion = "Debes autorizar el tratamiento de datos personales para continuar.";
  return e;
}

function buildMessage(v: Values) {
  const lines = [
    "Hola, quisiera recibir información sobre Santa ANA Condominio Campestre.",
    "",
    `Nombre: ${v.nombre.trim()}`,
    `Teléfono / WhatsApp: ${v.telefono.trim()}`,
  ];
  if (v.email.trim()) lines.push(`Correo: ${v.email.trim()}`);
  if (v.ciudad.trim()) lines.push(`Ciudad: ${v.ciudad.trim()}`);
  lines.push(`Interés: ${v.interes}`);
  if (v.mensaje.trim()) lines.push(`Mensaje: ${v.mensaje.trim()}`);
  lines.push("", "Autorizo el tratamiento de mis datos personales según la Política de Privacidad del sitio.");
  return lines.join("\n");
}

export default function ContactForm() {
  const uid = useId();
  const fid = (f: string) => `${uid}-${f}`;
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState("");
  const [handoff, setHandoff] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const update = <K extends Field>(field: K, value: Values[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    setHandoff(null);
    if (submitted) setErrors(validate(next));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);
    const invalid = ORDER.filter((f) => found[f]);
    if (invalid.length) {
      setHandoff(null);
      setSummary(
        invalid.length === 1 ? "Revisa 1 campo marcado antes de continuar." : `Revisa ${invalid.length} campos marcados antes de continuar.`,
      );
      const first = invalid[0];
      const target =
        first === "interes"
          ? formRef.current?.querySelector<HTMLInputElement>(`input[name="interes"]`)
          : document.getElementById(fid(first));
      target?.focus();
      return;
    }
    setSummary("");
    const url = whatsappLink(buildMessage(values));
    setHandoff(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const err = (f: Field) =>
    errors[f] ? (
      <p id={fid(`${f}-error`)} className={styles.error}>
        <span aria-hidden="true">!</span>
        {errors[f]}
      </p>
    ) : null;

  const describedBy = (f: Field, hint?: string) =>
    [hint, errors[f] ? fid(`${f}-error`) : null].filter(Boolean).join(" ") || undefined;

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate aria-describedby={fid("intro")}>
      <p id={fid("intro")} className={styles.intro}>
        Los campos marcados con <span aria-hidden="true">*</span>
        <span className="visually-hidden">asterisco</span> son obligatorios.
      </p>

      <div role="alert" className={summary ? styles.summary : undefined}>
        {summary}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={fid("nombre")}>
            Nombre completo <span aria-hidden="true">*</span>
          </label>
          <input
            id={fid("nombre")}
            name="nombre"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            value={values.nombre}
            onChange={(e) => update("nombre", e.target.value)}
            aria-invalid={!!errors.nombre}
            aria-describedby={describedBy("nombre")}
          />
          {err("nombre")}
        </div>

        <div className={styles.field}>
          <label htmlFor={fid("telefono")}>
            Teléfono / WhatsApp <span aria-hidden="true">*</span>
          </label>
          <input
            id={fid("telefono")}
            name="telefono"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            maxLength={20}
            value={values.telefono}
            onChange={(e) => update("telefono", e.target.value)}
            aria-invalid={!!errors.telefono}
            aria-describedby={describedBy("telefono")}
          />
          {err("telefono")}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={fid("email")}>
            Correo electrónico <span className={styles.optional}>(opcional)</span>
          </label>
          <input
            id={fid("email")}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={120}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
          />
          {err("email")}
        </div>

        <div className={styles.field}>
          <label htmlFor={fid("ciudad")}>
            Ciudad <span className={styles.optional}>(opcional)</span>
          </label>
          <input
            id={fid("ciudad")}
            name="ciudad"
            type="text"
            autoComplete="address-level2"
            maxLength={60}
            value={values.ciudad}
            onChange={(e) => update("ciudad", e.target.value)}
            aria-invalid={!!errors.ciudad}
            aria-describedby={describedBy("ciudad")}
          />
          {err("ciudad")}
        </div>
      </div>

      <fieldset
        className={styles.fieldset}
        aria-invalid={!!errors.interes}
        aria-describedby={errors.interes ? fid("interes-error") : undefined}
      >
        <legend>
          Tipo de interés <span aria-hidden="true">*</span>
          <span className="visually-hidden">(obligatorio)</span>
        </legend>
        <div className={styles.options}>
          {INTERESTS.map((option) => (
            <label key={option} className={styles.option}>
              <input
                type="radio"
                name="interes"
                value={option}
                checked={values.interes === option}
                onChange={() => update("interes", option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {err("interes")}
      </fieldset>

      <div className={styles.field}>
        <label htmlFor={fid("mensaje")}>
          Mensaje <span className={styles.optional}>(opcional)</span>
        </label>
        <textarea
          id={fid("mensaje")}
          name="mensaje"
          rows={4}
          maxLength={MAX_MESSAGE}
          value={values.mensaje}
          onChange={(e) => update("mensaje", e.target.value)}
          aria-invalid={!!errors.mensaje}
          aria-describedby={describedBy("mensaje", fid("mensaje-count"))}
        />
        <p id={fid("mensaje-count")} className={styles.hint}>
          {values.mensaje.length} / {MAX_MESSAGE} caracteres
        </p>
        {err("mensaje")}
      </div>

      <div className={styles.consent}>
        <input
          id={fid("autorizacion")}
          name="autorizacion"
          type="checkbox"
          required
          checked={values.autorizacion}
          onChange={(e) => update("autorizacion", e.target.checked)}
          aria-invalid={!!errors.autorizacion}
          aria-describedby={describedBy("autorizacion")}
        />
        <label htmlFor={fid("autorizacion")}>
          Autorizo el tratamiento de mis datos personales de acuerdo con la{" "}
          <Link href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer">
            Política de Privacidad
            <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
          </Link>
          . <span aria-hidden="true">*</span>
        </label>
        {err("autorizacion")}
      </div>

      <p className={styles.notice}>
        Al continuar se abrirá WhatsApp con un mensaje que incluye los datos que escribiste. El mensaje solo llega a
        nuestro equipo cuando tú lo envías desde WhatsApp.
      </p>

      <button type="submit" className={`btn ${styles.submit}`}>
        <WhatsAppGlyph />
        Continuar en WhatsApp
      </button>

      <div role="status" className={handoff ? styles.handoff : undefined}>
        {handoff && (
          <>
            <p>
              <strong>Tu mensaje está listo en WhatsApp.</strong> Para que nuestro equipo lo reciba, envíalo desde la
              conversación que se abrió.
            </p>
            <a href={handoff} target="_blank" rel="noopener noreferrer">
              ¿No se abrió WhatsApp? Ábrelo aquí
              <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
            </a>
          </>
        )}
      </div>
    </form>
  );
}
