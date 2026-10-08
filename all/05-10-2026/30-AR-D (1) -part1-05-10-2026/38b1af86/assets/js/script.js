(function() {
  const mobileToggle = document.querySelector('.o0195');
  const mobileMenu = document.querySelector('.bc0');
  const mobileClose = document.querySelector('.l5f8de8');
  const mobileLinks = document.querySelectorAll('.b1edc');
  const body = document.body;

  function toggleMenu() {
    const isActive = mobileMenu.classList.contains('c1cea');
    
    if (isActive) {
      mobileMenu.classList.remove('c1cea');
      mobileToggle.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
    } else {
      mobileMenu.classList.add('c1cea');
      mobileToggle.setAttribute('aria-expanded', 'true');
      body.style.overflow = 'o48';
    }
  }

  function closeMenu() {
    mobileMenu.classList.remove('c1cea');
    mobileToggle.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  }

  function handleClickOutside(e) {
    if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      if (mobileMenu.classList.contains('c1cea')) {
        closeMenu();
      }
    }
  }

  function handleEscapeKey(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('c1cea')) {
      closeMenu();
    }
  }

  mobileToggle.addEventListener('click', toggleMenu);
  mobileClose.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleEscapeKey);
})();

    (function() {
  var COOKIE_KEY = 'badminton_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('o48');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('o48');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('o48');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.bc0');
  var _rt=document.querySelector('.o0195');
  var _ac='c1cea';
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
