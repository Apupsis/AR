const mobileToggle = document.querySelector('.j8b7');
const mobileMenu = document.querySelector('.ke2');
const mobileClose = document.querySelector('.kf44bb4');
const mobileLinks = document.querySelectorAll('.o25bf3');

function openMobileMenu() {
  mobileMenu.classList.add('d4d');
  mobileToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hd7';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('d4d');
  mobileToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

mobileToggle.addEventListener('click', function() {
  if (mobileMenu.classList.contains('d4d')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

mobileClose.addEventListener('click', closeMobileMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('click', function(event) {
  if (!mobileMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
    if (mobileMenu.classList.contains('d4d')) {
      closeMobileMenu();
    }
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && mobileMenu.classList.contains('d4d')) {
    closeMobileMenu();
  }
});

    (function() {
  var COOKIE_KEY = 'karting_cookie_consent';
  var banner = document.getElementById('cookieBanner');

  if (!banner) return;

  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('hd7');
  }

  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('hd7');
  };

  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('hd7');
  };

  function toggleFaq(button) {
    var faqItem = button.parentElement;
    var answer = faqItem.querySelector('.n48fce68');
    var isOpen = answer.style.display !== 'none';

    if (isOpen) {
      answer.style.display = 'none';
      faqItem.classList.remove('d4d');
    } else {
      answer.style.display = 'block';
      faqItem.classList.add('d4d');
    }
  }

  window.toggleFaq = toggleFaq;
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.ke2');
  var _rt=document.querySelector('.j8b7');
  var _ac='d4d';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
