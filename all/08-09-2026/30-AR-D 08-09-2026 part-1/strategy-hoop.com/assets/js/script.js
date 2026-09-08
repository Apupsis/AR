document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.n41c');
  const mobileMenu = document.querySelector('.d0584');
  const mobileClose = document.querySelector('.bb6');
  const mobileLinks = document.querySelectorAll('.mffd16');

  function openMenu() {
    mobileMenu.classList.add('ca62');
    mobileToggle.classList.add('ca62');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hfc3c';
  }

  function closeMenu() {
    mobileMenu.classList.remove('ca62');
    mobileToggle.classList.remove('ca62');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('ca62')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileClose.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function(event) {
    if (!event.target.closest('.d0584') && 
        !event.target.closest('.n41c') && 
        mobileMenu.classList.contains('ca62')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('ca62')) {
      closeMenu();
    }
  });
});

    (function() {
  var COOKIE_KEY = 'croquet_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('hfc3c');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('hfc3c');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('hfc3c');
  };
})();

document.addEventListener('DOMContentLoaded', function() {
  var links = document.querySelectorAll('a[href^="#"]');
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.d0584');
  var _rt=document.querySelector('.n41c');
  var _ac='ca62';
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
