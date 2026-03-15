/* =====================================================
   main.js — Portfolio modern JS
   Features: dark mode, mobile nav, typing effect,
   skill bar animation, scroll progress, counter,
   back-to-top, contact form, active nav tracking
===================================================== */

'use strict';

// ── Dark Mode ──────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
}

// ── Mobile Nav ─────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

// Inject overlay element
const overlay = document.createElement('div');
overlay.className = 'nav__overlay';
document.body.appendChild(overlay);

function openNav() {
  navMenu.classList.add('show');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeNav() {
  navMenu.classList.remove('show');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  navMenu.classList.contains('show') ? closeNav() : openNav();
});
overlay.addEventListener('click', closeNav);

// Close nav + set active link on click
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    closeNav();
  });
});

// ── Active link on scroll ──────────────────────────
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top    = section.offsetTop - 80;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav__link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < bottom);
    }
  });
}

// ── Scroll Progress Bar ────────────────────────────
const progressBar = document.getElementById('scroll-progress');

function updateScrollProgress() {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}

// ── Header shadow on scroll ────────────────────────
const header = document.getElementById('header');

function handleHeaderScroll() {
  header.classList.toggle('scrolled', window.scrollY > 50);
}

// ── Back to Top ────────────────────────────────────
const backToTop = document.getElementById('back-to-top');

function handleBackToTop() {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}

// Unified scroll handler
window.addEventListener('scroll', () => {
  updateScrollProgress();
  handleHeaderScroll();
  handleBackToTop();
  highlightNav();
});

// ── Typing Effect ──────────────────────────────────
const typedEl   = document.getElementById('typed-text');
const phrases   = ['Cloud Engineer', 'Azure Specialist', 'DevOps Enthusiast', 'SSO Expert'];
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;

function type() {
  const current = phrases[phraseIndex];
  typedEl.textContent = isDeleting
    ? current.slice(0, charIndex--)
    : current.slice(0, charIndex++);

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length + 1) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === -1) {
    isDeleting = false;
    charIndex  = 0;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }
  setTimeout(type, delay);
}
type();

// ── Skill Bars Animation ───────────────────────────
const skillFills = document.querySelectorAll('.skills__bar-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill  = entry.target;
      const width = fill.getAttribute('data-width');
      fill.style.width = width + '%';
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ── Counter Animation (About stats) ───────────────
const counters = document.querySelectorAll('.about__stat-number');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.getAttribute('data-target'), 10);
    let count    = 0;
    const step   = Math.max(1, Math.ceil(target / 40));
    const timer  = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count;
      if (count >= target) clearInterval(timer);
    }, 40);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });

counters.forEach(c => counterObserver.observe(c));

// ── Contact Form (Formspree) ───────────────────────
const contactForm   = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.contact__button');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        contactStatus.textContent = '✓ Message sent! I will get back to you soon.';
        contactForm.reset();
      } else {
        contactStatus.textContent = '✗ Something went wrong. Please try again.';
      }
    } catch {
      contactStatus.textContent = '✗ Network error. Please try again later.';
    } finally {
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }
  });
}

// ── ScrollReveal ───────────────────────────────────
const sr = ScrollReveal({
  origin: 'bottom',
  distance: '40px',
  duration: 700,
  delay: 100,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  reset: false,
});

sr.reveal('.home__greeting, .home__title, .home__typing-wrapper, .home__description', { interval: 100 });
sr.reveal('.home__buttons', { delay: 400 });
sr.reveal('.home__social', { delay: 500 });
sr.reveal('.home__img', { origin: 'right', delay: 300 });
sr.reveal('.home__scroll', { delay: 700 });

sr.reveal('.about__img', { origin: 'left' });
sr.reveal('.about__subtitle, .about__text', { interval: 120 });
sr.reveal('.about__stat', { interval: 150, delay: 200 });

sr.reveal('.skills__subtitle, .skills__text', {});
sr.reveal('.skills__data', { interval: 100 });
sr.reveal('.skills__cert-card', { delay: 300 });
sr.reveal('.skills__tag', { interval: 60, delay: 400 });

sr.reveal('.work__card', { interval: 150 });

sr.reveal('.contact__info-item', { interval: 120 });
sr.reveal('.contact__form-group', { interval: 100 });

sr.reveal('.footer__brand, .footer__links, .footer__social', { interval: 150 });


