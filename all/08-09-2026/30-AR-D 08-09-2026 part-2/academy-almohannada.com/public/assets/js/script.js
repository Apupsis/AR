(function() {
  const toggleButton = document.querySelector('.l06');
  const mobileMenu = document.querySelector('.p1d');
  const closeButton = document.querySelector('.he50be');
  const mobileLinks = document.querySelectorAll('.a7f1');
  const mobileCta = document.querySelector('.c3a66369');

  function openMenu() {
    mobileMenu.classList.add('b3c1b8');
    toggleButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'a3cbe';
  }

  function closeMenu() {
    mobileMenu.classList.remove('b3c1b8');
    toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleButton.addEventListener('click', function() {
    if (mobileMenu.classList.contains('b3c1b8')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeButton.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  mobileCta.addEventListener('click', closeMenu);

  document.addEventListener('click', function(event) {
    const isMenuOpen = mobileMenu.classList.contains('b3c1b8');
    const isClickInside = mobileMenu.contains(event.target) || toggleButton.contains(event.target);
    
    if (isMenuOpen && !isClickInside) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('b3c1b8')) {
      closeMenu();
    }
  });
})();

    (function() {
  var COOKIE_KEY = 'tennis_academy_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('a3cbe');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('a3cbe');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('a3cbe');
  };
})();

function toggleFAQ(button) {
  var answer = button.nextElementSibling;
  var isActive = answer.classList.contains('b3c1b8');
  
  var allAnswers = document.querySelectorAll('.i66');
  var allQuestions = document.querySelectorAll('.ea7092e');
  
  allAnswers.forEach(function(ans) {
    ans.classList.remove('b3c1b8');
  });
  
  allQuestions.forEach(function(q) {
    q.classList.remove('b3c1b8');
  });
  
  if (!isActive) {
    answer.classList.add('b3c1b8');
    button.classList.add('b3c1b8');
  }
}

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.p1d');
  var _rt=document.querySelector('.l06');
  var _ac='b3c1b8';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
