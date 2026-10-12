import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { Pending } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de tratamiento de datos personales del sitio web de Santa ANA Condominio Campestre.",
  alternates: { canonical: "/politica-de-privacidad" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de Privacidad y Tratamiento de Datos Personales" updated="12 de octubre de 2026" current="/politica-de-privacidad">
      <p>
        Esta política explica cómo se tratan los datos personales que usted comparte a través del sitio web{" "}
        <strong>{SITE.url.replace("https://", "")}</strong> de {SITE.name}, de acuerdo con la Ley 1581 de 2012, el
        Decreto 1377 de 2013 (incorporado en el Decreto 1074 de 2015) y las demás normas colombianas aplicables.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>
          Razón social: {SITE.legalName}
        </li>
        <li>
          NIT: {SITE.nit}
        </li>
        <li>
          Domicilio: <Pending>Domicilio legal</Pending>
        </li>
        <li>Sala de ventas: {SITE.salesRoom}.</li>
        <li>Teléfono comercial: {SITE.phoneIntl}.</li>
        <li>
          Correo para asuntos de datos personales: <Pending>Correo electrónico de atención</Pending>
        </li>
      </ul>

      <h2>2. Datos que se recogen</h2>
      <p>El formulario de contacto solicita:</p>
      <ul>
        <li>Nombre completo (obligatorio).</li>
        <li>Teléfono o WhatsApp (obligatorio).</li>
        <li>Correo electrónico (opcional).</li>
        <li>Ciudad (opcional).</li>
        <li>Tipo de interés: lote para vivienda, lote comercial o información general (obligatorio).</li>
        <li>Mensaje (opcional).</li>
      </ul>
      <p>No se solicitan datos sensibles ni datos de menores de edad.</p>

      <h2>3. Cómo funciona el formulario</h2>
      <p>
        El sitio web <strong>no almacena</strong> los datos del formulario en servidores, bases de datos, cookies ni
        en el almacenamiento del navegador. Al pulsar «Continuar en WhatsApp», el navegador abre WhatsApp con un
        mensaje que contiene los datos escritos. El mensaje solo se envía si usted decide enviarlo desde WhatsApp.
      </p>
      <p>
        WhatsApp es un servicio de un tercero (WhatsApp LLC, del grupo Meta), que trata la información según sus
        propias condiciones y políticas de privacidad. Una vez recibido el mensaje, el equipo comercial del proyecto
        tratará los datos según esta política.
      </p>

      <h2>4. Finalidades del tratamiento</h2>
      <ul>
        <li>Responder su solicitud de información sobre el proyecto y sus lotes.</li>
        <li>Contactarle por teléfono o WhatsApp para atender su interés comercial.</li>
        <li>Coordinar visitas a la sala de ventas cuando usted lo solicite.</li>
        <li>
          Enviar información comercial del proyecto, solo si usted lo autoriza.{" "}
          <Pending>Confirmar si se usará para envíos comerciales posteriores</Pending>
        </li>
      </ul>

      <h2>5. Derechos del titular</h2>
      <p>Como titular de los datos, usted tiene derecho a:</p>
      <ul>
        <li>Conocer, actualizar y rectificar sus datos personales.</li>
        <li>Solicitar prueba de la autorización otorgada.</li>
        <li>Ser informado sobre el uso que se ha dado a sus datos.</li>
        <li>
          Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la normativa de
          protección de datos.
        </li>
        <li>
          Revocar la autorización o solicitar la supresión de sus datos cuando no se respeten los principios,
          derechos y garantías legales.
        </li>
        <li>Acceder gratuitamente a sus datos personales objeto de tratamiento.</li>
      </ul>

      <h2>6. Cómo ejercer sus derechos</h2>
      <p>
        Puede presentar consultas y reclamos a través de <Pending>Canal oficial confirmado: correo electrónico y/o
        dirección física</Pending>, indicando su nombre, documento de identidad, datos de contacto y la descripción
        de su solicitud. Las consultas se atenderán en un máximo de diez (10) días hábiles y los reclamos en un máximo
        de quince (15) días hábiles, según la Ley 1581 de 2012.
      </p>

      <h2>7. Conservación y seguridad</h2>
      <p>
        Los datos se conservarán durante el tiempo necesario para cumplir las finalidades descritas{" "}
        <Pending>Plazo de conservación definido por el responsable</Pending>. El responsable adoptará medidas técnicas
        y administrativas razonables para proteger la información.
      </p>

      <h2>8. Autorización</h2>
      <p>
        Al marcar la casilla de autorización del formulario, usted autoriza de manera previa, expresa e informada el
        tratamiento de sus datos según esta política. La casilla no está marcada por defecto y el formulario no puede
        continuar sin ella.
      </p>

      <h2>9. Cambios a esta política</h2>
      <p>
        Cualquier cambio sustancial se publicará en esta página con su fecha de actualización. Consulte también la{" "}
        <Link href="/politica-de-cookies">Política de Cookies</Link> y los{" "}
        <Link href="/terminos-y-condiciones">Términos y Condiciones</Link>.
      </p>
    </LegalPage>
  );
}
