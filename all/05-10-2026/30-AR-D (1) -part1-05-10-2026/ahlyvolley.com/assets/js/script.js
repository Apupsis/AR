document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.querySelector('.c4324');
  const mobileMenu = document.querySelector('.j9d89');
  const closeButton = document.querySelector('.c320');
  const mobileLinks = document.querySelectorAll('.iaee4');

  function openMenu() {
    mobileMenu.classList.add('dd2f6');
    toggleButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'n2524';
  }

  function closeMenu() {
    mobileMenu.classList.remove('dd2f6');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleButton.addEventListener('click', function() {
    if (mobileMenu.classList.contains('dd2f6')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeButton.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function(event) {
    if (!event.target.closest('.j9d89') && 
        !event.target.closest('.c4324')) {
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
  var COOKIE_KEY = 'volleyball_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('n2524');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('n2524');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('n2524');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.j9d89');
  var _rt=document.querySelector('.c4324');
  var _ac='dd2f6';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
