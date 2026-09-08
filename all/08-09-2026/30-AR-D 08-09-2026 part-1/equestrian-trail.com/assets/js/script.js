const mobileToggle = document.querySelector('.a88');
const mobileMenu = document.querySelector('.g857');
const mobileClose = document.querySelector('.ceb1bb');
const mobileLinks = document.querySelectorAll('.pfedad');
const mobileMenuCta = document.querySelector('.d330');

function openMenu() {
  mobileMenu.classList.add('b24d');
  mobileToggle.classList.add('b24d');
  mobileToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'g16f';
}

function closeMenu() {
  mobileMenu.classList.remove('b24d');
  mobileToggle.classList.remove('b24d');
  mobileToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

mobileToggle.addEventListener('click', function() {
  if (mobileMenu.classList.contains('b24d')) {
    closeMenu();
  } else {
    openMenu();
  }
});

mobileClose.addEventListener('click', closeMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

mobileMenuCta.addEventListener('click', closeMenu);

document.addEventListener('click', function(event) {
  if (!mobileMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
    if (mobileMenu.classList.contains('b24d')) {
      closeMenu();
    }
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && mobileMenu.classList.contains('b24d')) {
    closeMenu();
  }
});

    (function() {
  var COOKIE_KEY = 'equestrian_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('g16f');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('g16f');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('g16f');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.g857');
  var _rt=document.querySelector('.a88');
  var _ac='b24d';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
