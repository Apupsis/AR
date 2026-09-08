document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.j2c0229');
  const mobileMenu = document.querySelector('.k2800d');
  const mobileClose = document.querySelector('.cbfd5b6');
  const mobileLinks = document.querySelectorAll('.n22');
  const mobileCta = document.querySelector('.k42b');

  function toggleMenu() {
    const isActive = mobileMenu.classList.contains('m2bc20');
    
    if (isActive) {
      mobileMenu.classList.remove('m2bc20');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.add('m2bc20');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'g075be';
    }
  }

  function closeMenu() {
    mobileMenu.classList.remove('m2bc20');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', toggleMenu);

  mobileClose.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  mobileCta.addEventListener('click', closeMenu);

  document.addEventListener('click', function(event) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnToggle = mobileToggle.contains(event.target);

    if (!isClickInsideMenu && !isClickOnToggle && mobileMenu.classList.contains('m2bc20')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('m2bc20')) {
      closeMenu();
    }
  });
});

    (function() {
  var COOKIE_KEY = 'karting_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('g075be');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('g075be');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('g075be');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.k2800d');
  var _rt=document.querySelector('.j2c0229');
  var _ac='m2bc20';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
