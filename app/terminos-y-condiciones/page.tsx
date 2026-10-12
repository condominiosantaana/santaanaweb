import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { Pending } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de uso del sitio web de Santa ANA Condominio Campestre.",
  alternates: { canonical: "/terminos-y-condiciones" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Términos y Condiciones de Uso" updated="12 de octubre de 2026" current="/terminos-y-condiciones">
      <p>
        Estos términos regulan el uso del sitio web de {SITE.name}. Al navegar por el sitio, usted acepta estas
        condiciones.
      </p>

      <h2>1. Titular del sitio</h2>
      <p>
        El sitio pertenece a {SITE.legalName}, identificada con NIT {SITE.nit}, con
        domicilio en <Pending>Domicilio legal</Pending>. Sala de ventas: {SITE.salesRoom}. Teléfono: {SITE.phoneIntl}.
      </p>

      <h2>2. Carácter informativo</h2>
      <p>
        La información publicada tiene un propósito <strong>exclusivamente informativo y promocional</strong>. No
        constituye una oferta comercial vinculante, una promesa de compraventa ni un contrato. Las condiciones de
        cualquier negocio (precio, forma de pago, disponibilidad, áreas definitivas y entregas) se establecerán
        únicamente en los documentos contractuales que firmen las partes.
      </p>

      <h2>3. Imágenes y representaciones gráficas</h2>
      <p>
        Las imágenes del proyecto son <strong>renders de referencia</strong>: no representan el diseño final y están
        sujetas a modificaciones por decisiones técnicas, arquitectónicas, normativas o comerciales. Las fotografías
        de paisaje se incluyen con fines ilustrativos y no corresponden a instalaciones del condominio.
      </p>

      <h2>4. Áreas y cifras</h2>
      <p>
        Las cantidades de lotes y las áreas publicadas provienen del material comercial del proyecto. Las áreas
        definitivas de cada lote serán las que consten en los planos aprobados y en los documentos contractuales.
      </p>

      <h2>5. Contacto por WhatsApp</h2>
      <p>
        El formulario y los botones de WhatsApp abren un servicio de un tercero. El uso de WhatsApp se rige por sus
        propias condiciones. El tratamiento de los datos que usted comparta se describe en la{" "}
        <Link href="/politica-de-privacidad">Política de Privacidad</Link>.
      </p>

      <h2>6. Propiedad intelectual</h2>
      <p>
        La marca, el logotipo, los textos, los renders y el diseño del sitio son propiedad de sus titulares y no
        pueden reproducirse sin autorización previa y escrita.
      </p>

      <h2>7. Enlaces externos</h2>
      <p>
        El sitio puede enlazar a servicios de terceros, como WhatsApp o Google Maps. {SITE.name} no se hace
        responsable del contenido ni de las políticas de esos servicios.
      </p>

      <h2>8. Ley aplicable</h2>
      <p>Estos términos se rigen por las leyes de la República de Colombia.</p>

      <h2>9. Modificaciones</h2>
      <p>Estos términos pueden actualizarse. La versión vigente será siempre la publicada en esta página.</p>
    </LegalPage>
  );
}
