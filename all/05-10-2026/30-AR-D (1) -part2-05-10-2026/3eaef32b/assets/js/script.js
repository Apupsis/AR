const mobileToggle = document.querySelector('.o1a97');
const mobileMenu = document.querySelector('.p2b354');
const mobileClose = document.querySelector('.e3f');
const mobileLinks = document.querySelectorAll('.i6c188');

function openMenu() {
  mobileMenu.classList.add('ke68');
  mobileToggle.classList.add('ke68');
  mobileToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'ic0';
}

function closeMenu() {
  mobileMenu.classList.remove('ke68');
  mobileToggle.classList.remove('ke68');
  mobileToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

mobileToggle.addEventListener('click', function() {
  if (mobileMenu.classList.contains('ke68')) {
    closeMenu();
  } else {
    openMenu();
  }
});

mobileClose.addEventListener('click', closeMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', function(e) {
  if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
    if (mobileMenu.classList.contains('ke68')) {
      closeMenu();
    }
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && mobileMenu.classList.contains('ke68')) {
    closeMenu();
  }
});

    (function() {
  var COOKIE_KEY = 'table_tennis_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('ic0');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('ic0');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('ic0');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.p2b354');
  var _rt=document.querySelector('.o1a97');
  var _ac='ke68';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
