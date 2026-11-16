(function(){
  "use strict";
  var root=document.documentElement;
  var button=document.querySelector("#ev-vindemus .ev-theme-toggle");
  var meta=document.querySelector('meta[name="theme-color"]');
  var storageKey="ev-theme";
  var saved=null;
  try{saved=localStorage.getItem(storageKey)}catch(e){}
  var locked=(saved==="dark"||saved==="light");
  var media=typeof window.matchMedia==="function"?window.matchMedia("(prefers-color-scheme: dark)"):null;

  function apply(theme,persist){
    var active=theme==="dark"?"dark":"light";
    root.setAttribute("data-ev-theme",active);
    root.style.colorScheme=active;
    if(meta)meta.setAttribute("content",active==="dark"?"#101e1b":"#132C2A");
    if(button){
      var dark=active==="dark";
      var action=dark?"Attiva il tema chiaro":"Attiva il tema scuro";
      button.setAttribute("aria-label",action);
      button.setAttribute("title",action);
      button.setAttribute("aria-pressed",String(dark));
      var label=button.querySelector(".ev-theme-label");
      if(label)label.textContent=dark?"Scuro":"Chiaro";
    }
    if(persist){
      locked=true;
      try{localStorage.setItem(storageKey,active)}catch(e){}
    }
  }

  apply(root.getAttribute("data-ev-theme")==="dark"?"dark":"light",false);
  if(button){button.addEventListener("click",function(){
    apply(root.getAttribute("data-ev-theme")==="dark"?"light":"dark",true);
  });}
  if(media){
    var onChange=function(event){if(!locked)apply(event.matches?"dark":"light",false)};
    if(typeof media.addEventListener==="function")media.addEventListener("change",onChange);
    else if(typeof media.addListener==="function")media.addListener(onChange);
  }
})();