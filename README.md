# E-vindemus — sito statico per GitHub Pages

## Pagine
- `index.html` — homepage, servizi, pacchetti e collegamenti
- `chi-siamo.html` — identità, approccio e metodo
- `portfolio.html` — quattro campagne dimostrative per attività fittizie, con filtri
- `faq.html` — domande frequenti
- `contatti.html` — selezione del pacchetto e contatto WhatsApp

## File condivisi
- `assets/site-base.css`: stili originali E-vindemus
- `assets/pages.css`: stile pagine interne, responsive e Liquid Glass
- `assets/pages.js`: menu, filtri, FAQ native e contatto WhatsApp
- `assets/config.js`: numero WhatsApp pubblico

## Prima della pubblicazione
Apri `assets/config.js` e sostituisci la stringa vuota di `whatsappNumber` con il numero aziendale completo di prefisso internazionale, senza `+` o spazi. Fino ad allora il pulsante rimane inattivo. Non inserire password o segreti nei file del sito pubblico.

Verifica e conferma prezzi, condizioni di vendita e contenuti commerciali. Le quattro campagne del portfolio sono esempi originali per attività fittizie e non collaborazioni reali.

## GitHub Pages
Imposta **Settings → Pages → Deploy from a branch → main → /(root)**.
Indirizzo previsto: https://lucamaio.github.io/e-vindemus-site/

## Tema chiaro e scuro
Tutte le pagine includono il selettore sole/luna nell'header. Al primo accesso viene utilizzato il tema del dispositivo; le scelte successive vengono salvate localmente nel browser con la chiave `ev-theme`. I file dedicati sono `assets/theme.css` e `assets/theme.js`.

## Portfolio Fornéo 27
Le immagini WebP in `assets/campagne/` sono quattro concept originali a scopo dimostrativo per una pizzeria immaginaria: nuova apertura, giro pizza a 15 €, pizza + birra a 18 € e serata musicale. Prezzi, orari e offerte non sono reali. Gli stessi poster sono mostrati nell'homepage e in `portfolio.html` con filtri di categoria. Per cambiare gli asset, sostituire i file WebP mantenendone i nomi oppure aggiornare i percorsi HTML. Le immagini sono ottimizzate a 920 × 920 px.
