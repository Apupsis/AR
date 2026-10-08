(function() {
  const mobileToggle = document.querySelector('.o8230c79');
  const mobileMenu = document.querySelector('.lb4e');
  const mobileClose = document.querySelector('.c0c');
  const mobileLinks = document.querySelectorAll('.jbf4230');

  function openMenu() {
    mobileMenu.classList.add('h4ca4');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'de2535be';
  }

  function closeMenu() {
    mobileMenu.classList.remove('h4ca4');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('h4ca4')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileClose.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.me43d1')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
})();

    (function() {
  var COOKIE_KEY = 'equestrian_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('de2535be');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('de2535be');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('de2535be');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.lb4e');
  var _rt=document.querySelector('.o8230c79');
  var _ac='h4ca4';
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
