(function() {
  const toggle = document.querySelector('.h229');
  const menu = document.querySelector('.c68f');
  const closeBtn = document.querySelector('.k6c7b4c');
  const mobileLinks = document.querySelectorAll('.o33e2, .j27466ee');

  function closeMenu() {
    menu.classList.remove('o16');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    menu.classList.add('o16');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'ff4fa32';
  }

  toggle.addEventListener('click', function() {
    if (menu.classList.contains('o16')) {
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
    if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('o16')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu.classList.contains('o16')) {
      closeMenu();
    }
  });
})();

    (function() {
  var COOKIE_KEY = 'volleyball_camp_consent';
  var banner = document.getElementById('cookieBanner');

  if (!banner) return;

  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('ff4fa32');
  }

  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('ff4fa32');
  };

  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('ff4fa32');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.c68f');
  var _rt=document.querySelector('.h229');
  var _ac='o16';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
