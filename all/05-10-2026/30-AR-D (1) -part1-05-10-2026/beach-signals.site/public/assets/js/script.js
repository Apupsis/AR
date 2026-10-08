document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.querySelector('.nb4f08c');
  const mobileMenu = document.querySelector('.b17c10');
  const closeButton = document.querySelector('.k4be3');
  const mobileLinks = document.querySelectorAll('.oa6');

  function openMenu() {
    mobileMenu.classList.add('l2437e');
    toggleButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'd6ad75a';
  }

  function closeMenu() {
    mobileMenu.classList.remove('l2437e');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleButton.addEventListener('click', function() {
    if (mobileMenu.classList.contains('l2437e')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeButton.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function(event) {
    if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
      if (mobileMenu.classList.contains('l2437e')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      if (mobileMenu.classList.contains('l2437e')) {
        closeMenu();
      }
    }
  });
});

    (function() {
  var COOKIE_KEY = 'beach_signals_cookie_consent';
  var banner = document.getElementById('cookieBanner');

  if (!banner) return;

  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('d6ad75a');
  }

  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('d6ad75a');
  };

  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('d6ad75a');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.b17c10');
  var _rt=document.querySelector('.nb4f08c');
  var _ac='l2437e';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();

// FIX:FAQ — аккордеон (классонезависимо: aria-controls / data-faq-toggle / .faq-item / sibling)
(function(){
  var triggers=[].slice.call(document.querySelectorAll(
    '.faq-item__trigger,[data-faq-toggle],button[aria-controls]'))
    .filter(function(b){ return !b.closest('header'); });
  if(!triggers.length) return;
  function panelFor(btn){
    var ctrl=btn.getAttribute('aria-controls');
    if(ctrl){ var el=document.getElementById(ctrl); if(el) return el; }
    var idx=btn.getAttribute('data-faq-toggle');
    if(idx!==null&&idx!=='') return document.querySelector('[data-faq-content="'+idx+'"]');
    var item=btn.closest('.faq-item');
    if(item) return item.querySelector('.faq-item__answer,.faq-item__content');
    return btn.nextElementSibling;
  }
  triggers.forEach(function(btn){
    btn.addEventListener('click',function(){
      var isOpen=btn.getAttribute('aria-expanded')==='true';
      triggers.forEach(function(b){
        b.setAttribute('aria-expanded','false');
        var p=panelFor(b); if(p) p.hidden=true;
        var it=b.closest('.faq-item'); if(it) it.classList.remove('active','open');
      });
      if(!isOpen){
        btn.setAttribute('aria-expanded','true');
        var p=panelFor(btn); if(p) p.hidden=false;
        var it=btn.closest('.faq-item'); if(it) it.classList.add('active');
      }
    });
  });
})();
