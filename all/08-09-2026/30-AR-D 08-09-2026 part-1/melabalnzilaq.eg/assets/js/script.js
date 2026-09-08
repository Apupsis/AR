(function() {
  const mobileToggle = document.querySelector('.ke7');
  const mobileMenu = document.querySelector('.k4a7');
  const mobileClose = document.querySelector('.jcc4');
  const mobileLinks = document.querySelectorAll('.de31');
  const mobileCta = document.querySelector('.ia42373');

  function openMenu() {
    mobileMenu.classList.add('p43b');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'm8c74';
  }

  function closeMenu() {
    mobileMenu.classList.remove('p43b');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('p43b')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileClose.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  mobileCta.addEventListener('click', closeMenu);

  document.addEventListener('click', function(event) {
    if (!mobileMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
      if (mobileMenu.classList.contains('p43b')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('p43b')) {
      closeMenu();
    }
  });
})();

    (function() {
  var COOKIE_KEY = 'tennis_clay_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('m8c74');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('m8c74');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('m8c74');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.k4a7');
  var _rt=document.querySelector('.ke7');
  var _ac='p43b';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
