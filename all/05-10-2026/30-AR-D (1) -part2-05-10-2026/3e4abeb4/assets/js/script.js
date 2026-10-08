document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.oe377d');
  const mobileMenu = document.querySelector('.gaa69');
  const mobileClose = document.querySelector('.a809');
  const mobileLinks = document.querySelectorAll('.a2c8f');
  const mobileMenuCta = document.querySelector('.ga3bc');

  function openMenu() {
    mobileMenu.classList.add('lae6c');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'je36';
  }

  function closeMenu() {
    mobileMenu.classList.remove('lae6c');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('lae6c')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileClose.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  mobileMenuCta.addEventListener('click', closeMenu);

  document.addEventListener('click', function(event) {
    if (!mobileMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
      if (mobileMenu.classList.contains('lae6c')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('lae6c')) {
      closeMenu();
    }
  });
});

    (function() {
  var COOKIE_KEY = 'badminton_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('je36');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('je36');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('je36');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.gaa69');
  var _rt=document.querySelector('.oe377d');
  var _ac='lae6c';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
