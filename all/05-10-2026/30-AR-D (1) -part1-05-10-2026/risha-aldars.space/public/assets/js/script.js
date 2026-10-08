(function() {
  const toggleButton = document.querySelector('.fec8');
  const mobileMenu = document.querySelector('.kcff6');
  const closeButton = document.querySelector('.d043ce');
  const mobileLinks = document.querySelectorAll('.k255133e');
  const mobileCta = document.querySelector('.h818a');

  function openMenu() {
    mobileMenu.classList.add('l4f857');
    toggleButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'i9a2dfe0';
  }

  function closeMenu() {
    mobileMenu.classList.remove('l4f857');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleButton.addEventListener('click', function() {
    if (mobileMenu.classList.contains('l4f857')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeButton.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  mobileCta.addEventListener('click', closeMenu);

  document.addEventListener('click', function(event) {
    if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
      if (mobileMenu.classList.contains('l4f857')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('l4f857')) {
      closeMenu();
    }
  });
})();

    (function() {
  var COOKIE_KEY = 'badminton_arena_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('i9a2dfe0');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('i9a2dfe0');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('i9a2dfe0');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.kcff6');
  var _rt=document.querySelector('.fec8');
  var _ac='l4f857';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
