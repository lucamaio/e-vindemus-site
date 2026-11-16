/**
 * Controlli statici senza dipendenze. Eseguire:
 * node scripts/check-site.mjs
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pages = ["index.html", "chi-siamo.html", "portfolio.html", "faq.html", "contatti.html"];
const styles = ["base", "liquid-glass", "brand", "whatsapp", "pages", "icons", "theme", "campaigns"];
const posters = ["forneo-nuova-apertura", "forneo-giro-pizza-15", "forneo-pizza-birra-18", "forneo-serata-speciale"];
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };

for (const page of pages) {
  const html = readFileSync(resolve(root, page), "utf8");
  check(html.includes("<main") && html.includes("</main>"), page + ": manca main");
  check(html.includes('id="ev-navigation"'), page + ": manca il menu");
  check(html.includes('class="ev-theme-toggle"'), page + ": manca il selettore tema");

  for (const name of styles) {
    check(html.includes("assets/css/" + name + ".css"), page + ": manca CSS " + name);
  }
  for (const name of ["config", "theme-init", "site", "theme"]) {
    check(html.includes("assets/js/" + name + ".js"), page + ": manca JS " + name);
  }

  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  check(new Set(ids).size === ids.length, page + ": identificatori HTML duplicati");

  for (const match of html.matchAll(/(?:src|href)="(assets\/[^"#?]+)"/g)) {
    check(existsSync(resolve(root, match[1])), page + ": asset non trovato " + match[1]);
  }
  for (const match of html.matchAll(/href="((?:index|chi-siamo|portfolio|faq|contatti)\.html)(?:#[^"]*)?"/g)) {
    check(existsSync(resolve(root, match[1])), page + ": collegamento mancante " + match[1]);
  }

  if (page === "index.html" || page === "portfolio.html") {
    check((html.match(/class="ev-project ev-reveal"/g) || []).length === 4, page + ": numero campagne non corretto");
    for (const poster of posters) {
      check(html.includes(poster + ".webp"), page + ": grafica non presente " + poster);
    }
  }
}
const contacts = readFileSync(resolve(root, "contatti.html"), "utf8");
check(contacts.includes('id="ev-whatsapp-button"'), "Contatti: WhatsApp mancante");
check(contacts.includes("data-select-plan"), "Contatti: scelta pacchetto mancante");
check(readFileSync(resolve(root, "assets/js/config.js"), "utf8").includes("whatsappNumber"),
  "Configurazione WhatsApp mancante");

if (errors.length) {
  errors.forEach(error => console.error("ERRORE:", error));
  process.exitCode = 1;
} else {
  console.log("OK: pagine, navigazione, collegamenti, risorse e campagne.");
}
