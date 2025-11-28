/* ===========================
   SCRIPT.JS - ULTRA PRO
=========================== */

/* DOMContentLoaded */
document.addEventListener('DOMContentLoaded', function () {
  // ----------------------
  // PRELOADER
  // ----------------------
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    if (preloader) preloader.style.opacity = 0;
    setTimeout(() => preloader && preloader.remove(), 500);
  }, 700);

  // ----------------------
  // ACTUALIZAR AÑO
  // ----------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----------------------
  // BURGER MENU
  // ----------------------
  const btnBurger = document.getElementById('btn-burger');
  if (btnBurger) {
    btnBurger.addEventListener('click', () => {
      const expanded = btnBurger.getAttribute('aria-expanded') === 'true';
      btnBurger.setAttribute('aria-expanded', !expanded);
      document.body.classList.toggle('menu-open');
    });
  }

  // ----------------------
  // PARALLAX HERO
  // ----------------------
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroBg) {
      const speed = parseFloat(heroBg.dataset.speed) || 0.4;
      heroBg.style.transform = `translateY(${scrolled * speed * -0.2}px) scale(1.02)`;
    }
    revealOnScroll();
  }, {passive:true});

  // ----------------------
  // REVEAL ANIMATIONS
  // ----------------------
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const offset = window.innerHeight * 0.85;
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < offset) el.classList.add('show');
    });
  }
  revealOnScroll();

  // ----------------------
  // CAROUSEL
  // ----------------------
  const track = document.getElementById('carousel-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  if (track) {
    let index = 0;
    const slides = Array.from(track.querySelectorAll('.slide'));
    const gap = 18; // espacio entre slides

    const slideWidth = () => slides[0]?.getBoundingClientRect().width || 320;

    function updateCarousel() {
      const maxIndex = slides.length - Math.floor(track.offsetWidth / slideWidth());
      if (index > maxIndex) index = maxIndex >= 0 ? maxIndex : 0;
      if (index < 0) index = 0;
      track.style.transform = `translateX(-${index * (slideWidth() + gap)}px)`;
    }

    nextBtn && nextBtn.addEventListener('click', () => {
      index++;
      updateCarousel();
    });

    prevBtn && prevBtn.addEventListener('click', () => {
      index--;
      updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
  }

  // ----------------------
  // SMOOTH SCROLL LINKS
  // ----------------------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // cerrar menú móvil
        if (document.body.classList.contains('menu-open')) {
          document.body.classList.remove('menu-open');
          btnBurger && btnBurger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
});

// ----------------------
// FORMULARIO -> WHATSAPP
// ----------------------
function openWhatsAppFromForm(e) {
  e.preventDefault();
  const name = encodeURIComponent(document.getElementById('name').value || '');
  const phone = encodeURIComponent(document.getElementById('phone').value || '');
  const email = encodeURIComponent(document.getElementById('email').value || '');
  const message = encodeURIComponent(document.getElementById('message').value || '');

  const text = `Hola PP Producciones.%0A%0A*Nombre:* ${name}%0A*Teléfono:* ${phone}%0A*Email:* ${email}%0A*Mensaje:* ${message}`;
  const phoneNumber = '573133683243'; // formato internacional
  const url = `https://wa.me/${phoneNumber}?text=${text}`;

  window.open(url, '_blank', 'noopener');
}
