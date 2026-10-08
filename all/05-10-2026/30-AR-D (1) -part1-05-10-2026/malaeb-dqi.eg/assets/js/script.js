(function() {
  const mobileToggle = document.querySelector('.h91');
  const mobileMenu = document.querySelector('.l8debb8');
  const mobileClose = document.querySelector('.ef2');
  const mobileLinks = document.querySelectorAll('.e5dc411c, .da98');

  function toggleMenu() {
    const isActive = mobileMenu.classList.contains('lb40');
    
    if (isActive) {
      mobileMenu.classList.remove('lb40');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.add('lb40');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'bec';
    }
  }

  function closeMenu() {
    mobileMenu.classList.remove('lb40');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', toggleMenu);
  mobileClose.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function(event) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnToggle = mobileToggle.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnToggle && mobileMenu.classList.contains('lb40')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('lb40')) {
      closeMenu();
    }
  });
})();

    (function() {
  var COOKIE_KEY = 'croquet_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('bec');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('bec');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('bec');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.l8debb8');
  var _rt=document.querySelector('.h91');
  var _ac='lb40';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
