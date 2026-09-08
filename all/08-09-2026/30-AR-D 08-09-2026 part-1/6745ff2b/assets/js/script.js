const mobileToggle = document.querySelector('.a96837');
const mobileMenu = document.querySelector('.l38993');
const mobileClose = document.querySelector('.h83');
const mobileLinks = document.querySelectorAll('.e2f, .p9d7a18');

function openMenu() {
  mobileMenu.classList.add('mb832e9');
  mobileToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'e1a7b89c';
}

function closeMenu() {
  mobileMenu.classList.remove('mb832e9');
  mobileToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

mobileToggle.addEventListener('click', function() {
  if (mobileMenu.classList.contains('mb832e9')) {
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
    if (mobileMenu.classList.contains('mb832e9')) {
      closeMenu();
    }
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && mobileMenu.classList.contains('mb832e9')) {
    closeMenu();
  }
});

    (function() {
  var COOKIE_KEY = 'ping_pong_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('e1a7b89c');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('e1a7b89c');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('e1a7b89c');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.l38993');
  var _rt=document.querySelector('.a96837');
  var _ac='mb832e9';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
