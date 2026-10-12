import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Información sobre el uso de cookies y tecnologías similares en el sitio de Santa ANA Condominio Campestre.",
  alternates: { canonical: "/politica-de-cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage title="Política de Cookies" updated="12 de octubre de 2026" current="/politica-de-cookies">
      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos que un sitio web guarda en el navegador para recordar información sobre la
        visita.
      </p>

      <h2>2. Cookies que utiliza este sitio</h2>
      <p>
        El sitio de {SITE.name} <strong>no instala cookies propias</strong>. No utiliza herramientas de analítica,
        publicidad, píxeles de seguimiento ni redes sociales integradas.
      </p>
      <p>
        Las tipografías y las imágenes se sirven desde el propio dominio del sitio. La única excepción es el mapa de la
        sección de ubicación: es un mapa de <strong>Google Maps</strong> insertado que se carga desde los servidores
        de Google cuando esa sección se muestra en pantalla. Al cargarse, Google puede recibir datos técnicos de su
        navegador (como la dirección IP) y utilizar cookies o tecnologías similares, según la{" "}
        <a href="https://policies.google.com/technologies/cookies?hl=es" target="_blank" rel="noopener noreferrer">
          política de cookies de Google
        </a>
        . Puede bloquear las cookies de terceros desde la configuración de su navegador.
      </p>

      <h2>3. Almacenamiento en el navegador</h2>
      <p>
        El sitio no guarda en el navegador (cookies, localStorage o sessionStorage) los datos que usted escribe en el
        formulario de contacto.
      </p>

      <h2>4. Servicios externos enlazados</h2>
      <p>
        Al pulsar un botón de WhatsApp o el enlace «Ver ubicación en Google Maps», usted sale del sitio y accede a
        servicios de terceros que pueden usar sus propias cookies según sus políticas.
      </p>

      <h2>5. Datos técnicos del alojamiento</h2>
      <p>
        Como cualquier servidor web, el proveedor de alojamiento puede procesar datos técnicos (como la dirección IP o
        el tipo de navegador) para entregar las páginas y proteger el servicio. Estos datos no se usan para
        identificar a los visitantes con fines comerciales.
      </p>

      <h2>6. Cambios</h2>
      <p>
        Si en el futuro se incorporan herramientas que requieran cookies no esenciales (por ejemplo, analítica), se
        actualizará esta política y se pedirá su consentimiento antes de activarlas. Consulte también la{" "}
        <Link href="/politica-de-privacidad">Política de Privacidad</Link>.
      </p>
    </LegalPage>
  );
}
