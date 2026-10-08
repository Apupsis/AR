document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.d466e5');
  const mobileMenu = document.querySelector('.jcef');
  const mobileClose = document.querySelector('.d6585bd');
  const mobileLinks = document.querySelectorAll('.je973d');

  if (!mobileToggle || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('o6377');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'l4ee383';
  }

  function closeMenu() {
    mobileMenu.classList.remove('o6377');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('o6377')) {
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
});

    (function() {
  var COOKIE_KEY = 'equine_endurance_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('l4ee383');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('l4ee383');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('l4ee383');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.jcef');
  var _rt=document.querySelector('.d466e5');
  var _ac='o6377';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
