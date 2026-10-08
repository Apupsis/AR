const mobileToggle = document.querySelector('.lda');
const mobileMenu = document.querySelector('.m730');
const mobileClose = document.querySelector('.eafcb8');
const mobileLinks = document.querySelectorAll('.od31d');

function openMenu() {
  mobileMenu.classList.add('m0d769');
  mobileToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'ff4fff';
}

function closeMenu() {
  mobileMenu.classList.remove('m0d769');
  mobileToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

mobileToggle.addEventListener('click', function() {
  if (mobileMenu.classList.contains('m0d769')) {
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
    if (mobileMenu.classList.contains('m0d769')) {
      closeMenu();
    }
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && mobileMenu.classList.contains('m0d769')) {
    closeMenu();
  }
});

    (function() {
  var COOKIE_KEY = 'volleyball_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('ff4fff');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('ff4fff');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('ff4fff');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.m730');
  var _rt=document.querySelector('.lda');
  var _ac='m0d769';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
