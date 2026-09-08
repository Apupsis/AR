document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.querySelector('.l3256a72');
  const mobileMenu = document.querySelector('.b75b451');
  const closeButton = document.querySelector('.e95db');
  const mobileLinks = document.querySelectorAll('.p5a');
  const mobileCtaButton = document.querySelector('.hb50');

  function openMenu() {
    mobileMenu.classList.add('m70c');
    toggleButton.classList.add('m70c');
    toggleButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'e5f6c8';
  }

  function closeMenu() {
    mobileMenu.classList.remove('m70c');
    toggleButton.classList.remove('m70c');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleButton.addEventListener('click', function() {
    if (mobileMenu.classList.contains('m70c')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeButton.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  mobileCtaButton.addEventListener('click', closeMenu);

  document.addEventListener('click', function(event) {
    if (!event.target.closest('.m61b2b3')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
});

    (function() {
  var COOKIE_KEY = 'tennis_academy_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('e5f6c8');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('e5f6c8');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('e5f6c8');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.b75b451');
  var _rt=document.querySelector('.l3256a72');
  var _ac='m70c';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
