/* ═══════════════════════════════════════════════════
   FORMA STUDIO — shared.js
   Common JS: nav scroll, hamburger, fade-up, counters
═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── NAV SCROLL EFFECT ── */
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* ── HAMBURGER MENU ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  /* ── FADE-UP SCROLL REVEAL ── */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay) || 0;
            setTimeout(() => entry.target.classList.add('visible'), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(el => observer.observe(el));
  }

  /* ── ANIMATED COUNTERS ── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          let current  = 0;
          const step   = Math.ceil(target / 40);
          const timer  = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current + suffix;
            if (current >= target) clearInterval(timer);
          }, 32);
          cObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));
  }

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ── TOAST ── */
  window.showToast = function (message, duration = 3200) {
    let toast = document.getElementById('fs-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'fs-toast';
      toast.style.cssText = `
        display:none;position:fixed;bottom:32px;left:50%;
        transform:translateX(-50%);
        background:var(--ink);color:white;
        padding:14px 28px;
        font-weight:600;font-size:0.9rem;z-index:9000;
        box-shadow:0 8px 32px rgba(0,0,0,0.2);
        font-family:'DM Sans',sans-serif;white-space:nowrap;
        letter-spacing:0.01em;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = 'block';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.style.display = 'none', duration);
  };

})();