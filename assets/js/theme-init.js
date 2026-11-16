/* Applica la preferenza cromatica prima del rendering, prevenendo il flash del tema. */
(function(){var t;try{t=localStorage.getItem('ev-theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-ev-theme',t);document.documentElement.style.colorScheme=t})();
