// Overlay a telemetry "display" onto the solar-panel photo (img2.jpg).
const sharp = require("sharp");
const path = require("path");

const IMG = path.join(__dirname, "..", "images");
const src = path.join(IMG, "img2.jpg");
const out = path.join(IMG, "img2-telemetry.jpg");

// 900x1200 canvas; a rounded OLED-style screen sits over the solar panel.
const overlay = `
<svg width="900" height="1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="b"/>
    </filter>
  </defs>

  <!-- ambient darkening so the panel reads as a display -->
  <rect x="150" y="120" width="600" height="360" rx="22" fill="rgba(6,10,24,0.55)"/>

  <!-- screen bezel -->
  <rect x="178" y="148" width="544" height="304" rx="16" fill="#071022"/>
  <rect x="178" y="148" width="544" height="304" rx="16" fill="none" stroke="#6ee7e0" stroke-opacity="0.35" stroke-width="1.5"/>

  <!-- header -->
  <text x="450" y="196" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="20" letter-spacing="4" fill="#6ee7e0">LIVE TELEMETRY</text>
  <circle cx="300" cy="190" r="5" fill="#6ee7e0" filter="url(#glow)"/>

  <!-- temperature (LARGE) -->
  <text x="450" y="300" text-anchor="middle" font-family="Space Grotesk, Segoe UI, sans-serif" font-size="64" font-weight="700" fill="#ffffff">23.4°C</text>
  <text x="450" y="330" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="16" letter-spacing="3" fill="#9aa6c8">TEMPERATURE</text>

  <!-- divider -->
  <line x1="260" y1="360" x2="640" y2="360" stroke="#26304f" stroke-width="1.5"/>

  <!-- humidity -->
  <text x="450" y="410" text-anchor="middle" font-family="Space Grotesk, Segoe UI, sans-serif" font-size="44" font-weight="700" fill="#6ee7e0">54%</text>
  <text x="450" y="436" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="15" letter-spacing="3" fill="#9aa6c8">HUMIDITY</text>
</svg>`;

(async () => {
  const overlayBuf = Buffer.from(overlay);
  await sharp(src)
    .composite([{ input: overlayBuf }])
    .jpeg({ quality: 88 })
    .toFile(out);
  console.log("生成:", out);
})();