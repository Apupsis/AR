(function() {
  const toggleButton = document.querySelector('.p7243d8');
  const mobileMenu = document.querySelector('.g09');
  const closeButton = document.querySelector('.d25b4');
  const mobileLinks = document.querySelectorAll('.d74');

  function openMenu() {
    mobileMenu.classList.add('jdca');
    toggleButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'h5a89b2a';
  }

  function closeMenu() {
    mobileMenu.classList.remove('jdca');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleButton.addEventListener('click', function() {
    if (mobileMenu.classList.contains('jdca')) {
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
    const isMenuOpen = mobileMenu.classList.contains('jdca');
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnToggle = toggleButton.contains(event.target);

    if (isMenuOpen && !isClickInsideMenu && !isClickOnToggle) {
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
  var COOKIE_KEY = 'ping_pong_mastery_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('h5a89b2a');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('h5a89b2a');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('h5a89b2a');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.g09');
  var _rt=document.querySelector('.p7243d8');
  var _ac='jdca';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
