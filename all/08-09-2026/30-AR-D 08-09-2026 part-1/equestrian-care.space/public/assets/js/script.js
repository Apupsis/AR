const mobileToggle = document.querySelector('.hd9');
const mobileMenu = document.querySelector('.h662cec');
const mobileClose = document.querySelector('.n5c24c8');
const mobileLinks = document.querySelectorAll('.g39db3');
const mobileCta = document.querySelector('.b0ecb');

function toggleMenu() {
  const isOpen = mobileMenu.classList.contains('b8d112');
  
  if (isOpen) {
    mobileMenu.classList.remove('b8d112');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  } else {
    mobileMenu.classList.add('b8d112');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'i28';
  }
}

function closeMenu() {
  mobileMenu.classList.remove('b8d112');
  mobileToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

mobileToggle.addEventListener('click', toggleMenu);

mobileClose.addEventListener('click', closeMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

mobileCta.addEventListener('click', closeMenu);

document.addEventListener('click', function(event) {
  if (!mobileMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
    if (mobileMenu.classList.contains('b8d112')) {
      closeMenu();
    }
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && mobileMenu.classList.contains('b8d112')) {
    closeMenu();
  }
});

    (function() {
  var COOKIE_KEY = 'equine_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('i28');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('i28');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('i28');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.h662cec');
  var _rt=document.querySelector('.hd9');
  var _ac='b8d112';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
