// Optimize showcase images: resize to web size, compress, lightly brighten.
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const IMG_DIR = path.join(__dirname, "..", "images");
const TARGETS = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.png", "img5.jpg"];

async function optimize(name) {
  const file = path.join(IMG_DIR, name);
  if (!fs.existsSync(file)) {
    console.log(`skip (missing): ${name}`);
    return;
  }
  // Align orientation from EXIF, resize to max 1200 on the long edge, lighten darks.
  const out = await sharp(file, { failOn: "none" })
    .rotate()
    .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
    .modulate({ brightness: 1.06, saturation: 1.05 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  const outName = name.endsWith(".png") ? "img4.jpg" : name; // normalize to jpg
  const tmp = path.join(IMG_DIR, outName + ".tmp.jpg");
  await sharp(out).toFile(tmp);
  fs.renameSync(tmp, path.join(IMG_DIR, outName));
  const before = fs.statSync(file).size;
  console.log(
    `ok: ${name} -> ${outName}  ${(before / 1024).toFixed(0)}KB -> ${(out.length / 1024).toFixed(0)}KB`
  );
}

(async () => {
  // Remove the old PNG so the gallery switch to .jpg is clean.
  const oldPng = path.join(IMG_DIR, "img4.png");
  if (fs.existsSync(oldPng)) fs.unlinkSync(oldPng);

  for (const t of TARGETS) await optimize(t);
  console.log("done");
})();