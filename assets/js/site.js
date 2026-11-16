/**
 * Interazioni condivise di E-vindemus.
 * Script nativo senza dipendenze: menu, portfolio, WhatsApp e animazioni.
 */
(function () {
  "use strict";

  const root = document.getElementById("ev-vindemus");
  if (!root) return;

  function initNavigation() {
    const nav = root.querySelector("#ev-navigation");
    const toggle = root.querySelector(".ev-menu-toggle");
    if (!nav || !toggle) return;

    function setMenuOpen(open) {
      nav.classList.toggle("ev-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
    }

    toggle.addEventListener("click", () => {
      setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => setMenuOpen(false));
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") setMenuOpen(false);
    });
  }

  function initPortfolioFilters() {
    const filters = root.querySelectorAll(".ev-filter");
    const projects = root.querySelectorAll(".ev-project");
    if (!filters.length || !projects.length) return;

    filters.forEach(button => {
      button.addEventListener("click", () => {
        const category = button.dataset.filter;
        filters.forEach(filter => {
          const isActive = button === filter;
          filter.classList.toggle("is-active", isActive);
          filter.setAttribute("aria-pressed", String(isActive));
        });
        projects.forEach(project => {
          project.hidden = category !== "all" && project.dataset.category !== category;
        });
      });
    });
  }

  function initWhatsApp() {
    const button = root.querySelector("#ev-whatsapp-button");
    if (!button) return;

    const status = root.querySelector("#ev-wa-status");
    const label = root.querySelector("#ev-wa-selected-plan");
    const buttons = root.querySelectorAll("[data-select-plan]");
    const plans = ["Starter", "Business", "Premium"];
    const request = new URLSearchParams(location.search).get("piano");

    let selected = plans.includes(request) ? request : "Personalizzato";
    const number = String(window.EV_CONFIG?.whatsappNumber || "").replace(/\D/g, "");
    const valid = /^\d{8,15}$/.test(number);

    function updateLink() {
      const custom = selected === "Personalizzato";
      const message = custom
        ? "Ciao E-vindemus! Vorrei informazioni per un progetto grafico personalizzato."
        : "Ciao E-vindemus! Vorrei informazioni sul pacchetto " + selected + " per la mia attività.";

      if (label) label.textContent = custom ? "Un progetto personalizzato" : "Pacchetto " + selected;
      button.href = valid
        ? "https://wa.me/" + number + "?text=" + encodeURIComponent(message)
        : "#ev-contatti";
      button.classList.toggle("ev-wa-needs-config", !valid);
      if (status) {
        status.textContent = valid
          ? "Si aprirà WhatsApp con un messaggio precompilato, modificabile prima dell'invio."
          : "WhatsApp non ancora configurato: inserisci il numero aziendale in assets/js/config.js.";
      }
      buttons.forEach(option => {
        option.setAttribute("aria-current", String(option.dataset.selectPlan === selected));
      });
    }

    buttons.forEach(option => {
      option.addEventListener("click", event => {
        event.preventDefault();
        selected = option.dataset.selectPlan || "Personalizzato";
        const url = new URL(location.href);
        if (selected === "Personalizzato") url.searchParams.delete("piano");
        else url.searchParams.set("piano", selected);
        history.replaceState({}, "", url);
        updateLink();
      });
    });

    button.addEventListener("click", event => {
      if (!valid) {
        event.preventDefault();
        if (status) {
          status.textContent = "Per attivare il pulsante inserisci il numero aziendale, con prefisso internazionale, in assets/js/config.js.";
        }
      }
    });

    updateLink();
  }

  function initRevealAnimations() {
    const reduceMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || reduceMotion) return;

    const elements = root.querySelectorAll(".ev-reveal");
    if (!elements.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("ev-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.06 });

    root.classList.add("ev-motion");
    elements.forEach(element => observer.observe(element));
  }

  const year = root.querySelector("#ev-year");
  if (year) year.textContent = String(new Date().getFullYear());

  initNavigation();
  initPortfolioFilters();
  initWhatsApp();
  initRevealAnimations();
})();
