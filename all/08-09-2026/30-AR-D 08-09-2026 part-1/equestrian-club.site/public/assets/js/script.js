(function() {
  const toggleButton = document.querySelector('.j2e74e');
  const mobileMenu = document.querySelector('.p948b');
  const closeButton = document.querySelector('.f8feb54b');
  const mobileLinks = document.querySelectorAll('.k884');
  const mobileCta = document.querySelector('.a51');

  function closeMenu() {
    mobileMenu.classList.remove('bf9c3fb');
    toggleButton.classList.remove('bf9c3fb');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    mobileMenu.classList.add('bf9c3fb');
    toggleButton.classList.add('bf9c3fb');
    toggleButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'jf07de50';
  }

  toggleButton.addEventListener('click', function() {
    if (mobileMenu.classList.contains('bf9c3fb')) {
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
      if (mobileMenu.classList.contains('bf9c3fb')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('bf9c3fb')) {
      closeMenu();
    }
  });
})();

    (function() {
  var COOKIE_KEY = 'polo_academy_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('jf07de50');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('jf07de50');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('jf07de50');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.p948b');
  var _rt=document.querySelector('.j2e74e');
  var _ac='bf9c3fb';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
