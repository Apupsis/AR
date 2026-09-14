/* أخضر الملاعب — site behaviour */
(function () {
  'use strict';

  var P = 'header-croquet-green';
  var OPEN = 'is-open';

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.' + P + '-mobile-toggle');
    var menu = document.querySelector('.' + P + '-mobile-menu');
    var closeBtn = document.querySelector('.' + P + '-mobile-close');
    var links = document.querySelectorAll('.' + P + '-mobile-link');

    if (toggle && menu) {
      var open = function () {
        menu.classList.add(OPEN);
        toggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('nav-locked');
      };

      var close = function () {
        menu.classList.remove(OPEN);
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-locked');
      };

      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        menu.classList.contains(OPEN) ? close() : open();
      });

      if (closeBtn) closeBtn.addEventListener('click', close);

      var mobileCta = document.querySelector('.' + P + '-mobile-cta');

      Array.prototype.forEach.call(links, function (a) {
        a.addEventListener('click', close);
      });

      if (mobileCta) mobileCta.addEventListener('click', close);

      document.addEventListener('click', function (e) {
        if (!menu.classList.contains(OPEN)) return;
        if (menu.contains(e.target) || toggle.contains(e.target)) return;
        close();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.classList.contains(OPEN)) close();
      });

      window.addEventListener('resize', function () {
        if (window.innerWidth > 1060 && menu.classList.contains(OPEN)) close();
      });
    }

    /* cookie notice */
    var KEY = 'akhdar_almalaeb_cookie_consent';
    var banner = document.getElementById('cookieBanner');

    if (banner) {
      var stored = null;
      try { stored = localStorage.getItem(KEY); } catch (err) { stored = 'blocked'; }
      if (stored) banner.classList.add('is-hidden');

      var remember = function (value) {
        try { localStorage.setItem(KEY, value); } catch (err) { /* storage unavailable */ }
        banner.classList.add('is-hidden');
      };

      window.acceptCookies = function () { remember('accepted'); };
      window.declineCookies = function () { remember('declined'); };
    }

    /* FAQ accordion (common-questions) */
    var faqButtons = document.querySelectorAll('.faq-question');

    Array.prototype.forEach.call(faqButtons, function (btn) {
      var item = btn.closest('.faq-item');
      var answer = document.getElementById(btn.getAttribute('data-toggle') || '');

      btn.setAttribute('aria-expanded', 'false');
      if (answer) btn.setAttribute('aria-controls', answer.id);

      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        Array.prototype.forEach.call(document.querySelectorAll('.faq-item.is-open'), function (open) {
          open.classList.remove('is-open');
          var b = open.querySelector('.faq-question');
          if (b) b.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    /* mark the current page in the desktop nav */
    var here = window.location.pathname.replace(/index\.html$/, '');
    Array.prototype.forEach.call(document.querySelectorAll('.' + P + '-nav-link'), function (a) {
      var href = a.getAttribute('href') || '';
      if (href.indexOf('#') === 0 || href.indexOf('#') > -1) return;
      var path = new URL(a.href, window.location.href).pathname.replace(/index\.html$/, '');
      if (path === here) a.classList.add('is-current');
    });
  });
})();
