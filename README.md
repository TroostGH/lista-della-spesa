# 🛒 Lista della spesa

Una web app semplice per la lista della spesa, pensata per essere usata al supermercato dal telefono.

## Cosa fa
- **Cerca e aggiungi**: scrivi anche solo una lettera e compaiono i prodotti corrispondenti; tocca per aggiungerli alla lista.
- **Spunta = comprato**: quando metti la spunta su un prodotto, sparisce dalla lista. Per riaverlo, basta cercarlo di nuovo.
- **Per reparto**: la lista è raggruppata per categoria, comodo tra gli scaffali.
- **Sempre con te**: si sincronizza tra computer e telefono e funziona anche offline. Installabile come app (PWA).
- **100% vegana**: catalogo di ~337 prodotti senza carne, pesce, latticini animali, uova o miele.

## Tecnologie
- HTML, CSS e JavaScript (nessun framework, nessun passaggio di build)
- [Firebase Firestore](https://firebase.google.com/products/firestore) per la sincronizzazione online
- Hosting su GitHub Pages

## Struttura
| File | Descrizione |
|------|-------------|
| `index.html` | Struttura della pagina |
| `styles.css` | Stile (verde, minimale, mobile-first) |
| `app.js` | Logica: ricerca, lista, spunta, sincronizzazione |
| `catalog.js` | Database dei prodotti |
| `firebase-config.js` | Configurazione Firebase |
| `manifest.json` · `sw.js` | Supporto PWA e uso offline |
| `icons/` | Icone dell'app |

## Note
Se i campi in `firebase-config.js` sono vuoti, l'app funziona comunque salvando i dati solo sul dispositivo in uso.
