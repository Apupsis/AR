document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.querySelector('.ne3456');
  const mobileMenu = document.querySelector('.b82');
  const closeButton = document.querySelector('.m21bc0');
  const mobileLinks = document.querySelectorAll('.b0d');

  if (!toggleButton || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('l287');
    toggleButton.classList.add('l287');
    toggleButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'd7a46e2';
  }

  function closeMenu() {
    mobileMenu.classList.remove('l287');
    toggleButton.classList.remove('l287');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleButton.addEventListener('click', function() {
    if (mobileMenu.classList.contains('l287')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeButton.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      closeMenu();
    });
  });

  document.addEventListener('click', function(event) {
    if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
      if (mobileMenu.classList.contains('l287')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('l287')) {
      closeMenu();
    }
  });
});

    (function() {
  var COOKIE_KEY = 'croquet_academy_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('d7a46e2');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('d7a46e2');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('d7a46e2');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.b82');
  var _rt=document.querySelector('.ne3456');
  var _ac='l287';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
