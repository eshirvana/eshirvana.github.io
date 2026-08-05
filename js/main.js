/* ─── HEADER SCROLL STATE ───────────────────────────────────
   ─────────────────────────────────────────────────────────── */
(function () {
  var header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });
}());

/* ─── REVEAL ON SCROLL ──────────────────────────────────────
   ─────────────────────────────────────────────────────────── */
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  els.forEach(function (el) { obs.observe(el); });
}());

/* ─── THEME TOGGLE ──────────────────────────────────────────
   dark ↔ light with localStorage persistence
   ─────────────────────────────────────────────────────────── */
(function () {
  var btn = document.getElementById('theme-btn');
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
