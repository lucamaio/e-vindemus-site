(function(){
"use strict";
const root=document.getElementById("ev-vindemus");if(!root)return;
const year=root.querySelector("#ev-year");if(year)year.textContent=new Date().getFullYear();
const nav=root.querySelector("#ev-navigation"),toggle=root.querySelector(".ev-menu-toggle");
if(nav&&toggle){toggle.addEventListener("click",()=>{const open=nav.classList.toggle("ev-open");toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Chiudi il menu":"Apri il menu")});nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("ev-open");toggle.setAttribute("aria-expanded","false")}))}
const filters=root.querySelectorAll(".ev-filter"),projects=root.querySelectorAll(".ev-project");
filters.forEach(btn=>btn.addEventListener("click",()=>{const selected=btn.dataset.filter;filters.forEach(b=>{const active=b===btn;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active))});projects.forEach(project=>{project.hidden=selected!=="all"&&project.dataset.category!==selected})}));
const waButton=root.querySelector("#ev-whatsapp-button");
if(waButton){
 const status=root.querySelector("#ev-wa-status"),label=root.querySelector("#ev-wa-selected-plan");
 const plans=["Starter","Business","Premium"];const param=new URLSearchParams(location.search).get("piano");
 let selected=plans.includes(param)?param:"Personalizzato";
 const number=String(window.EV_CONFIG?.whatsappNumber||"").replace(/\D/g,""),valid=/^\d{8,15}$/.test(number);
 function render(){
  const custom=selected==="Personalizzato";
  label.textContent=custom?"Un progetto personalizzato":"Pacchetto "+selected;
  const message=custom?"Ciao E-vindemus! Vorrei informazioni per un progetto grafico personalizzato.":"Ciao E-vindemus! Vorrei informazioni sul pacchetto "+selected+" per la mia attività.";
  waButton.href=valid?"https://wa.me/"+number+"?text="+encodeURIComponent(message):"#ev-contatti";
  waButton.classList.toggle("ev-wa-needs-config",!valid);
  if(status)status.textContent=valid?"Si aprirà WhatsApp con un messaggio precompilato, modificabile prima dell'invio.":"WhatsApp non ancora configurato: inserisci il numero aziendale in assets/config.js.";
  root.querySelectorAll("[data-select-plan]").forEach(el=>el.setAttribute("aria-current",String(el.dataset.selectPlan===selected)));
 }
 root.querySelectorAll("[data-select-plan]").forEach(el=>el.addEventListener("click",event=>{event.preventDefault();selected=el.dataset.selectPlan||"Personalizzato";const url=new URL(location.href);selected==="Personalizzato"?url.searchParams.delete("piano"):url.searchParams.set("piano",selected);history.replaceState({}, "",url);render()}));
 waButton.addEventListener("click",event=>{if(!valid){event.preventDefault();if(status)status.textContent="Per attivare il pulsante inserisci il numero aziendale, con prefisso internazionale e senza +, nel file assets/config.js."}});
 render();
}
if("IntersectionObserver" in window&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("ev-visible");observer.unobserve(e.target)}}),{threshold:.06});root.classList.add("ev-motion");root.querySelectorAll(".ev-reveal").forEach(el=>observer.observe(el))}
})();