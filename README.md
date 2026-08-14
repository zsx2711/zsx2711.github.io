# 🛰️ Desktop Satellite · by Zhoushengxun

A hand-soldered, solar-powered miniature satellite that brings **live temperature &amp; humidity** to your desk.

Built piece by piece — every board, wire and solder joint made by hand. It captures room light with a
solar panel, runs on its own without a cable, and shows the current temperature and humidity on a small
onboard display.

## ✨ Features

- **Solar powered** — a compact photovoltaic panel harvests indoor light
- **Live temperature** — onboard sensor reads the ambient temperature in real time
- **Humidity monitor** — relative humidity measured continuously
- **Hand-soldered** — assembled entirely by hand, no ready-made kit
- **Clear display** — OLED / LCD shows both readings at a glance
- **Always on** — stores sunlight so it keeps running through the evening

## 🔧 How it works

```
☀️ Solar panel  →  ⚡ Regulate & store power  →  🧠 Microcontroller reads sensor  →  🖥️ Display
```

Core building blocks: solar panel · microcontroller · temperature/humidity sensor (e.g. DHT11/DHT22) ·
OLED/LCD display · wiring &amp; solder.

## 📁 Project structure

```
├── index.html          # Showcase site (English)
├── css/style.css       # Styles + space theme
├── js/script.js        # Starfield & scroll-reveal effects
├── images/             # Gallery photos (img1–img5)
├── .github/workflows/pages.yml   # GitHub Pages auto-deploy
└── README.md
```

## 🚀 Deployment

The repo includes a GitHub Actions workflow that deploys the site to GitHub Pages automatically.
Then it's live at `https://zsx2711.github.io/`.

## 📄 License

MIT License — see [LICENSE](./LICENSE).