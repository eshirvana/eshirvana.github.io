/* ─── SCRAMBLE ─────────────────────────────────────────────
   Characters randomize then resolve to the target word
   ─────────────────────────────────────────────────────────── */
(function () {
  var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&';

  function scramble(el, target, delay) {
    var frames = 900 / 16;
    var frame  = 0;
    setTimeout(function () {
      var id = setInterval(function () {
        var p = frame / frames;
        el.textContent = target.split('').map(function (c, i) {
          if (i / target.length < p) return c;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');
        if (++frame > frames) { el.textContent = target; clearInterval(id); }
      }, 16);
    }, delay);
  }

  document.querySelectorAll('.b-scramble').forEach(function (el, i) {
    scramble(el, el.dataset.text, 160 + i * 220);
  });
}());

/* ─── NAV ──────────────────────────────────────────────────
   Scroll state + mobile hamburger overlay
   ─────────────────────────────────────────────────────────── */
(function () {
  var nav      = document.getElementById('b-nav');
  var menuBtn  = document.getElementById('b-menu-btn');
  var navLinks = document.getElementById('b-nav-links');

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  menuBtn.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navLinks.querySelectorAll('.b-nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      menuBtn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}());

/* ─── CARD REVEAL ──────────────────────────────────────────
   Each bento card fades + slides up as it enters the viewport.
   Above-fold cards (intro, stats) use transition-delay stagger.
   ─────────────────────────────────────────────────────────── */
(function () {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.b-card').forEach(function (el) {
    obs.observe(el);
  });
}());

/* ─── COUNT-UP ─────────────────────────────────────────────
   Animate stat numbers when they scroll into view
   ─────────────────────────────────────────────────────────── */
(function () {
  function countUp(el, target) {
    var step = target / 64;
    var val  = 0;
    var id   = setInterval(function () {
      val += step;
      if (val >= target) {
        el.textContent = target >= 1000 ? (target / 1000) + 'K' : target;
        clearInterval(id);
      } else {
        var v = Math.floor(val);
        el.textContent = v >= 1000 ? Math.floor(v / 1000) + 'K' : v;
      }
    }, 16);
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var t = parseInt(e.target.dataset.target, 10);
        if (!isNaN(t)) countUp(e.target, t);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('[data-target]').forEach(function (el) {
    obs.observe(el);
  });
}());

/* ─── THEME TOGGLE ─────────────────────────────────────────
   dark ↔ light with localStorage persistence
   ─────────────────────────────────────────────────────────── */
(function () {
  var btn = document.getElementById('b-theme-btn');
  if (!btn) return;

  btn.addEventListener('click', function () {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('b-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('b-theme', 'light');
    }
  });
}());
