document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.j7d');
  const mobileMenu = document.querySelector('.n32a60');
  const mobileClose = document.querySelector('.oa2e3db');
  const mobileLinks = document.querySelectorAll('.p72');

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('fc900620');
    
    if (isOpen) {
      mobileMenu.classList.remove('fc900620');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.add('fc900620');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'e9672d';
    }
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('fc900620');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', toggleMobileMenu);

  mobileClose.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('click', function(event) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnToggle = mobileToggle.contains(event.target);

    if (!isClickInsideMenu && !isClickOnToggle && mobileMenu.classList.contains('fc900620')) {
      closeMobileMenu();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('fc900620')) {
      closeMobileMenu();
    }
  });
});

    (function() {
  var COOKIE_KEY = 'croquet_cookie_consent';
  var banner = document.getElementById('cookieBanner');

  if (!banner) return;

  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('e9672d');
  }

  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('e9672d');
  };

  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('e9672d');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.n32a60');
  var _rt=document.querySelector('.j7d');
  var _ac='fc900620';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
