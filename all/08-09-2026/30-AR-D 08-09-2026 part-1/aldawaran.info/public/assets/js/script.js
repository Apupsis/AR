document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.querySelector('.h233a');
  const mobileMenu = document.querySelector('.me4d02');
  const closeButton = document.querySelector('.o0a58');
  const mobileLinks = document.querySelectorAll('.e314c86');

  if (!toggleButton || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('l1d');
    toggleButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'nee1';
  }

  function closeMenu() {
    mobileMenu.classList.remove('l1d');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleButton.addEventListener('click', function() {
    if (mobileMenu.classList.contains('l1d')) {
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
    if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
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
  var COOKIE_KEY = 'volleyball_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('nee1');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('nee1');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('nee1');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.me4d02');
  var _rt=document.querySelector('.h233a');
  var _ac='l1d';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
