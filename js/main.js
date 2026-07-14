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

  document.querySelectorAll('.t-scramble').forEach(function (el, i) {
    scramble(el, el.dataset.text, 900 + i * 260);
  });
}());

/* ─── TYPEWRITER ───────────────────────────────────────────
   Terminal command / output lines type themselves out
   ─────────────────────────────────────────────────────────── */
(function () {
  function typewriter(el, text, delay, speed) {
    el.textContent = '';
    setTimeout(function () {
      var i = 0;
      var id = setInterval(function () {
        i++;
        el.textContent = text.slice(0, i);
        if (i >= text.length) clearInterval(id);
      }, speed);
    }, delay);
  }

  document.querySelectorAll('.t-type').forEach(function (el, i) {
    typewriter(el, el.dataset.text, 200 + i * 550, 38);
  });
}());

/* ─── NAV ──────────────────────────────────────────────────
   Scroll state + mobile hamburger overlay
   ─────────────────────────────────────────────────────────── */
(function () {
  var nav      = document.getElementById('t-nav');
  var menuBtn  = document.getElementById('t-menu-btn');
  var navTabs  = document.getElementById('t-nav-tabs');

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  menuBtn.addEventListener('click', function () {
    var open = navTabs.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navTabs.querySelectorAll('.t-tab').forEach(function (link) {
    link.addEventListener('click', function () {
      navTabs.classList.remove('open');
      menuBtn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}());

/* ─── REVEAL ─────────────────────────────────────────────────
   Each window/panel fades + slides up as it enters the viewport.
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

  document.querySelectorAll('.t-reveal').forEach(function (el) {
    obs.observe(el);
  });
}());

/* ─── SPOTLIGHT ─────────────────────────────────────────────
   Tracks the cursor per-panel and feeds it to the CSS spotlight
   gradient (--mx / --my) defined in style.css
   ─────────────────────────────────────────────────────────── */
(function () {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.t-window, .t-panel').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    });
  });
}());

/* ─── THEME TOGGLE ─────────────────────────────────────────
   dark ↔ light with localStorage persistence
   ─────────────────────────────────────────────────────────── */
(function () {
  var btn = document.getElementById('t-theme-btn');
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
