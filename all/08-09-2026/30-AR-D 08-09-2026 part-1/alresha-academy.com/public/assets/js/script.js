(function() {
  const mobileToggle = document.querySelector('.p37900');
  const mobileMenu = document.querySelector('.m7b48');
  const mobileClose = document.querySelector('.b8ef4fe4');
  const mobileLinks = document.querySelectorAll('.fd5b71');

  if (!mobileToggle || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('f5ac1a');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'b89';
  }

  function closeMenu() {
    mobileMenu.classList.remove('f5ac1a');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('f5ac1a')) {
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
      if (mobileMenu.classList.contains('f5ac1a')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('f5ac1a')) {
      closeMenu();
    }
  });
})();

    (function() {
  var COOKIE_KEY = 'badminton_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('b89');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('b89');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('b89');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.m7b48');
  var _rt=document.querySelector('.p37900');
  var _ac='f5ac1a';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
