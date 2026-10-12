// Datos oficiales del proyecto. Cualquier cifra o dato comercial debe cambiarse solo aquí.

export const SITE = {
  name: "Santa ANA Condominio Campestre",
  title: "Santa ANA Condominio Campestre | Raíces que son para siempre",
  slogan: "Raíces que son para siempre.",
  description:
    "Conoce Santa ANA Condominio Campestre, ubicado sobre la vía Sirivana, a 10 minutos de Yopal. Descubre sus lotes para vivienda y comercio y solicita información.",
  url: "https://condominiosantaana.com",
  locationShort: "Vía Sirivana · A 10 minutos de Yopal",
  salesRoom: "Km 2, vía Sirivana, Yopal, Casanare",
  phoneDisplay: "321 265 3172",
  phoneIntl: "+57 321 265 3172",
  phoneHref: "tel:+573212653172",
  whatsappBase: "https://wa.me/573212653172",
  whatsappGreeting:
    "Hola, quisiera recibir información sobre Santa ANA Condominio Campestre y los lotes disponibles.",
  legalName: "CONSTRUCTORA E INMOBILIARIA SANTA ANA S.A.S.",
  nit: "901.954.217-3",
  renderDisclaimer:
    "Imágenes render de referencia. No representan el diseño final y están sujetas a modificaciones.",
} as const;

// Capacidad de la zona social (hasta 150 personas): no aparece en el material oficial
// del proyecto disponible localmente. Activar solo cuando el cliente la confirme por escrito.
export const SHOW_SOCIAL_CAPACITY = false;

export function whatsappLink(message: string = SITE.whatsappGreeting) {
  return `${SITE.whatsappBase}?text=${encodeURIComponent(message)}`;
}

export const LOTS = {
  housing: { count: 50, from: "606,28", to: "901,65" },
  commercial: { count: 7, from: "1.150,07", to: "1.479,63" },
} as const;

export type NavItem = { href: string; label: string };

export const NAV: NavItem[] = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#ubicacion", label: "El proyecto" },
  { href: "/#implantacion", label: "Implantación" },
  { href: "/#amenidades", label: "Zonas comunes" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

export const SOCIAL = {
  facebook: "https://www.facebook.com/profile.php?id=61558592373985",
  instagram: "https://www.instagram.com/km2sirivana/",
  tiktok: "https://vt.tiktok.com/ZSbby1KU1/",
} as const;

export const LEGAL_LINKS: NavItem[] = [
  { href: "/politica-de-privacidad", label: "Política de Privacidad" },
  { href: "/terminos-y-condiciones", label: "Términos y Condiciones" },
  { href: "/politica-de-cookies", label: "Política de Cookies" },
];
