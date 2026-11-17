# E-vindemus · Creative Studio

Sito vetrina statico, pubblicato su GitHub Pages, senza framework o build obbligatoria.
I contenuti sono HTML e le risorse sono divise per responsabilità.

## Struttura

```text
index.html                Homepage e anteprime delle pagine
chi-siamo.html            Presentazione dello studio
portfolio.html            Quattro campagne dimostrative
servizi.html              Servizi e metodo creativo
pacchetti.html            Piani mensili e confronto
faq.html                  Domande frequenti
contatti.html             Selezione dei piani e WhatsApp
assets/
  campagne/              Quattro locandine WebP originali
  css/
    base.css              Fondamenta e componenti
    liquid-glass.css      Effetti glass e animazioni CSS
    brand.css             Palette verde petrolio e rame
    whatsapp.css          Sezione di contatto
    pages.css             Pagine interne
    icons.css             Icone SVG inline
    theme.css             Light/Dark Mode
    campaigns.css         Galleria grafica
  js/
    config.js             Numero WhatsApp
    theme-init.js         Tema iniziale senza flash
    theme.js              Cambio e persistenza del tema
    site.js               Menu, filtri, WhatsApp, reveal
    hero.js               Effetti della sola homepage
partials/
  header.html             Modello condiviso di header
  footer.html             Modello condiviso di footer
scripts/
  sync-layout.mjs         Sincronizzazione HTML statico
  check-site.mjs          Verifica di file e collegamenti
```

## Come intervenire

- **Testi e sezioni:** modifica il rispettivo HTML nella cartella principale.
- **Header e footer:** modifica i file in `partials/`, poi esegui `node scripts/sync-layout.mjs`. I componenti vengono copiati nel markup statico, leggibile anche senza JavaScript.
- **CSS:** intervieni sul file di competenza in `assets/css/`.
- **Comportamenti comuni:** `assets/js/site.js`.
- **Animazioni della homepage:** `assets/js/hero.js`.
- **Tema chiaro/scuro:** `assets/css/theme.css`, `assets/js/theme-init.js`, `assets/js/theme.js`.
- **Immagini:** le quattro campagne in `assets/campagne/` sono usate sia nell'homepage sia nel Portfolio.

**Ordine CSS:** base → liquid-glass → brand → whatsapp → pages → icons → theme → campaigns. La separazione del precedente CSS monolitico è stata eseguita senza cancellare le regole, per preservare la cascata e l'aspetto del sito. Un eventuale consolidamento delle sovrascritture storiche richiede confronti visivi.

### Configurazione WhatsApp

Apri `assets/js/config.js` e imposta il numero aziendale in `whatsappNumber`, con prefisso internazionale ma senza `+` o spazi. Finché è vuoto, il pulsante non apre WhatsApp. Non inserire password o token nei file pubblici.

I pulsanti di richiesta nella pagina Pacchetti aprono `contatti.html?piano=Starter`, `Business` o `Premium` con un messaggio dedicato.

## Controlli prima della pubblicazione

Serve **Node.js 20+**, senza installare dipendenze:

```sh
node scripts/sync-layout.mjs --check
node scripts/check-site.mjs
```

Verifica anche nel browser menu mobile, filtri del Portfolio, Light/Dark Mode e WhatsApp.

## GitHub Pages

Il sito viene pubblicato dal branch `main` nella cartella `/(root)`:
https://lucamaio.github.io/e-vindemus-site/

## Note sul portfolio

Le quattro grafiche di **Fornéo 27** sono concept per una pizzeria immaginaria: nuova apertura, giro pizza 15 €, pizza e birra 18 € e serata musicale. Prezzi, orari ed eventi sono esempi fittizi, non offerte reali.
