const mobileToggle = document.querySelector('.dc17d0');
const mobileMenu = document.querySelector('.ae3a1d6');
const mobileClose = document.querySelector('.eee67');
const mobileLinks = document.querySelectorAll('.cb353c42');

function openMenu() {
  mobileMenu.classList.add('hdce1b');
  mobileToggle.classList.add('hdce1b');
  mobileToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'ja9';
}

function closeMenu() {
  mobileMenu.classList.remove('hdce1b');
  mobileToggle.classList.remove('hdce1b');
  mobileToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

mobileToggle.addEventListener('click', function() {
  if (mobileMenu.classList.contains('hdce1b')) {
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
    if (mobileMenu.classList.contains('hdce1b')) {
      closeMenu();
    }
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && mobileMenu.classList.contains('hdce1b')) {
    closeMenu();
  }
});

    (function() {
  var COOKIE_KEY = 'karting_grid_hub_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('ja9');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('ja9');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('ja9');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.ae3a1d6');
  var _rt=document.querySelector('.dc17d0');
  var _ac='hdce1b';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
