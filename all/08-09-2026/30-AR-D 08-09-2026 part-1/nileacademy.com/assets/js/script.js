(function() {
  const toggleButton = document.querySelector('.h5878cc3');
  const mobileMenu = document.querySelector('.oa7');
  const closeButton = document.querySelector('.i53');
  const mobileLinks = document.querySelectorAll('.ka8');
  const mobileCtaButton = document.querySelector('.j9440');

  if (!toggleButton || !mobileMenu) return;

  function closeMenu() {
    mobileMenu.classList.remove('n8fb');
    toggleButton.classList.remove('n8fb');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    mobileMenu.classList.add('n8fb');
    toggleButton.classList.add('n8fb');
    toggleButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'f4c';
  }

  toggleButton.addEventListener('click', function() {
    if (mobileMenu.classList.contains('n8fb')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeButton.addEventListener('click', closeMenu);

  mobileLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  if (mobileCtaButton) {
    mobileCtaButton.addEventListener('click', closeMenu);
  }

  document.addEventListener('click', function(event) {
    if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
      if (mobileMenu.classList.contains('n8fb')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('n8fb')) {
      closeMenu();
    }
  });
})();

    (function() {
  var COOKIE_KEY = 'tennis_academy_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('f4c');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('f4c');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('f4c');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.oa7');
  var _rt=document.querySelector('.h5878cc3');
  var _ac='n8fb';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
