document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.pcd');
  const mobileMenu = document.querySelector('.l5e7f');
  const mobileClose = document.querySelector('.ba6');
  const mobileLinks = document.querySelectorAll('.j3e');
  const body = document.body;

  function openMenu() {
    mobileMenu.classList.add('mce38');
    mobileToggle.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'k6dc';
  }

  function closeMenu() {
    mobileMenu.classList.remove('mce38');
    mobileToggle.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('mce38')) {
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
    if (!event.target.closest('.dfa')) {
      if (mobileMenu.classList.contains('mce38')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('mce38')) {
      closeMenu();
    }
  });
});

    (function() {
  var COOKIE_KEY = 'tennis_volley_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('k6dc');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('k6dc');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('k6dc');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.l5e7f');
  var _rt=document.querySelector('.pcd');
  var _ac='mce38';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
