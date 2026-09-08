const headerLoopArena = {
  toggleButton: document.querySelector('.fd1'),
  closeButton: document.querySelector('.g47326'),
  mobileMenu: document.querySelector('.e69'),
  mobileLinks: document.querySelectorAll('.f0cfc2ec'),
  mobileMenuCta: document.querySelector('.f08'),

  init() {
    if (!this.toggleButton || !this.mobileMenu) return;

    this.toggleButton.addEventListener('click', () => this.toggleMenu());
    this.closeButton.addEventListener('click', () => this.closeMenu());

    this.mobileLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    this.mobileMenuCta.addEventListener('click', () => this.closeMenu());

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.a23321') && this.mobileMenu.classList.contains('fa069d3f')) {
        this.closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileMenu.classList.contains('fa069d3f')) {
        this.closeMenu();
      }
    });
  },

  toggleMenu() {
    const isActive = this.mobileMenu.classList.contains('fa069d3f');
    if (isActive) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  },

  openMenu() {
    this.mobileMenu.classList.add('fa069d3f');
    this.toggleButton.classList.add('fa069d3f');
    this.toggleButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'ff55c';
  },

  closeMenu() {
    this.mobileMenu.classList.remove('fa069d3f');
    this.toggleButton.classList.remove('fa069d3f');
    this.toggleButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  headerLoopArena.init();
});

    (function() {
  var COOKIE_KEY = 'pingpong_hub_consent';
  var banner = document.getElementById('cookieBanner');
  
  if (!banner) return;
  
  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('ff55c');
  }
  
  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('ff55c');
  };
  
  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('ff55c');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.e69');
  var _rt=document.querySelector('.fd1');
  var _ac='fa069d3f';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
