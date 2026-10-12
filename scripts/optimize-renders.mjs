// Optimiza los renders maestros (PNG sin pérdida) para la web.
// Entrada:  IMAGENES RENDER/IMAGENES OPTMINZAR   (no se modifica)
// Salida:   IMAGENES RENDER/IMAGENES OPTIMIZADAS WEB
// Uso: node scripts/optimize-renders.mjs
//
// Para cada imagen se elige la calidad más baja que mantiene una fidelidad de luminancia >= 40 dB (PSNR-Y,
// la componente que el ojo percibe como nitidez) frente al original al mismo tamaño. Se informa también el
// PSNR en RGB. Nunca se amplía por encima de la resolución nativa.
import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const SRC = path.join(root, "IMAGENES RENDER", "IMAGENES OPTMINZAR");
const OUT = path.join(root, "IMAGENES RENDER", "IMAGENES OPTIMIZADAS WEB");
const TARGET_DB = 40;

const WIDTHS = [1536, 1024, 640, 320];
const AVIF_WIDTHS = [1536, 1024];
const WEBP_Q = [78, 82, 86, 90, 94];
const AVIF_Q = [55, 60, 65, 70, 76, 82, 88];

function psnr(a, b) {
  let se = 0;
  for (let i = 0; i < a.length; i++) {
    const d = a[i] - b[i];
    se += d * d;
  }
  const mse = se / a.length;
  return mse === 0 ? 99 : 10 * Math.log10((255 * 255) / mse);
}

const rawOf = (buf) => sharp(buf).removeAlpha().raw().toBuffer();
const lumaOf = (buf) => sharp(buf).removeAlpha().greyscale().raw().toBuffer();

async function encode(ref, format, quality) {
  const img = sharp(ref);
  return format === "webp"
    ? img.webp({ quality, effort: 6, smartSubsample: true }).toBuffer()
    : img.avif({ quality, effort: 6 }).toBuffer();
}

async function best(ref, format) {
  const refY = await lumaOf(ref);
  const refRgb = await rawOf(ref);
  const qs = format === "webp" ? WEBP_Q : AVIF_Q;
  let last;
  for (const q of qs) {
    const buf = await encode(ref, format, q);
    const db = psnr(refY, await lumaOf(buf));
    last = { buf, q, db };
    if (db >= TARGET_DB) break;
  }
  last.dbRgb = psnr(refRgb, await rawOf(last.buf));
  return last.db >= TARGET_DB ? last : { ...last, belowTarget: true };
}

// Recorte de 100 % con más detalle (para la hoja comparativa).
async function detailTile(file, w, h, tw, th) {
  const { data } = await sharp(file).resize(w, h).greyscale().raw().toBuffer({ resolveWithObject: true });
  let bestScore = -1;
  let pos = { left: 0, top: 0 };
  for (let y = 0; y + th <= h; y += th / 2)
    for (let x = 0; x + tw <= w; x += tw / 2) {
      let s = 0;
      for (let yy = y + 1; yy < y + th - 1; yy += 2)
        for (let xx = x + 1; xx < x + tw - 1; xx += 2) {
          const i = yy * w + xx;
          const l = 4 * data[i] - data[i - 1] - data[i + 1] - data[i - w] - data[i + w];
          s += l * l;
        }
      if (s > bestScore) {
        bestScore = s;
        pos = { left: x, top: y };
      }
    }
  return pos;
}

const kb = (n) => Math.round(n / 1024);

async function main() {
  if (!existsSync(SRC)) throw new Error(`No existe la carpeta de origen: ${SRC}`);
  mkdirSync(OUT, { recursive: true });

  const files = readdirSync(SRC).filter((f) => /\.(png|jpe?g|webp|tiff?)$/i.test(f)).sort();
  const planned = files.flatMap((f) => {
    const base = path.parse(f).name;
    return [...WIDTHS.map((w) => `${base}-${w}.webp`), ...AVIF_WIDTHS.map((w) => `${base}-${w}.avif`)];
  });
  const clash = planned.filter((n) => existsSync(path.join(OUT, n)));
  if (clash.length && !process.argv.includes("--overwrite")) {
    throw new Error(`La carpeta de salida ya contiene ${clash.length} archivos con los mismos nombres. Use --overwrite.`);
  }

  const report = [];
  const tiles = [];
  let totalSrc = 0;
  let totalOut = 0;

  for (const f of files) {
    const src = path.join(SRC, f);
    const base = path.parse(f).name;
    const meta = await sharp(src).metadata();
    const srcSize = statSync(src).size;
    totalSrc += srcSize;
    const row = { original: f, size: `${meta.width}x${meta.height}`, kb: kb(srcSize), outputs: [] };

    for (const w of WIDTHS) {
      const width = Math.min(w, meta.width);
      const ref = await sharp(src).resize({ width, kernel: "lanczos3" }).png().toBuffer();
      const formats = AVIF_WIDTHS.includes(w) ? ["webp", "avif"] : ["webp"];
      for (const format of formats) {
        const r = await best(ref, format);
        const name = `${base}-${w}.${format}`;
        writeFileSync(path.join(OUT, name), r.buf);
        totalOut += r.buf.length;
        row.outputs.push({ name, width, q: r.q, db: r.db.toFixed(1), dbRgb: r.dbRgb.toFixed(1), kb: kb(r.buf.length), belowTarget: !!r.belowTarget });
      }
    }
    report.push(row);

    // Comparativa al 100 %: JPG publicado antes (ampliado como lo mostraba la web) | WebP nuevo | PNG original.
    const oldJpg = readdirSync(path.join(root, "IMAGENES RENDER")).find(
      (j) => j.toLowerCase().endsWith(".jpg") && j.normalize("NFC").replace(/-/g, " ").replace(/\.jpg$/i, "") === base.normalize("NFC"),
    );
    const tw = 420;
    const th = 280;
    const pos = await detailTile(src, meta.width, meta.height, tw, th);
    const crop = (input) => sharp(input).resize(meta.width, meta.height, { fit: "fill" }).extract({ ...pos, width: tw, height: th }).png().toBuffer();
    const newWebp = path.join(OUT, `${base}-1536.webp`);
    tiles.push({
      label: base,
      cells: [oldJpg ? await crop(path.join(root, "IMAGENES RENDER", oldJpg)) : null, await crop(newWebp), await crop(src)],
    });
    console.log(`✓ ${f}`);
  }

  // Hoja comparativa
  const pad = 10;
  const head = 34;
  const label = 26;
  const tw = 420;
  const th = 280;
  const W = pad + 3 * (tw + pad);
  const H = head + tiles.length * (label + th + pad) + pad;
  const svgText = (t, x, y, size = 15, weight = 600) =>
    `<text x="${x}" y="${y}" font-family="Segoe UI, Arial" font-size="${size}" font-weight="${weight}" fill="#242b22">${t}</text>`;
  let svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">`;
  svg += svgText("ANTES: JPG publicado (ampliado)", pad, 24) + svgText("DESPUÉS: WebP 1536 optimizado", pad + tw + pad, 24) + svgText("ORIGINAL: PNG maestro", pad + 2 * (tw + pad), 24);
  const comps = [];
  tiles.forEach((t, i) => {
    const y = head + i * (label + th + pad);
    svg += svgText(t.label.replace(/&/g, "&amp;"), pad, y + 18, 13, 500);
    t.cells.forEach((c, k) => c && comps.push({ input: c, left: pad + k * (tw + pad), top: y + label }));
  });
  svg += "</svg>";
  await sharp({ create: { width: W, height: H, channels: 3, background: "#f7f3ea" } })
    .composite([{ input: Buffer.from(svg), left: 0, top: 0 }, ...comps])
    .jpeg({ quality: 90 })
    .toFile(path.join(OUT, "_COMPARATIVA-ANTES-DESPUES.jpg"));

  // Informe
  let md = `# Renders optimizados para web\n\nOrigen: \`IMAGENES RENDER/IMAGENES OPTMINZAR\` (sin modificar).\n`;
  md += `Criterio: menor calidad con fidelidad de luminancia >= ${TARGET_DB} dB (PSNR-Y) frente al original al mismo tamaño. Se indica también el PSNR en RGB (incluye el submuestreo de color propio de WebP/AVIF). Sin ampliaciones.\n\n`;
  md += `| Original | Dimensiones | Peso | Archivo generado | Ancho | Calidad | PSNR (dB) | Peso |\n|---|---|---|---|---|---|---|---|\n`;
  for (const r of report) {
    r.outputs.forEach((o, i) => {
      md += `| ${i ? "" : r.original} | ${i ? "" : r.size} | ${i ? "" : r.kb + " KB"} | ${o.name} | ${o.width} | ${o.q} | ${o.db}${o.belowTarget ? " ⚠" : ""} | ${o.dbRgb} | ${o.kb} KB |\n`;
    });
  }
  md += `\nTotal originales: ${kb(totalSrc)} KB · Total generado (todas las variantes): ${kb(totalOut)} KB\n`;
  writeFileSync(path.join(OUT, "_INFORME.md"), md);
  writeFileSync(path.join(OUT, "_informe.json"), JSON.stringify({ totalSrc, totalOut, report }, null, 2));
  console.log(`Total originales ${kb(totalSrc)} KB → generado ${kb(totalOut)} KB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
