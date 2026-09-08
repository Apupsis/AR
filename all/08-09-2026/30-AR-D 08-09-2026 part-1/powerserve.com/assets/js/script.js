const headerPowerServe = {
  toggle: document.querySelector('.cc13bf'),
  menu: document.querySelector('.he9e88'),
  closeBtn: document.querySelector('.k8df'),
  links: document.querySelectorAll('.edea473'),

  init() {
    if (!this.toggle || !this.menu) return;

    this.toggle.addEventListener('click', () => this.toggleMenu());
    this.closeBtn.addEventListener('click', () => this.closeMenu());

    this.links.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.g73c')) {
        this.closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMenu();
      }
    });
  },

  toggleMenu() {
    const isOpen = this.menu.classList.contains('i968229');
    if (isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  },

  openMenu() {
    this.menu.classList.add('i968229');
    this.toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'fc4';
  },

  closeMenu() {
    this.menu.classList.remove('i968229');
    this.toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
};

document.addEventListener('DOMContentLoaded', () => headerPowerServe.init());

    (function() {
  var COOKIE_KEY = 'volleyball_hub_cookie_consent';
  var banner = document.getElementById('cookieBanner');

  if (!banner) return;

  if (localStorage.getItem(COOKIE_KEY)) {
    banner.classList.add('fc4');
  }

  window.acceptCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    banner.classList.add('fc4');
  };

  window.declineCookies = function() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    banner.classList.add('fc4');
  };
})();

    
    
// FIX:RESIZE — закрыть меню при переходе на десктоп
(function(){
  var _rm=document.querySelector('.he9e88');
  var _rt=document.querySelector('.cc13bf');
  var _ac='i968229';
  if(!_rm) return;
  window.addEventListener('resize',function(){
    if(window.innerWidth>=768&&_rm.classList.contains(_ac)){
      _rm.classList.remove(_ac);
      if(_rt) _rt.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
})();
