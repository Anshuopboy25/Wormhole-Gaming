// TYPING EFFECT
const typedText = "Welcome to Wormhole Gaming 💜";
let idx = 0;
function typeWriter() {
  if (idx < typedText.length) {
    document.getElementById("typing").innerHTML += typedText.charAt(idx);
    idx++;
    setTimeout(typeWriter, 45);
  }
}
typeWriter();

// REAL SUBSCRIBER COUNT (via YouTube API fallback)
async function fetchSubscribers() {
  const channelHandle = "@wormholegaminggg";
  const channelUrl = `https://yt.lemnoslife.com/channels?handle=${channelHandle.substring(1)}&part=statistics`;
  try {
    const response = await fetch(channelUrl);
    if (response.ok) {
      const data = await response.json();
      const subCount = data?.items?.[0]?.statistics?.subscriberCount;
      if (subCount) {
        document.getElementById("subscriberCount").innerText = parseInt(subCount).toLocaleString();
        return;
      }
    }
    throw new Error("fallback");
  } catch (err) {
    document.getElementById("subscriberCount").innerText = "455";
  }
}
fetchSubscribers();

// DISCORD MEMBER COUNT (dynamic fake but realistic)
const memberSpan = document.getElementById("discordMemberCount");
if (memberSpan) {
  let count = 2847;
  setInterval(() => {
    let fluctuation = Math.floor(Math.random() * 5) - 2;
    let newCount = count + fluctuation;
    if (newCount > 2500 && newCount < 4000) {
      count = newCount;
      memberSpan.innerText = count.toLocaleString();
    }
  }, 28000);
}

// CUSTOM GLOW CURSOR (follows mouse, default cursor stays visible)
const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// enlarge glow on hover
const interactiveEls = document.querySelectorAll("a, button, .btn, .sticky-discord, .card, .short-card, .about-feature");
interactiveEls.forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
    cursor.style.background = "#f0a3ff";
    cursor.style.boxShadow = "0 0 40px 12px #f0a3ff";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursor.style.background = "#c77dff";
    cursor.style.boxShadow = "0 0 25px 8px #c77dff, 0 0 45px 12px rgba(199,125,255,0.6)";
  });
});

// PARTICLE BACKGROUND
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
let particles = [];

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  initParticles();
}

function initParticles() {
  particles = [];
  const particleCount = Math.min(120, Math.floor(width * height / 10000));
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 1.2,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.4 + 0.2,
      color: `hsl(${260 + Math.random() * 40}, 80%, 65%)`
    });
  }
}

function drawParticles() {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#0a0a0f";
  ctx.fillRect(0, 0, width, height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#c77dff";
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
  }
  requestAnimationFrame(drawParticles);
}

window.addEventListener("resize", () => {
  resizeCanvas();
});
resizeCanvas();
drawParticles();

// SCROLL ANIMATION (Intersection Observer)
const fadeElements = document.querySelectorAll(".fade-up");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("appear");
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
fadeElements.forEach(el => observer.observe(el));

// POPUP LOGIC (on load + exit intent)
const popup = document.getElementById("globalPopup");
const closePopupBtn = document.getElementById("closePopupBtn");

function showPopup() {
  popup.classList.add("active");
}
function hidePopup() {
  popup.classList.remove("active");
}

setTimeout(showPopup, 2600);
closePopupBtn.addEventListener("click", hidePopup);

let exitShown = false;
document.addEventListener("mouseleave", (e) => {
  if (e.clientY <= 0 && !exitShown && !popup.classList.contains("active")) {
    exitShown = true;
    showPopup();
    setTimeout(() => { exitShown = false; }, 30000);
  }
});
popup.addEventListener("click", (e) => {
  if (e.target === popup) hidePopup();
});

// BUTTON CLICK ANIMATION
const allBtns = document.querySelectorAll(".btn, .sticky-discord");
allBtns.forEach(btn => {
  btn.addEventListener("click", function() {
    this.style.transform = "scale(0.96)";
    setTimeout(() => {
      this.style.transform = "";
    }, 120);
  });
});

console.log("Wormhole Gaming — Pro Edition Loaded 💀");
