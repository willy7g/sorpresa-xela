/* ============================================
   SORPRESA PARA MI ESPOSA - Xela 2026
   ============================================ */

// ====== FECHA DEL VIAJE ======
const TRIP_DATE = new Date('2026-12-12T15:00:00').getTime();

// ====== CANVAS DE ESTRELLAS ======
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
let shootingStars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createStars();
}

function createStars() {
  stars = [];
  const count = Math.floor((canvas.width * canvas.height) / 8000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.7 + 0.3,
      twinkle: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.opacity += star.twinkle * star.direction;
    if (star.opacity >= 1 || star.opacity <= 0.2) {
      star.direction *= -1;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.fill();

    if (star.radius > 1.2) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 200, 220, ${star.opacity * 0.1})`;
      ctx.fill();
    }
  });

  shootingStars.forEach((s, i) => {
    s.x += s.vx;
    s.y += s.vy;
    s.life -= 1;

    const gradient = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 10, s.y - s.vy * 10);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${s.life / 100})`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.vx * 10, s.y - s.vy * 10);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();

    if (s.life <= 0) shootingStars.splice(i, 1);
  });

  requestAnimationFrame(drawStars);
}

function createShootingStar() {
  if (Math.random() > 0.985) {
    shootingStars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,
      vx: 4 + Math.random() * 3,
      vy: 2 + Math.random() * 2,
      life: 100
    });
  }
  setTimeout(createShootingStar, 500);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawStars();
createShootingStar();

// ====== CORAZONES FLOTANTES ======
const heartsContainer = document.getElementById('hearts');
const heartEmojis = ['💖', '💕', '💗', '💓', '✨', '🌸', '💝'];

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 100 + '%';
  heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
  heart.style.animationDuration = (Math.random() * 6 + 8) + 's';
  heart.style.animationDelay = Math.random() * 2 + 's';

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 16000);
}

setInterval(createHeart, 1200);
for (let i = 0; i < 5; i++) {
  setTimeout(createHeart, i * 400);
}

// ====== INTRO Y REVELAR CONTENIDO ======
const intro = document.getElementById('intro');
const main = document.getElementById('main');
const openBtn = document.getElementById('openBtn');

openBtn.addEventListener('click', () => {
  intro.classList.add('hidden');
  main.classList.add('visible');

  // 🔧 FIX SCROLL: quitar el bloqueo del body
  document.body.classList.remove('intro-active');
  document.body.classList.add('intro-done');

  // Explosión de corazones
  for (let i = 0; i < 15; i++) {
    setTimeout(createHeart, i * 80);
  }

  // 🔧 Asegurar que el scroll quede arriba y funcional
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    initReveals();
  }, 300);
});

// ====== CUENTA REGRESIVA ======
function updateCountdown() {
  const now = new Date().getTime();
  const distance = TRIP_DATE - now;

  if (distance < 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ====== REVEAL AL SCROLL ======
function initReveals() {
  const elementsToReveal = document.querySelectorAll(
    '.countdown-section, .details, .airbnb-section, .letter, .footer, .card'
  );

  elementsToReveal.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elementsToReveal.forEach(el => observer.observe(el));
}

// ====== MODAL FINAL ======
const finalBtn = document.getElementById('finalBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

finalBtn.addEventListener('click', () => {
  modal.classList.add('active');

  for (let i = 0; i < 30; i++) {
    setTimeout(createHeart, i * 50);
  }
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// ====== EFECTO PARALLAX SUAVE ======
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
  }
});

console.log('%c💖 ¡Sorpresa cargada con amor! 💖', 'color: #ff4d8d; font-size: 20px; font-weight: bold;');