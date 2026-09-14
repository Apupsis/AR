document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.ha487');
  const mobileMenu = document.querySelector('.n49943cf');
  const mobileClose = document.querySelector('.k68c50');
  const mobileLinks = document.querySelectorAll('.g14c2b');
  const mobileCta = document.querySelector('.nf3');

  function openMenu() {
    mobileMenu.classList.add('he1cb');
    mobileToggle.classList.add('he1cb');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'l1de';
  }

  function closeMenu() {
    mobileMenu.classList.remove('he1cb');
    mobileToggle.classList.remove('he1cb');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('he1cb')) {
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
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnToggle = mobileToggle.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnToggle && mobileMenu.classList.contains('he1cb')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('he1cb')) {
      closeMenu();
    }
  });
});

    (function() {
  var COOKIE_KEY = 'ping_pong_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('l1de');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('l1de');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('l1de');
  };
  
  var accordionTriggers = document.querySelectorAll('.oa36da6');
  accordionTriggers.forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      var content = this.nextElementSibling;
      var isActive = content.classList.contains('he1cb');
      
      accordionTriggers.forEach(function(otherTrigger) {
        var otherContent = otherTrigger.nextElementSibling;
        otherContent.classList.remove('he1cb');
        otherTrigger.setAttribute('aria-expanded', 'false');
      });
      
      if (!isActive) {
        content.classList.add('he1cb');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.n49943cf');
  var _rt=document.querySelector('.ha487');
  var _ac='he1cb';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
