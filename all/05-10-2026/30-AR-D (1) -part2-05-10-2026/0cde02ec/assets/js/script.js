(function() {
  const toggleButton = document.querySelector('.k8e7d');
  const mobileMenu = document.querySelector('.l6c45');
  const mobileClose = document.querySelector('.be4ad672');
  const mobileLinks = document.querySelectorAll('.e17');
  const mobileCta = document.querySelector('.a20560');

  function closeMenu() {
    mobileMenu.classList.remove('h273e10');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    mobileMenu.classList.add('h273e10');
    toggleButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'mdbec7a';
  }

  if (toggleButton) {
    toggleButton.addEventListener('click', function() {
      if (mobileMenu.classList.contains('h273e10')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  if (mobileCta) {
    mobileCta.addEventListener('click', closeMenu);
  }

  document.addEventListener('click', function(event) {
    if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
      if (mobileMenu.classList.contains('h273e10')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('h273e10')) {
      closeMenu();
    }
  });
})();

    (function() {
  var COOKIE_KEY = 'ping_pong_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('mdbec7a');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('mdbec7a');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('mdbec7a');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.l6c45');
  var _rt=document.querySelector('.k8e7d');
  var _ac='h273e10';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
