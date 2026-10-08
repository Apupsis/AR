document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.o2a');
  const mobileMenu = document.querySelector('.fe0ee624');
  const mobileClose = document.querySelector('.c5650f1c');
  const mobileLinks = document.querySelectorAll('.kaff');
  const body = document.body;

  function openMenu() {
    mobileMenu.classList.add('a2e686');
    mobileToggle.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'h763';
  }

  function closeMenu() {
    mobileMenu.classList.remove('a2e686');
    mobileToggle.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('a2e686')) {
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
  var COOKIE_KEY = 'karting_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('h763');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('h763');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('h763');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.fe0ee624');
  var _rt=document.querySelector('.o2a');
  var _ac='a2e686';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
