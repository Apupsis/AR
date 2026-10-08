document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.b301d');
  const mobileMenu = document.querySelector('.oa1be1');
  const mobileClose = document.querySelector('.h47d2');
  const mobileLinks = document.querySelectorAll('.j340d3f');

  function toggleMenu() {
    const isActive = mobileMenu.classList.contains('id18a0c0');
    
    if (isActive) {
      mobileMenu.classList.remove('id18a0c0');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.add('id18a0c0');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'g380b205';
    }
  }

  function closeMenu() {
    mobileMenu.classList.remove('id18a0c0');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', toggleMenu);

  mobileClose.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.a04a5')) {
      if (mobileMenu.classList.contains('id18a0c0')) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('id18a0c0')) {
      closeMenu();
    }
  });
});

    (function() {
  var COOKIE_KEY = 'karting_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');

  if (!banner) return;

  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('g380b205');
  }

  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('g380b205');
  };

  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('g380b205');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.oa1be1');
  var _rt=document.querySelector('.b301d');
  var _ac='id18a0c0';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
