/* ═══════════════════════════════════════════════════════════
   SCRAMBLE TEXT — Characters randomize then resolve
   ═══════════════════════════════════════════════════════════ */
(function () {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&';

  function scramble(el, finalText, delay) {
    const total = 900;
    const frames = total / 16;
    let frame = 0;

    setTimeout(() => {
      const id = setInterval(() => {
        const progress = frame / frames;
        el.textContent = finalText.split('').map((char, i) => {
          if (char === ' ') return '\u00a0';
          if (i / finalText.length < progress) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');

        if (++frame > frames) {
          el.textContent = finalText;
          clearInterval(id);
        }
      }, 16);
    }, delay);
  }

  document.querySelectorAll('.k-scramble').forEach((el, i) => {
    scramble(el, el.dataset.text, 250 + i * 180);
  });
})();

/* ═══════════════════════════════════════════════════════════
   CUSTOM CURSOR — Dot + lagging ring
   ═══════════════════════════════════════════════════════════ */
(function () {
  if (window.matchMedia('(hover: none)').matches) return;

  const dot  = document.getElementById('k-cursor');
  const ring = document.getElementById('k-cursor-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function lerp(a, b, t) { return a + (b - a) * t; }
  function animateRing() {
    rx = lerp(rx, mx, 0.11);
    ry = lerp(ry, my, 0.11);
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .k-sr, .k-cc').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('k-hovered'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('k-hovered'));
  });
})();

/* ═══════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════ */
(function () {
  const nav       = document.getElementById('k-nav');
  const hamburger = document.getElementById('k-hamburger');
  const menu      = document.getElementById('k-nav-menu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  menu.querySelectorAll('.k-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL — with per-item stagger
   ═══════════════════════════════════════════════════════════ */
(function () {
  document.querySelectorAll('.k-sr').forEach((el, i) => {
    el.style.transitionDelay = `${i * 35}ms`;
  });
  document.querySelectorAll('.k-cr').forEach((el, i) => {
    el.style.transitionDelay = `${i * 55}ms`;
  });
  document.querySelectorAll('.k-stat').forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
  });

  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.k-reveal').forEach(el => obs.observe(el));
})();

/* ═══════════════════════════════════════════════════════════
   COUNT-UP — animated number on scroll into view
   ═══════════════════════════════════════════════════════════ */
(function () {
  function countUp(el, target) {
    const step = target / 72;
    let val = 0;
    const id = setInterval(() => {
      val += step;
      if (val >= target) {
        el.textContent = target >= 1000 ? (target / 1000) + 'K' : target;
        clearInterval(id);
      } else {
        const v = Math.floor(val);
        el.textContent = v >= 1000 ? Math.floor(v / 1000) + 'K' : v;
      }
    }, 16);
  }

  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        const t = parseInt(e.target.dataset.target, 10);
        if (!isNaN(t)) countUp(e.target, t);
        obs.unobserve(e.target);
      }
    }),
    { threshold: 0.5 }
  );

  document.querySelectorAll('.k-stat-n[data-target]').forEach(el => obs.observe(el));
})();

/* ═══════════════════════════════════════════════════════════
   PAGE LOAD
   ═══════════════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  document.body.classList.add('k-loaded');
});
