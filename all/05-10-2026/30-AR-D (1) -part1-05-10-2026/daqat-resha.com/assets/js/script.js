const mobileToggle = document.querySelector('.kfa2e24c');
const mobileMenu = document.querySelector('.i92335a4');
const mobileClose = document.querySelector('.ie4585');
const mobileLinks = document.querySelectorAll('.p08ec82');
const mobileCta = document.querySelector('.e4bfea');

function openMenu() {
  mobileMenu.classList.add('d3815fa9');
  mobileToggle.classList.add('d3815fa9');
  mobileToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'l6e4a5';
}

function closeMenu() {
  mobileMenu.classList.remove('d3815fa9');
  mobileToggle.classList.remove('d3815fa9');
  mobileToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

mobileToggle.addEventListener('click', function() {
  if (mobileMenu.classList.contains('d3815fa9')) {
    closeMenu();
  } else {
    openMenu();
  }
});

mobileClose.addEventListener('click', closeMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

mobileCta.addEventListener('click', closeMenu);

document.addEventListener('click', function(event) {
  if (!mobileMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
    if (mobileMenu.classList.contains('d3815fa9')) {
      closeMenu();
    }
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && mobileMenu.classList.contains('d3815fa9')) {
    closeMenu();
  }
});

    (function() {
  var COOKIE_KEY = 'badminton_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('l6e4a5');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('l6e4a5');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('l6e4a5');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.i92335a4');
  var _rt=document.querySelector('.kfa2e24c');
  var _ac='d3815fa9';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
