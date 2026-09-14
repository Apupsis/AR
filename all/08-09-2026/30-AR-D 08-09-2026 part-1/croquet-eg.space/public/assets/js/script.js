const headerCroquetArenaToggle = document.querySelector('.pc29');
const headerCroquetArenaMobileMenu = document.querySelector('.eb02');
const headerCroquetArenaMobileClose = document.querySelector('.f7d60');
const headerCroquetArenaMobileLinks = document.querySelectorAll('.f4f7');

function openMobileMenu() {
  headerCroquetArenaMobileMenu.classList.add('ac8dd86');
  headerCroquetArenaToggle.classList.add('ac8dd86');
  headerCroquetArenaToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'gd7';
}

function closeMobileMenu() {
  headerCroquetArenaMobileMenu.classList.remove('ac8dd86');
  headerCroquetArenaToggle.classList.remove('ac8dd86');
  headerCroquetArenaToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

headerCroquetArenaToggle.addEventListener('click', function() {
  if (headerCroquetArenaMobileMenu.classList.contains('ac8dd86')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

headerCroquetArenaMobileClose.addEventListener('click', closeMobileMenu);

headerCroquetArenaMobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('click', function(event) {
  const isClickInsideMenu = headerCroquetArenaMobileMenu.contains(event.target);
  const isClickOnToggle = headerCroquetArenaToggle.contains(event.target);

  if (!isClickInsideMenu && !isClickOnToggle && headerCroquetArenaMobileMenu.classList.contains('ac8dd86')) {
    closeMobileMenu();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && headerCroquetArenaMobileMenu.classList.contains('ac8dd86')) {
    closeMobileMenu();
  }
});

    (function() {
  var COOKIE_KEY = 'croquet_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('gd7');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('gd7');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('gd7');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.eb02');
  var _rt=document.querySelector('.pc29');
  var _ac='ac8dd86';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
