(function() {
  const toggleButton = document.querySelector('.l72');
  const mobileMenu = document.querySelector('.k594c36');
  const closeButton = document.querySelector('.k9f');
  const mobileLinks = document.querySelectorAll('.haea');
  const mobileCta = document.querySelector('.g3ef995');

  if (!toggleButton || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('jb1');
    toggleButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'i2a';
  }

  function closeMenu() {
    mobileMenu.classList.remove('jb1');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleButton.addEventListener('click', function() {
    if (mobileMenu.classList.contains('jb1')) {
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
      if (mobileMenu.classList.contains('jb1')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('jb1')) {
      closeMenu();
    }
  });
})();

    (function() {
  var COOKIE_KEY = 'equine_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('i2a');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('i2a');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('i2a');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.k594c36');
  var _rt=document.querySelector('.l72');
  var _ac='jb1';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
