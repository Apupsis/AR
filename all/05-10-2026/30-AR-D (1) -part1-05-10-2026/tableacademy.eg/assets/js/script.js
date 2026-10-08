(function() {
  const mobileToggle = document.querySelector('.ed34d1');
  const mobileMenu = document.querySelector('.ld6531');
  const mobileClose = document.querySelector('.jf2c');
  const mobileLinks = document.querySelectorAll('.e377b');

  function openMenu() {
    mobileMenu.classList.add('i7946a');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'ja1a4';
  }

  function closeMenu() {
    mobileMenu.classList.remove('i7946a');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('i7946a')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileClose.addEventListener('click', closeMenu);

  mobileLinks.forEach(function(link) {
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
})();

    (function() {
  var COOKIE_KEY = 'table_tennis_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('ja1a4');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('ja1a4');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('ja1a4');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.ld6531');
  var _rt=document.querySelector('.ed34d1');
  var _ac='i7946a';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
