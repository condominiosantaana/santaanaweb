// Genera versiones web de los recursos oficiales.
// Los archivos originales (IMAGENES RENDER, IMAGENES INSPIRACION, LOGO SANTAANA) no se modifican.
// Uso: npm run images
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const out = (...p) => path.join(root, ...p);

const IVORY = { r: 247, g: 243, b: 234 };
const FOREST = { r: 47, g: 58, b: 43 };

// Renders: se generan a partir de los maestros PNG sin pérdida (1536 × 1024) de "IMAGENES OPTMINZAR".
// Se guardan como WebP de alta fidelidad para que Next.js derive las variantes AVIF/WebP sin acumular pérdidas.
// Los JPG anteriores (generados desde los JPG de ~920 px) se conservan en public/images/renders para poder revertir.
const RENDER_SRC = out("IMAGENES RENDER", "IMAGENES OPTMINZAR");
const renders = {
  "Parque dorado junto al árbol gigante.png": "arbol-nativo.webp",
  "Resort tropical al atardecer.png": "lago-zona-social.webp",
  "Pabellón Dorado junto al Lago.png": "salon-social-lago.webp",
  "Lounge tropical al atardecer bajo pérgola.png": "terraza-pergola.webp",
  "Entrada tropical de lujo al atardecer.png": "porteria.webp",
  "Parque dorado con casa del árbol.png": "casa-del-arbol.webp",
  "Parque infantil al atardecer familiar.png": "parque-infantil.webp",
  "Parque al atardecer bajo la pérgola verde.png": "parque-pergola.webp",
  "Cancha tropical al atardecer.png": "cancha-padel.webp",
  "Capilla tropical al atardecer.png": "oratorio.webp",
  "ZONA-SOCIAL-NUEVA-1.jpg": "zona-social-pabellon.webp",
};

// Planos de zonificación (2688 × 1790). Se conserva la resolución completa para poder ampliarlos.
const planos = {
  "zonificación-1.jpg": "zonificacion-planta.webp",
  "zonificación-2.jpg": "zonificacion-aerea.webp",
};

// Fotografías de ambiente (no muestran instalaciones del proyecto).
const paisajes = {
  "5.jpg": "llano-familia.jpg",
  "6.jpg": "llano-arbol.jpg",
};

const LOGO = out("LOGO SANTAANA", "Santa-Ana-logo-final-con-slogan.png");
// Recortes medidos sobre el PNG oficial (2355 × 2193).
const LOCKUP = { left: 481, top: 603, width: 1844 - 481 + 1, height: 1321 - 603 + 1 };
const FULL = { left: 481, top: 603, width: 1844 - 481 + 1, height: 1569 - 603 + 1 };
const MARK = { left: 481, top: 603, width: 1013 - 481 + 1, height: 1321 - 603 + 1 };

async function recolor(input, { r, g, b }) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }
  return sharp(data, { raw: info }).png({ compressionLevel: 9 });
}

async function main() {
  await mkdir(out("public", "images", "renders"), { recursive: true });
  await mkdir(out("public", "images", "paisaje"), { recursive: true });
  await mkdir(out("public", "images", "implantacion"), { recursive: true });
  await mkdir(out("public", "brand"), { recursive: true });

  for (const [src, dest] of Object.entries(renders)) {
    await sharp(path.join(RENDER_SRC, src))
      .webp({ quality: 95, effort: 6, smartSubsample: true })
      .toFile(out("public", "images", "renders", dest));
  }
  for (const [src, dest] of Object.entries(planos)) {
    await sharp(path.join(RENDER_SRC, src))
      .webp({ quality: 95, effort: 6, smartSubsample: true })
      .toFile(out("public", "images", "implantacion", dest));
  }
  for (const [src, dest] of Object.entries(paisajes)) {
    await sharp(out("IMAGENES INSPIRACION", src))
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(out("public", "images", "paisaje", dest));
  }

  const lockup = await sharp(LOGO).extract(LOCKUP).resize({ width: 900 }).png().toBuffer();
  const full = await sharp(LOGO).extract(FULL).resize({ width: 900 }).png().toBuffer();
  const mark = await sharp(LOGO).extract(MARK).png().toBuffer();

  await sharp(lockup).png({ compressionLevel: 9 }).toFile(out("public", "brand", "logo-color.png"));
  await (await recolor(lockup, IVORY)).toFile(out("public", "brand", "logo-ivory.png"));
  await sharp(full).png({ compressionLevel: 9 }).toFile(out("public", "brand", "logo-slogan-color.png"));
  await (await recolor(full, IVORY)).toFile(out("public", "brand", "logo-slogan-ivory.png"));

  // Favicon: isotipo sobre fondo transparente, centrado en un lienzo cuadrado.
  const square = (size, pad, background) =>
    sharp(mark)
      .resize({ width: size - pad * 2, height: size - pad * 2, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .extend({ top: pad, bottom: pad, left: pad, right: pad, background })
      .png({ compressionLevel: 9 });
  await square(512, 24, { r: 0, g: 0, b: 0, alpha: 0 }).toFile(out("app", "icon.png"));
  await square(180, 22, { ...IVORY, alpha: 1 }).flatten({ background: IVORY }).toFile(out("app", "apple-icon.png"));

  // Imagen para redes sociales (Open Graph) 1200 × 630.
  const ivoryLogo = await (await recolor(lockup, IVORY)).resize({ width: 520 }).toBuffer();
  const shade = Buffer.from(
    `<svg width="1200" height="630"><rect width="1200" height="630" fill="rgb(${FOREST.r},${FOREST.g},${FOREST.b})" fill-opacity="0.55"/></svg>`,
  );
  await sharp(path.join(RENDER_SRC, "Resort tropical al atardecer.png"))
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .composite([{ input: shade }, { input: ivoryLogo, gravity: "centre" }])
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(out("app", "opengraph-image.jpg"));

  console.log("Imágenes generadas.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
