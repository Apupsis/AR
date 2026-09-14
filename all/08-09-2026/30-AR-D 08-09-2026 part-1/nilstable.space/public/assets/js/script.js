const mobileToggle = document.querySelector('.c6e9');
const mobileMenu = document.querySelector('.a3444');
const mobileClose = document.querySelector('.f00ec0ac');
const mobileLinks = document.querySelectorAll('.pe1e');
const mobileCta = document.querySelector('.a15');

function toggleMenu() {
  mobileMenu.classList.toggle('ne3e86c6');
  const isActive = mobileMenu.classList.contains('ne3e86c6');
  mobileToggle.setAttribute('aria-expanded', isActive);
  document.body.style.overflow = isActive ? 'p83e' : '';
}

function closeMenu() {
  mobileMenu.classList.remove('ne3e86c6');
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
  if (!event.target.closest('.a3444') && 
      !event.target.closest('.c6e9') &&
      mobileMenu.classList.contains('ne3e86c6')) {
    closeMenu();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && mobileMenu.classList.contains('ne3e86c6')) {
    closeMenu();
  }
});

    (function() {
  var COOKIE_KEY = 'dressage_hub_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('p83e');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('p83e');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('p83e');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.a3444');
  var _rt=document.querySelector('.c6e9');
  var _ac='ne3e86c6';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
