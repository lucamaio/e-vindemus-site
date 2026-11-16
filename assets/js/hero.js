/* Effetti decorativi della homepage: si disattivano su touch e con motion ridotto. */
/* E-vindemus — ambient pointer glow + poster parallax.
   Decorative only, disabled with reduced-motion or touch pointers. */
(function(){
  'use strict';
  const root=document.getElementById('ev-vindemus');
  if(!root || !window.matchMedia ||
     !window.matchMedia('(hover:hover) and (pointer:fine)').matches ||
     window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const hero=root.querySelector('.ev-hero');
  const composition=root.querySelector('.ev-hero-composition');
  if(!hero || !composition) return;
  let frame=0, nextX=0, nextY=0, nextGlowX=65, nextGlowY=32;
  hero.addEventListener('pointermove',function(e){
    const r=hero.getBoundingClientRect();
    nextGlowX=((e.clientX-r.left)/r.width)*100;
    nextGlowY=((e.clientY-r.top)/r.height)*100;
    nextX=((e.clientX-r.left)/r.width-.5)*19;
    nextY=((e.clientY-r.top)/r.height-.5)*19;
    if(frame) return;
    frame=requestAnimationFrame(function(){
      hero.style.setProperty('--ev-pointer-x',nextGlowX.toFixed(1)+'%');
      hero.style.setProperty('--ev-pointer-y',nextGlowY.toFixed(1)+'%');
      composition.style.setProperty('--ev-move-a-x',(nextX*.6).toFixed(2)+'px');
      composition.style.setProperty('--ev-move-a-y',(nextY*.6).toFixed(2)+'px');
      composition.style.setProperty('--ev-move-b-x',(-nextX*.5).toFixed(2)+'px');
      composition.style.setProperty('--ev-move-b-y',(-nextY*.5).toFixed(2)+'px');
      frame=0;
    });
  },{passive:true});
  hero.addEventListener('pointerleave',function(){
    if(frame){cancelAnimationFrame(frame);frame=0;}
    hero.style.setProperty('--ev-pointer-x','65%');
    hero.style.setProperty('--ev-pointer-y','32%');
    ['--ev-move-a-x','--ev-move-a-y','--ev-move-b-x','--ev-move-b-y'].forEach(function(prop){composition.style.setProperty(prop,'0px');});
  },{passive:true});
})();
