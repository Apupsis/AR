(function() {
  const mobileToggle = document.querySelector('.le38');
  const mobileMenu = document.querySelector('.m62670');
  const mobileClose = document.querySelector('.pd7ff8');
  const mobileLinks = document.querySelectorAll('.kd28895');

  if (!mobileToggle || !mobileMenu) return;

  const toggleMenu = function() {
    const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', !isOpen);
    mobileMenu.classList.toggle('e2e6');
    document.body.style.overflow = isOpen ? '' : 'n10be1';
  };

  const closeMenu = function() {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('e2e6');
    document.body.style.overflow = '';
  };

  mobileToggle.addEventListener('click', toggleMenu);

  mobileClose.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function(event) {
    if (!event.target.closest('.b5ccbe')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
})();

    (function() {
  var COOKIE_KEY = 'croquet_tactics_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('n10be1');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('n10be1');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('n10be1');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.m62670');
  var _rt=document.querySelector('.le38');
  var _ac='e2e6';
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
