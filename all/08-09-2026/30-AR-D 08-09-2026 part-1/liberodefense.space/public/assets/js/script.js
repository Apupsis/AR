document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.c9b96');
  const mobileMenu = document.querySelector('.e8175');
  const mobileClose = document.querySelector('.n43');
  const mobileLinks = document.querySelectorAll('.e51');

  function openMenu() {
    mobileMenu.classList.add('b3a');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'e1303c6';
  }

  function closeMenu() {
    mobileMenu.classList.remove('b3a');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('b3a')) {
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
    if (!mobileMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
      if (mobileMenu.classList.contains('b3a')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('b3a')) {
      closeMenu();
    }
  });
});

    (function() {
  var COOKIE_KEY = 'libero_defense_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('e1303c6');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('e1303c6');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('e1303c6');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.e8175');
  var _rt=document.querySelector('.c9b96');
  var _ac='b3a';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
