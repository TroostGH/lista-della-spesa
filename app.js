// =============================================================
//  Lista della spesa — Logica dell'app
// =============================================================
import { CATALOG, CATEGORIES } from './catalog.js';
import { firebaseConfig } from './firebase-config.js';

// ---------- Riferimenti DOM ----------
const content     = document.getElementById('content');
const searchInput = document.getElementById('search');
const clearSearch = document.getElementById('clear-search');
const countEl     = document.getElementById('count');
const statusDot   = document.getElementById('status-dot');
const statusText  = document.getElementById('status-text');
const toast       = document.getElementById('toast');
const toastText   = document.getElementById('toast-text');
const toastUndo   = document.getElementById('toast-undo');

// ---------- Utility ----------
const normalize = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const slug = (s) => normalize(s).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'item';
const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------- Catalogo (id univoci, niente duplicati) ----------
const catalogById = new Map();
for (const it of CATALOG) {
  const id = slug(it.name);
  if (!catalogById.has(id)) catalogById.set(id, { ...it, id });
}

// ---------- Stato ----------
let currentItems = [];                 // articoli attualmente "da comprare"
let itemsById = new Map();
let resultsById = new Map();
let store = null;

// =============================================================
//  Archiviazione: Firestore se configurato, altrimenti locale
// =============================================================
const hasFirebase = !!(firebaseConfig && firebaseConfig.apiKey && firebaseConfig.projectId);

async function initStore(onData) {
  if (hasFirebase) {
    try {
      store = await createFirestoreStore(onData);
      setStatus('online');
      return;
    } catch (err) {
      console.error('Firestore non disponibile, passo alla memoria locale:', err);
    }
  }
  store = createLocalStore(onData);
  setStatus('local');
}

async function createFirestoreStore(onData) {
  const appMod = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
  const fs     = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js');

  const app = appMod.initializeApp(firebaseConfig);
  let db;
  try {
    db = fs.initializeFirestore(app, {
      localCache: fs.persistentLocalCache({ tabManager: fs.persistentMultipleTabManager() })
    });
  } catch (e) {
    db = fs.getFirestore(app);
  }
  const col = fs.collection(db, 'lista');

  fs.onSnapshot(col, (snap) => {
    const items = [];
    snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
    onData(items);
  }, (err) => console.error('Errore di sincronizzazione:', err));

  return {
    async add(item) {
      await fs.setDoc(fs.doc(db, 'lista', item.id), {
        name: item.name, cat: item.cat, emoji: item.emoji, addedAt: Date.now()
      });
    },
    async remove(id) { await fs.deleteDoc(fs.doc(db, 'lista', id)); },
    async clear() {
      const snap = await fs.getDocs(col);
      await Promise.all(snap.docs.map((d) => fs.deleteDoc(d.ref)));
    }
  };
}

function createLocalStore(onData) {
  const KEY = 'lista-della-spesa';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
  const write = (items) => { localStorage.setItem(KEY, JSON.stringify(items)); onData(items.slice()); };
  setTimeout(() => onData(read()), 0);
  window.addEventListener('storage', (e) => { if (e.key === KEY) onData(read()); });
  return {
    add(item) {
      const items = read();
      if (!items.some((i) => i.id === item.id)) {
        items.push({ id: item.id, name: item.name, cat: item.cat, emoji: item.emoji, addedAt: Date.now() });
        write(items);
      }
    },
    remove(id) { write(read().filter((i) => i.id !== id)); },
    clear() { write([]); }
  };
}

// =============================================================
//  Dati in arrivo → aggiorna stato e ridisegna
// =============================================================
function onData(items) {
  currentItems = items;
  itemsById = new Map(items.map((i) => [i.id, i]));
  render();
}

// =============================================================
//  Ricerca
// =============================================================
function search(q) {
  const nq = normalize(q.trim());
  if (!nq) return [];
  const pool = new Map(catalogById);
  for (const it of currentItems) if (!pool.has(it.id)) pool.set(it.id, it);
  const matches = [...pool.values()].filter((it) => normalize(it.name).includes(nq));
  matches.sort((a, b) => {
    const pa = normalize(a.name).startsWith(nq) ? 0 : 1;
    const pb = normalize(b.name).startsWith(nq) ? 0 : 1;
    if (pa !== pb) return pa - pb;
    return a.name.localeCompare(b.name, 'it');
  });
  return matches.slice(0, 40);
}

// =============================================================
//  Rendering
// =============================================================
function render() {
  const q = searchInput.value.trim();
  countEl.textContent = currentItems.length;
  clearSearch.hidden = q.length === 0;
  if (q) renderSearch(q);
  else renderList();
}

function rowHtml(it, opts = {}) {
  const action = opts.action || 'buy';
  const inList = opts.search && itemsById.has(it.id);
  const cls = ['row'];
  if (opts.search) cls.push('result');
  if (inList) cls.push('in-list');
  const sub = inList ? '<small>Già nella lista</small>' : '';
  const hint = (opts.search && !inList) ? '<span class="add-hint">Aggiungi</span>' : '';
  return `<div class="${cls.join(' ')}" data-id="${it.id}" data-action="${action}">
      <span class="check"></span>
      <span class="emoji">${it.emoji}</span>
      <span class="name">${esc(it.name)}${sub}</span>
      ${hint}
    </div>`;
}

function renderList() {
  if (currentItems.length === 0) {
    content.innerHTML = `
      <div class="empty">
        <div class="big">🛒</div>
        <h2>La lista è vuota</h2>
        <p>Cerca un prodotto qui sopra per aggiungerlo.</p>
      </div>`;
    return;
  }
  const groups = {};
  for (const it of currentItems) (groups[it.cat] ||= []).push(it);

  let html = '';
  for (const catKey of Object.keys(CATEGORIES)) {
    const arr = groups[catKey];
    if (!arr) continue;
    arr.sort((a, b) => a.name.localeCompare(b.name, 'it'));
    const c = CATEGORIES[catKey];
    html += `<div class="cat-head"><span class="cat-emoji">${c.emoji}</span>${c.label}</div>`;
    html += `<div class="cat-card">${arr.map((it) => rowHtml(it)).join('')}</div>`;
  }
  html += `<div class="list-actions"><button class="btn-clear" data-action="clear-list">Svuota lista</button></div>`;
  content.innerHTML = html;
}

function renderSearch(q) {
  const res = search(q);
  resultsById = new Map(res.map((r) => [r.id, r]));
  const nq = normalize(q);
  const exact = res.some((r) => normalize(r.name) === nq);

  let html = '<div class="cat-card">';
  html += res.map((it) => rowHtml(it, { search: true, action: 'select' })).join('');
  if (!exact) {
    html += `<div class="row add-new" data-action="add-custom">
        <span class="check"></span>
        <span class="emoji">➕</span>
        <span class="name">Aggiungi “${esc(q.trim())}”</span>
      </div>`;
  }
  html += '</div>';
  content.innerHTML = html;
}

// =============================================================
//  Azioni
// =============================================================
function buyRow(row, item) {
  row.classList.add('bought');
  row.style.maxHeight = row.offsetHeight + 'px';
  setTimeout(() => {
    row.classList.add('leaving');
    row.style.maxHeight = '0px';
  }, 170);
  setTimeout(() => {
    store.remove(item.id);
    showToast(`🛒 ${item.name} — comprato`, () => store.add(item));
  }, 520);
}

function selectFromSearch(item) {
  if (!itemsById.has(item.id)) {
    store.add(item);
    showToast(`✓ ${item.name} aggiunto`, () => store.remove(item.id));
  }
  exitSearch();
}

function addCustom(q) {
  const name = cap(q.trim());
  if (!name) return;
  const item = { id: slug(name), name, cat: 'altro', emoji: '🛒' };
  if (!itemsById.has(item.id)) {
    store.add(item);
    showToast(`✓ ${item.name} aggiunto`, () => store.remove(item.id));
  }
  exitSearch();
}

function exitSearch() {
  searchInput.value = '';
  clearSearch.hidden = true;
  render();
  searchInput.blur();
}

function confirmClear() {
  if (currentItems.length === 0) return;
  if (confirm('Vuoi svuotare tutta la lista?')) store.clear();
}

// =============================================================
//  Toast con "Annulla"
// =============================================================
let toastTimer = null;
let undoFn = null;
function showToast(text, onUndo) {
  toastText.textContent = text;
  undoFn = onUndo;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 4000);
}
function hideToast() { toast.hidden = true; undoFn = null; }
toastUndo.addEventListener('click', () => { if (undoFn) undoFn(); hideToast(); });

// =============================================================
//  Eventi
// =============================================================
content.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;
  if (action === 'buy') {
    const item = itemsById.get(el.dataset.id);
    if (item) buyRow(el, item);
  } else if (action === 'select') {
    const item = resultsById.get(el.dataset.id);
    if (item) selectFromSearch(item);
  } else if (action === 'add-custom') {
    addCustom(searchInput.value);
  } else if (action === 'clear-list') {
    confirmClear();
  }
});

searchInput.addEventListener('input', render);

searchInput.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const q = searchInput.value.trim();
  if (!q) return;
  const res = search(q);
  const firstNew = res.find((r) => !itemsById.has(r.id));
  if (firstNew) selectFromSearch(firstNew);
  else if (!res.some((r) => normalize(r.name) === normalize(q))) addCustom(q);
  else exitSearch();
});

clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  render();
  searchInput.focus();
});

// ---------- Stato sincronizzazione ----------
function setStatus(mode) {
  statusDot.className = 'status-dot ' + mode;
  if (mode === 'online') {
    statusDot.classList.toggle('local', !navigator.onLine);
    statusText.textContent = navigator.onLine
      ? 'Sincronizzato online' : 'Offline — le modifiche si salvano';
  } else {
    statusText.textContent = 'Salvato su questo dispositivo';
  }
}
window.addEventListener('online',  () => hasFirebase && setStatus('online'));
window.addEventListener('offline', () => hasFirebase && setStatus('online'));

// ---------- Service worker (PWA) ----------
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

// ---------- Avvio ----------
initStore(onData);
