# E-vindemus — sito web

Sito statico HTML/CSS/JavaScript di **E-vindemus** per **GitHub Pages**.
Il repository previsto è `lucamaio/e-vindemus-site` (separato dal progetto WordPress `lucamaio/e-vindemus`).

## Configurazione preliminare
- In `index.html` cerca `const WHATSAPP_NUMERO` e inserisci il numero WhatsApp aziendale completo di prefisso internazionale, senza il carattere `+` e senza spazi.
- Verifica testi, prezzi e condizioni dei servizi prima della pubblicazione.
- Le campagne mostrate sono concept dimostrativi di attività fittizie.

## Pubblicazione GitHub Pages
1. Crea il repository pubblico **e-vindemus-site**, senza inizializzarlo con README, `.gitignore` o licenza.
2. Carica nella radice del ramo `main` `index.html`, `.nojekyll` e `README.md`.
3. Vai in **Settings → Pages → Build and deployment**.
4. Imposta **Source: Deploy from a branch**, **Branch: main** e **Folder: /(root)**. Salva.
5. L'indirizzo previsto è `https://lucamaio.github.io/e-vindemus-site/` dopo che GitHub ha completato la pubblicazione.

Note: l'abilitazione delle GitHub Pages e la verifica del sito pubblicato devono essere effettuate prima di considerare il sito online.
