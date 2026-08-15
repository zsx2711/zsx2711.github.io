// =========================================================
// Desktop Satellite · by Zhoushengxun
// Subtle starfield + scroll-reveal effects
// =========================================================

/* ---------- Starfield background ---------- */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];
let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  buildStars();
}

function buildStars() {
  const count = Math.min(160, Math.floor((w * h) / 9000));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.4 + 0.2,
    speed: Math.random() * 0.18 + 0.03,
    twinkle: Math.random() * Math.PI * 2,
  }));
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  for (const s of stars) {
    s.y += s.speed;
    if (s.y > h) {
      s.y = -2;
      s.x = Math.random() * w;
    }
    s.twinkle += 0.02;
    const alpha = 0.35 + 0.4 * Math.abs(Math.sin(s.twinkle));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(230, 240, 255, ${alpha})`;
    ctx.fill();
  }
  requestAnimationFrame(draw);
}

resize();
window.addEventListener("resize", resize);
draw();

/* ---------- Reveal on scroll ---------- */
const revealables = document.querySelectorAll(".section-head, .feature, .flow-step, .gallery-item, .creator-card, .compare, .fact, .timeline-item, .part");

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealables.forEach((el) => {
  el.classList.add("reveal");
  io.observe(el);
});

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Video play overlay ---------- */
const video = document.getElementById("demo-video");
const overlay = document.getElementById("video-overlay");

overlay.addEventListener("click", () => {
  video.classList.remove("playing");
  overlay.classList.remove("playing");
  video.play();
});

video.addEventListener("play", () => {
  video.classList.add("playing");
  overlay.classList.add("playing");
  if (overlay.parentElement) overlay.parentElement.classList.add("playing");
});
video.addEventListener("pause", () => {
  video.classList.remove("playing");
  if (overlay.parentElement) overlay.parentElement.classList.remove("playing");
});
video.addEventListener("ended", () => {
  video.classList.remove("playing");
  if (overlay.parentElement) overlay.parentElement.classList.remove("playing");
});

/* ---------- Lightbox ---------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector(".lightbox-img");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
const galleryImages = Array.from(document.querySelectorAll(".gallery-item img"));
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function updateLightbox() {
  const img = galleryImages[currentIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = img.closest("figure").querySelector("figcaption").textContent;
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

galleryImages.forEach((img, i) => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => openLightbox(i));
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.querySelector(".lightbox-prev").addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightbox();
});
lightbox.querySelector(".lightbox-next").addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % galleryImages.length;
  updateLightbox();
});

// 键盘导航：Esc 关闭，左右切换
document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
  }
  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateLightbox();
  }
});

/* ---------- Live telemetry (simulated drift) ---------- */
const tTemp = document.getElementById("t-temp");
const tHum = document.getElementById("t-hum");
const tBatt = document.getElementById("t-batt");
let temp = 23.4;
let hum = 54;
let batt = 82;

setInterval(() => {
  // gentle random walk so the telemetry feels alive without being distracting
  temp += (Math.random() - 0.5) * 0.4;
  hum += (Math.random() - 0.5) * 0.8;
  batt = Math.max(60, Math.min(95, batt + (Math.random() - 0.5)));
  tTemp.textContent = `${temp.toFixed(1)}°C`;
  tHum.textContent = `${Math.round(hum)}%`;
  tBatt.textContent = `${Math.round(batt)}%`;
}, 3000);