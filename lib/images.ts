import type { StaticImageData } from "next/image";

import arbolNativo from "@/public/images/renders/arbol-nativo.jpg";
import lagoZonaSocial from "@/public/images/renders/lago-zona-social.jpg";
import salonSocialLago from "@/public/images/renders/salon-social-lago.jpg";
import terrazaPergola from "@/public/images/renders/terraza-pergola.jpg";
import porteria from "@/public/images/renders/porteria.jpg";
import casaDelArbol from "@/public/images/renders/casa-del-arbol.jpg";
import parqueInfantil from "@/public/images/renders/parque-infantil.jpg";
import parquePergola from "@/public/images/renders/parque-pergola.jpg";
import canchaPadel from "@/public/images/renders/cancha-padel.jpg";
import oratorio from "@/public/images/renders/oratorio.jpg";
import llanoArbol from "@/public/images/paisaje/llano-arbol.jpg";
import llanoFamilia from "@/public/images/paisaje/llano-familia.jpg";

export type Photo = {
  src: StaticImageData;
  alt: string;
  caption: string;
  /** "render": render oficial del proyecto. "ambiente": fotografía ilustrativa del paisaje, no del proyecto. */
  kind: "render" | "ambiente";
};

export const PHOTOS = {
  arbolNativo: {
    src: arbolNativo,
    alt: "Render del parque bajo un gran árbol nativo, con la Casa del Árbol y juegos infantiles al atardecer",
    caption: "Parque junto al árbol nativo",
    kind: "render",
  },
  lagoZonaSocial: {
    src: lagoZonaSocial,
    alt: "Render del lago central con la zona social al fondo, rodeada de palmas al atardecer",
    caption: "Lago central y zona social",
    kind: "render",
  },
  salonSocialLago: {
    src: salonSocialLago,
    alt: "Render del salón social de piedra, ladrillo y pérgola de madera a orillas del lago",
    caption: "Salón social junto al lago",
    kind: "render",
  },
  terrazaPergola: {
    src: terrazaPergola,
    alt: "Render de la terraza bajo pérgola de madera con sillones y vista a la cancha de pádel",
    caption: "Terraza bajo pérgola",
    kind: "render",
  },
  porteria: {
    src: porteria,
    alt: "Render de la portería del condominio con acceso vehicular y peatonal entre palmas",
    caption: "Portería y acceso principal",
    kind: "render",
  },
  casaDelArbol: {
    src: casaDelArbol,
    alt: "Render de la Casa del Árbol construida alrededor de un árbol nativo, con tobogán verde y puente de cuerdas",
    caption: "Casa del Árbol",
    kind: "render",
  },
  parqueInfantil: {
    src: parqueInfantil,
    alt: "Render del parque infantil con columpios y juegos bajo una pérgola cubierta de vegetación",
    caption: "Parque infantil",
    kind: "render",
  },
  parquePergola: {
    src: parquePergola,
    alt: "Render de la zona de juegos bajo la pérgola verde con asientos de colores",
    caption: "Parque bajo la pérgola verde",
    kind: "render",
  },
  canchaPadel: {
    src: canchaPadel,
    alt: "Render de la cancha de pádel rodeada de palmas y jardines",
    caption: "Cancha de pádel",
    kind: "render",
  },
  oratorio: {
    src: oratorio,
    alt: "Render del oratorio de cubierta triangular en madera y ladrillo con sendero de piedra",
    caption: "Oratorio",
    kind: "render",
  },
  llanoArbol: {
    src: llanoArbol,
    alt: "Niño corriendo hacia un árbol en la llanura al atardecer",
    caption: "Paisaje llanero · fotografía ilustrativa",
    kind: "ambiente",
  },
  llanoFamilia: {
    src: llanoFamilia,
    alt: "Familia caminando de la mano por un prado llanero hacia un gran árbol",
    caption: "Paisaje llanero · fotografía ilustrativa",
    kind: "ambiente",
  },
} satisfies Record<string, Photo>;

export const GALLERY: Photo[] = [
  PHOTOS.lagoZonaSocial,
  PHOTOS.arbolNativo,
  PHOTOS.salonSocialLago,
  PHOTOS.porteria,
  PHOTOS.casaDelArbol,
  PHOTOS.terrazaPergola,
  PHOTOS.parqueInfantil,
  PHOTOS.canchaPadel,
  PHOTOS.parquePergola,
  PHOTOS.oratorio,
];

export const SOCIAL_GALLERY: Photo[] = [PHOTOS.lagoZonaSocial, PHOTOS.salonSocialLago, PHOTOS.terrazaPergola];
