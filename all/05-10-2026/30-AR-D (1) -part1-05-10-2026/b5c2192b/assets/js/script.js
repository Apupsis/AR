document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.querySelector('.cbe');
  const mobileMenu = document.querySelector('.c755');
  const closeButton = document.querySelector('.i8d');
  const mobileLinks = document.querySelectorAll('.kefa');
  const mobileCta = document.querySelector('.mb2efede');

  function openMenu() {
    mobileMenu.classList.add('o63e790e');
    toggleButton.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('d1cb4ad');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('o63e790e');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('d1cb4ad');
    document.body.style.overflow = '';
  }

  toggleButton.addEventListener('click', function() {
    if (mobileMenu.classList.contains('o63e790e')) {
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
      if (mobileMenu.classList.contains('o63e790e')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('o63e790e')) {
      closeMenu();
    }
  });
});

    (function() {
  var COOKIE_KEY = 'volleyball_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('b63f6b');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('b63f6b');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('b63f6b');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.c755');
  var _rt=document.querySelector('.cbe');
  var _ac='o63e790e';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
