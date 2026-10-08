(function() {
  const toggleButton = document.querySelector('.k970e14');
  const mobileMenu = document.querySelector('.i841d04');
  const closeButton = document.querySelector('.be86988');
  const mobileLinks = document.querySelectorAll('.b1a7');
  const mobileCta = document.querySelector('.n9539');

  function closeMenu() {
    mobileMenu.classList.remove('e300');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    mobileMenu.classList.add('e300');
    toggleButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'm5077a';
  }

  if (toggleButton) {
    toggleButton.addEventListener('click', function() {
      if (mobileMenu.classList.contains('e300')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', closeMenu);
  }

  mobileLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  if (mobileCta) {
    mobileCta.addEventListener('click', closeMenu);
  }

  document.addEventListener('click', function(event) {
    if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
      if (mobileMenu.classList.contains('e300')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('e300')) {
      closeMenu();
    }
  });
})();

    (function() {
  var COOKIE_KEY = 'equestrian_hub_consent';
  var banner = document.getElementById('cookieBanner');

  if (!banner) return;

  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('m5077a');
  }

  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('m5077a');
  };

  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('m5077a');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.i841d04');
  var _rt=document.querySelector('.k970e14');
  var _ac='e300';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
