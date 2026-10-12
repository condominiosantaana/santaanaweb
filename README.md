# Santa ANA Condominio Campestre · sitio web

Landing page de **Santa ANA Condominio Campestre** (vía Sirivana, Yopal, Casanare).
Next.js 16 (App Router) + TypeScript + CSS Modules, sin librerías de animación ni de interfaz.

## Ejecutar en local

Requisitos: Node.js 20.9 o superior.

```bash
npm install
npm run dev
```

Abrir http://localhost:3000.

Compilación de producción:

```bash
npm run build
npm run start
```

Verificación de código: `npm run lint`.

## Estructura

```
app/                      Rutas, metadatos, sitemap, robots, iconos e imagen social
  page.tsx                Página principal (una sola página con anclas)
  politica-de-privacidad/ Política de tratamiento de datos
  terminos-y-condiciones/ Términos de uso
  politica-de-cookies/    Política de cookies
components/               Una pieza por sección (Hero, About, Location, Implantation,
                          Access, SocialZone, Amenities, Gallery, Contact, Footer…)
lib/site.ts               Datos oficiales: teléfono, WhatsApp, cifras de lotes, textos legales
lib/images.ts             Inventario de imágenes con texto alternativo y tipo (render / ilustrativa)
public/images, public/brand  Versiones web generadas a partir de los originales
scripts/prepare-images.mjs   Regenera esas versiones (`npm run images`)
```

Los archivos originales (`IMAGENES RENDER`, `IMAGENES INSPIRACION`, `LOGO SANTAANA`, `linea grafica web-0X.jpg`)
no se modifican.

### Renders

- Fuente: los PNG sin pérdida de 1536 × 1024 de `IMAGENES RENDER/IMAGENES OPTMINZAR`.
- `npm run images` genera `public/images/renders/*.webp`, en WebP de alta fidelidad. A partir de ahí Next.js sirve
  AVIF/WebP al tamaño de cada pantalla.
- `node scripts/optimize-renders.mjs` genera variantes independientes (WebP 1536/1024/640/320 y AVIF 1536/1024).
  También crea un informe y una hoja comparativa en `IMAGENES RENDER/IMAGENES OPTIMIZADAS WEB`.
- Si llegan renders de mayor resolución, póngalos en `IMAGENES OPTMINZAR` con el mismo nombre y vuelva a ejecutar
  ambos scripts.

**Revertir a los JPG anteriores:** en `lib/images.ts` cambie la extensión de las importaciones de
`public/images/renders/*.webp` a `.jpg`. Los JPG anteriores siguen en esa carpeta.

## Formulario de contacto

No hay backend. El formulario valida los datos y abre WhatsApp (`wa.me/573212653172`) con un mensaje
precompletado. El sitio no guarda datos personales.

## Pendiente antes de publicar

- Completar en las páginas legales los campos marcados en amarillo (razón social, NIT, domicilio, correo de
  atención, plazo de conservación).
- Confirmar por escrito la capacidad de 150 personas de la zona social y, si procede, activar
  `SHOW_SOCIAL_CAPACITY` en `lib/site.ts`.
- Renders en mayor resolución (los actuales miden ~920–1075 px de ancho).
- Plano de implantación oficial, si se desea publicar.
