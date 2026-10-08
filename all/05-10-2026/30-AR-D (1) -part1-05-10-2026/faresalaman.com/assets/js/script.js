(function() {
  const toggleButton = document.querySelector('.n25c');
  const mobileMenu = document.querySelector('.n6a');
  const closeButton = document.querySelector('.nc1dcba');
  const mobileLinks = document.querySelectorAll('.e22');
  const body = document.body;

  function openMenu() {
    mobileMenu.classList.add('i82');
    toggleButton.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'if26';
  }

  function closeMenu() {
    mobileMenu.classList.remove('i82');
    toggleButton.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  }

  toggleButton.addEventListener('click', function() {
    if (mobileMenu.classList.contains('i82')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeButton.addEventListener('click', function() {
    closeMenu();
  });

  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      closeMenu();
    });
  });

  document.addEventListener('click', function(event) {
    if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
      if (mobileMenu.classList.contains('i82')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('i82')) {
      closeMenu();
    }
  });
})();

    (function() {
  var COOKIE_KEY = 'equestrian_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('if26');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('if26');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('if26');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.n6a');
  var _rt=document.querySelector('.n25c');
  var _ac='i82';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
