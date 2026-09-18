/* TAKE OFF — 交互
   只做两件事：导航吸顶状态、元素入场。
   只用 transform / opacity，遵循 prefers-reduced-motion。 */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 年份 ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  /* ---------- 尊重「减少动态效果」：直接全部显示 ---------- */
  if (reduceMotion) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else if ('IntersectionObserver' in window) {
    reveals.forEach(function (el) {
      var delay = el.getAttribute('data-delay');
      if (delay) el.style.setProperty('--d', delay);
    });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 导航吸顶 ---------- */
  var nav = document.getElementById('nav');
  if (nav && 'IntersectionObserver' in window) {
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;';
    document.body.insertBefore(sentinel, document.body.firstChild);

    var navObserver = new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }, { threshold: 0 });

    navObserver.observe(sentinel);
  } else if (nav) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        nav.classList.toggle('is-stuck', window.scrollY > 12);
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- 平滑锚点（浏览器不支持时兜底） ---------- */
  if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var id = link.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        event.preventDefault();
        window.scrollTo(0, target.getBoundingClientRect().top + window.pageYOffset);
      });
    });
  }
})();
