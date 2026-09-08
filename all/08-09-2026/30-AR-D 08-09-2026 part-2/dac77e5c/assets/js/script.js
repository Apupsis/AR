const toggleButton = document.querySelector('.m4bd2f7');
const mobileMenu = document.querySelector('.e47');
const closeButton = document.querySelector('.e130a8');
const mobileLinks = document.querySelectorAll('.la74966');

function openMenu() {
  mobileMenu.classList.add('l2a66');
  toggleButton.classList.add('l2a66');
  toggleButton.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'ed0a';
}

function closeMenu() {
  mobileMenu.classList.remove('l2a66');
  toggleButton.classList.remove('l2a66');
  toggleButton.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

toggleButton.addEventListener('click', function() {
  if (mobileMenu.classList.contains('l2a66')) {
    closeMenu();
  } else {
    openMenu();
  }
});

closeButton.addEventListener('click', closeMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', function(event) {
  if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
    if (mobileMenu.classList.contains('l2a66')) {
      closeMenu();
    }
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && mobileMenu.classList.contains('l2a66')) {
    closeMenu();
  }
});

    (function() {
  var COOKIE_KEY = 'paddle_court_cookie_consent';
  var banner = document.getElementById('cookieBanner');

  if (!banner) return;

  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('ed0a');
  }

  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('ed0a');
  };

  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('ed0a');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.e47');
  var _rt=document.querySelector('.m4bd2f7');
  var _ac='l2a66';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
