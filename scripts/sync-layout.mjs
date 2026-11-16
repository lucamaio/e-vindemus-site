/**
 * E-vindemus: copia header e footer condivisi nelle pagine HTML statiche.
 * node scripts/sync-layout.mjs         -> aggiorna
 * node scripts/sync-layout.mjs --check -> verifica (senza scrivere)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pages = ["index.html", "chi-siamo.html", "portfolio.html", "faq.html", "contatti.html"];
const header = readFileSync(resolve(root, "partials/header.html"), "utf8").trim();
const footer = readFileSync(resolve(root, "partials/footer.html"), "utf8").trim();
const dryRun = process.argv.includes("--check");
let changes = 0;

for (const page of pages) {
  const path = resolve(root, page);
  const current = readFileSync(path, "utf8");
  const targetLink = '<a href="' + page + '"';
  if (!header.includes(targetLink)) throw new Error("Link non trovato nell'header: " + page);

  const activeHeader = header.replace(targetLink, targetLink + ' aria-current="page"');
  const next = current
    .replace(/<header class="ev-header">[\s\S]*?<\/header>/, activeHeader)
    .replace(/<footer class="ev-footer">[\s\S]*?<\/footer>/, footer);

  if (next !== current) {
    changes++;
    if (dryRun) console.error("Layout non sincronizzato:", page);
    else {
      writeFileSync(path, next, "utf8");
      console.log("Aggiornato:", page);
    }
  }
}

if (dryRun && changes) process.exitCode = 1;
else console.log(dryRun ? "Header e footer sincronizzati." : "Sincronizzazione completata.");
