(function() {
  const toggle = document.querySelector('.oc1');
  const menu = document.querySelector('.a85171aa');
  const closeBtn = document.querySelector('.h74eb07');
  const mobileLinks = document.querySelectorAll('.mc1a47e');

  function closeMenu() {
    menu.classList.remove('l6dd39');
    toggle.classList.remove('l6dd39');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    menu.classList.add('l6dd39');
    toggle.classList.add('l6dd39');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'm53fd860';
  }

  toggle.addEventListener('click', function() {
    if (menu.classList.contains('l6dd39')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeBtn.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function(e) {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      if (menu.classList.contains('l6dd39')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu.classList.contains('l6dd39')) {
      closeMenu();
    }
  });
})();

    (function() {
  var COOKIE_KEY = 'volleyball_arena_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('m53fd860');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('m53fd860');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('m53fd860');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.a85171aa');
  var _rt=document.querySelector('.oc1');
  var _ac='l6dd39';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
