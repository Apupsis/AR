(function() {
  const mobileToggle = document.querySelector('.kac2d4');
  const mobileMenu = document.querySelector('.i0c93');
  const mobileClose = document.querySelector('.i44d3d');
  const mobileLinks = document.querySelectorAll('.p811ce');

  function openMenu() {
    mobileMenu.classList.add('lb0');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'a0a33';
  }

  function closeMenu() {
    mobileMenu.classList.remove('lb0');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('lb0')) {
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
  var COOKIE_KEY = 'badminton_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('a0a33');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('a0a33');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('a0a33');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.i0c93');
  var _rt=document.querySelector('.kac2d4');
  var _ac='lb0';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
