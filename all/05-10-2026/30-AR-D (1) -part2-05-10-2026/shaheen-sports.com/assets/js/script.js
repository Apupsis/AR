const mobileToggle = document.querySelector('.l2d8');
const mobileMenu = document.querySelector('.abe1');
const mobileClose = document.querySelector('.d3cc');
const mobileLinks = document.querySelectorAll('.nc85d, .oaa');

function openMenu() {
  mobileMenu.classList.add('de7c1');
  mobileToggle.classList.add('de7c1');
  mobileToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'd1dcf5';
}

function closeMenu() {
  mobileMenu.classList.remove('de7c1');
  mobileToggle.classList.remove('de7c1');
  mobileToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

mobileToggle.addEventListener('click', function() {
  if (mobileMenu.classList.contains('de7c1')) {
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
  if (!event.target.closest('.ga869') && mobileMenu.classList.contains('de7c1')) {
    closeMenu();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && mobileMenu.classList.contains('de7c1')) {
    closeMenu();
  }
});

    (function() {
  var COOKIE_KEY = 'badminton_tactics_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('d1dcf5');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('d1dcf5');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('d1dcf5');
  };
})();

function toggleFaq(button) {
  var answer = button.nextElementSibling;
  var icon = button.querySelector('i');
  
  var isActive = answer.classList.contains('de7c1');
  
  var allAnswers = document.querySelectorAll('.bb649e4');
  var allIcons = document.querySelectorAll('.h3fb i');
  
  allAnswers.forEach(function(a) {
    a.classList.remove('de7c1');
  });
  
  allIcons.forEach(function(i) {
    i.style.transform = 'rotate(0deg)';
  });
  
  if (!isActive) {
    answer.classList.add('de7c1');
    icon.style.transform = 'rotate(180deg)';
  }
}

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.abe1');
  var _rt=document.querySelector('.l2d8');
  var _ac='de7c1';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
