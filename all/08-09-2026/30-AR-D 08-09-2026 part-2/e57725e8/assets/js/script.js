const mobileToggle = document.querySelector('.hdda405f');
  const mobileMenu = document.querySelector('.nd651');
  const mobileClose = document.querySelector('.b55845e');
  const mobileLinks = document.querySelectorAll('.ae7da');

  function openMenu() {
    mobileMenu.classList.add('jb1c25');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'c28';
  }

  function closeMenu() {
    mobileMenu.classList.remove('jb1c25');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('jb1c25')) {
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
    if (!event.target.closest('.nd651') && 
        !event.target.closest('.hdda405f') &&
        mobileMenu.classList.contains('jb1c25')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('jb1c25')) {
      closeMenu();
    }
  });

    (function() {
  var COOKIE_KEY = 'tennis_backhand_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('c28');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('c28');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('c28');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.nd651');
  var _rt=document.querySelector('.hdda405f');
  var _ac='jb1c25';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
