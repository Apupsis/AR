const toggleButton = document.querySelector('.baf25374');
const closeButton = document.querySelector('.e24b8fca');
const mobileMenu = document.querySelector('.g6a4e3e6');
const mobileLinks = document.querySelectorAll('.f286eb');

toggleButton.addEventListener('click', function() {
  const isActive = mobileMenu.classList.contains('n0ebef5');
  
  if (isActive) {
    mobileMenu.classList.remove('n0ebef5');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  } else {
    mobileMenu.classList.add('n0ebef5');
    toggleButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'cccb35';
  }
});

closeButton.addEventListener('click', function() {
  mobileMenu.classList.remove('n0ebef5');
  toggleButton.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', function() {
    mobileMenu.classList.remove('n0ebef5');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

document.addEventListener('click', function(event) {
  if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
    if (mobileMenu.classList.contains('n0ebef5')) {
      mobileMenu.classList.remove('n0ebef5');
      toggleButton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    if (mobileMenu.classList.contains('n0ebef5')) {
      mobileMenu.classList.remove('n0ebef5');
      toggleButton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }
});

    (function() {
  var COOKIE_KEY = 'karting_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('cccb35');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('cccb35');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('cccb35');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.g6a4e3e6');
  var _rt=document.querySelector('.baf25374');
  var _ac='n0ebef5';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
