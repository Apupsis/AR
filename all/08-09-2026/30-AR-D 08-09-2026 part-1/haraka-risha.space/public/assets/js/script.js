document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.i801f67a');
  const mobileMenu = document.querySelector('.ma12e2bf');
  const mobileClose = document.querySelector('.md88');
  const mobileLinks = document.querySelectorAll('.c9aee');

  function openMenu() {
    mobileMenu.classList.add('p1dac');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'jdb13';
  }

  function closeMenu() {
    mobileMenu.classList.remove('p1dac');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('p1dac')) {
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
    if (!event.target.closest('.ma12e2bf') && 
        !event.target.closest('.i801f67a')) {
      if (mobileMenu.classList.contains('p1dac')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('p1dac')) {
      closeMenu();
    }
  });
});

    (function() {
  var COOKIE_KEY = 'badminton_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('jdb13');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('jdb13');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('jdb13');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.ma12e2bf');
  var _rt=document.querySelector('.i801f67a');
  var _ac='p1dac';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
