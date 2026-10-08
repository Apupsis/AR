(function() {
  const mobileToggle = document.querySelector('.j96fbb');
  const mobileMenu = document.querySelector('.m0af1ad');
  const mobileClose = document.querySelector('.h8d');
  const mobileLinks = document.querySelectorAll('.b465');
  const mobileCta = document.querySelector('.db34b87d');

  if (!mobileToggle || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('e176d1');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'f61';
  }

  function closeMenu() {
    mobileMenu.classList.remove('e176d1');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('e176d1')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileClose.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  if (mobileCta) {
    mobileCta.addEventListener('click', closeMenu);
  }

  document.addEventListener('click', function(event) {
    if (!mobileMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
      if (mobileMenu.classList.contains('e176d1')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('e176d1')) {
      closeMenu();
    }
  });
})();

    (function() {
  var COOKIE_KEY = 'croquet_strategy_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('f61');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('f61');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('f61');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.m0af1ad');
  var _rt=document.querySelector('.j96fbb');
  var _ac='e176d1';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
