document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.querySelector('.g3ef');
  const closeButton = document.querySelector('.fda8c');
  const mobileMenu = document.querySelector('.ebec84');
  const mobileLinks = document.querySelectorAll('.i1f4fc');
  const mobileCta = document.querySelector('.cf760');

  function openMenu() {
    mobileMenu.classList.add('b929d0');
    toggleButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'p96735';
  }

  function closeMenu() {
    mobileMenu.classList.remove('b929d0');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleButton.addEventListener('click', function() {
    if (mobileMenu.classList.contains('b929d0')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeButton.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  mobileCta.addEventListener('click', closeMenu);

  document.addEventListener('click', function(event) {
    if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
      if (mobileMenu.classList.contains('b929d0')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('b929d0')) {
      closeMenu();
    }
  });
});

    (function() {
  var COOKIE_KEY = 'badminton_tactics_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('p96735');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('p96735');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('p96735');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.ebec84');
  var _rt=document.querySelector('.g3ef');
  var _ac='b929d0';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
