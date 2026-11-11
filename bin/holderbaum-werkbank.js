#!/usr/bin/env node
'use strict';

// holderbaum-werkbank — richtet eine Werkbank ein, prüft und aktualisiert sie.
// Keine Abhängigkeiten. Eigene Dateien des Nutzers werden nie überschrieben.
//
//   npx holderbaum-werkbank@latest                 einrichten
//   npx holderbaum-werkbank@latest update          aktualisieren (--pruefen: nur anzeigen)
//   npx holderbaum-werkbank@latest pruefen         Werkzeuge prüfen

const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

const PKG = require('../package.json');
const VERSION = 'v' + PKG.version.split('.').slice(0, 2).join('.');
const INHALT = path.join(__dirname, '..', 'werkbank');
const BEKANNT = require('../lib/bekannt.json');
const ZEILEN = new Set(require('../lib/zeilen.json'));
const MARKER = ['===== HOLDERBAUM-WERKSTATT · DATEI VOLLSTÄNDIG GELADEN =====',
  '===== HOLDERBAUM WERKSTATT · FILE FULLY LOADED =====']; // de, en

// Struktur je Sprache. Pfade relativ zur Werkbank-Wurzel.
const STRUKTUR = {
  de: {
    kontext: 'KONTEXT.md', vorlage: 'kontext-vorlage.md', regeln: 'Werkbank/Regeln', rollen: 'Werkbank/Rollen',
    workflows: 'Werkbank/Workflows', protokolle: 'Werkbank/protokolle', projekte: 'Projekte',
    quellen: ['Quellen/unterlagen', 'Quellen/website'], laufMd: 'lauf.md', kladde: 'kladde',
    setup: 'werkbank-setup', update: 'werkbank-update',
  },
  en: {
    kontext: 'CONTEXT.md', vorlage: 'context-template.md', regeln: 'Workbench/Rules', rollen: 'Workbench/Roles',
    workflows: 'Workbench/Workflows', protokolle: 'Workbench/logs', projekte: 'Projects',
    quellen: ['Sources/documents', 'Sources/website'], laufMd: 'run.md', kladde: 'scratch',
    setup: 'workbench-setup', update: 'workbench-update',
  },
};

// Umzüge alter Strukturen: [von, nach] als Pfad-Präfix, für Ordner und Verweise.
const UMZUG_AUFGABEN = [['Werkbank/Aufgaben/', 'Werkbank/Workflows/']];
const UMZUG_EN = [ // EN-Werkbänke aus v3.0 nutzten die deutsche Struktur
  ['Werkbank/Rollen/Sparringpartner/', 'Workbench/Roles/SparringPartner/'],
  ['Werkbank/Regeln/werkbank.md', 'Workbench/Rules/workbench.md'],
  ['Werkbank/Regeln/', 'Workbench/Rules/'],
  ['Werkbank/Rollen/', 'Workbench/Roles/'],
  ['Werkbank/Aufgaben/', 'Workbench/Workflows/'],
  ['Werkbank/Workflows/', 'Workbench/Workflows/'],
  ['Werkbank/protokolle/', 'Workbench/logs/'],
  ['Werkbank/', 'Workbench/'],
  ['Projekte/', 'Projects/'],
];

// ---------------------------------------------------------------- Hilfen

function abbruch(text) {
  process.stderr.write('\nholderbaum-werkbank: ' + text + '\n\n');
  process.exit(1);
}
const aus = (t) => process.stdout.write(t + '\n');
const ex = (p) => fs.existsSync(p);
const lies = (p) => fs.readFileSync(p, 'utf8');
const norm = (t) => t.replace(/\r\n/g, '\n').replace(/\s+$/, '') + '\n';
const zeilenSumme = (z) => crypto.createHash('sha256').update(z.trim().replace(/\s+/g, ' ')).digest('hex').slice(0, 8);
const pruefsumme = (t) => crypto.createHash('sha256').update(norm(t)).digest('hex');

function zeitstempel() {
  const t = {};
  for (const p of new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).formatToParts(new Date())) t[p.type] = p.value;
  return `${t.year}-${t.month}-${t.day}T${t.hour}-${t.minute}-${t.second}`;
}

function dateien(wurzel, rel = '') {
  const out = [];
  const dir = path.join(wurzel, rel);
  if (!ex(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const r = rel ? rel + '/' + e.name : e.name;
    if (e.isDirectory()) out.push(...dateien(wurzel, r));
    else if (e.isFile() && e.name !== '.DS_Store') out.push(r);
  }
  return out.sort();
}

function schreibe(p, inhalt) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, inhalt);
}

// Werkzeug-Dateien, die das Paket mitbringt (relativ zur Werkbank-Wurzel).
const vorlage = (sprache) => path.join(INHALT, sprache, 'vorlage');
const werkzeuge = (sprache) => dateien(vorlage(sprache));

function vollstaendig(text) {
  const zeilen = text.split('\n').map((z) => z.trim().replace(/^<!-- (.*) -->$/, '$1')).filter(Boolean);
  return zeilen.length > 8 && MARKER.includes(zeilen[zeilen.length - 1]) &&
    zeilen.slice(0, 8).some((z) => z.includes('HOLDERBAUM-WERKSTATT ·') && z.includes(VERSION));
}

function zielordner(args) {
  const i = args.indexOf('--dir');
  const ziel = path.resolve(i >= 0 && args[i + 1] ? args[i + 1] : process.cwd());
  // Cowork startet Terminal-Befehle im Sandbox-Home, nicht im Ordner des Nutzers.
  if (/^\/sessions\/[^/]+\/?$/.test(ziel)) {
    abbruch('Falscher Ordner: ' + ziel + ' ist das Sandbox-Verzeichnis, nicht der Ordner des Nutzers.\n' +
      'Mit cd in den verbundenen Ordner wechseln (unter ' + ziel.replace(/\/$/, '') + '/mnt/…) und erneut starten.');
  }
  if (!ex(ziel) || !fs.statSync(ziel).isDirectory()) abbruch('Ordner existiert nicht: ' + ziel);
  return ziel;
}

function beschreibbar(ziel) {
  try { fs.accessSync(ziel, fs.constants.W_OK); } catch (e) { abbruch('Kein Schreibrecht im Ordner: ' + ziel); }
}

const vschluessel = (v) => v.replace(/^v/, '').split('.').map(Number);
function vkleiner(a, b) {
  const x = vschluessel(a); const y = vschluessel(b);
  return x[0] < y[0] || (x[0] === y[0] && x[1] < y[1]);
}

// Anteil eigener Zeilen: Zeilen, die in keiner je ausgelieferten Fassung stehen.
function eigenAnteil(text) {
  const zeilen = norm(text).split('\n').filter((z) => z.trim());
  if (!zeilen.length) return 0;
  return zeilen.filter((z) => !ZEILEN.has(zeilenSumme(z))).length / zeilen.length;
}
// Eine Werkzeug-Datei, die überwiegend selbst geschrieben ist, gilt als eigene Fassung und wird
// nicht ersetzt. FORMAT-Dateien sind ausgenommen: Eigenes daraus gehört nach FORMAT-lokal.md.
const EIGENE_FASSUNG = 0.5;
const istFormat = (rel) => /\/Workflows\/FORMAT[^/]*\.md$/.test(rel);
function eigeneFassung(ziel, rel) {
  const p = path.join(ziel, rel);
  return ex(p) && !istFormat(rel) && !vollstaendig(lies(p)) && eigenAnteil(lies(p)) > EIGENE_FASSUNG;
}

// ---------------------------------------------------------------- pruefen

function pruefeWerkbank(ziel, sprache) {
  const s = STRUKTUR[sprache];
  const fehler = [];
  for (const rel of werkzeuge(sprache)) {
    const p = path.join(ziel, rel);
    if (eigeneFassung(ziel, rel)) continue;
    if (!ex(p)) fehler.push(rel + ': fehlt');
    else if (!vollstaendig(lies(p))) fehler.push(rel + ': unvollständig oder nicht ' + VERSION);
  }
  for (const d of [s.regeln, s.rollen, s.workflows, s.protokolle, s.projekte]) {
    if (!ex(path.join(ziel, d))) fehler.push(d + '/: Verzeichnis fehlt');
  }
  return fehler;
}

// Kontext-Budget: Zeichen je Datei des Nutzers (Werkzeug-Dateien ausgenommen).
const BUDGET = { kontext: 10000, projekt: 6000, regel: 6000, rolle: 12000, workflow: 15000 };

function budget(ziel, sprache) {
  const s = STRUKTUR[sprache];
  const eigen = new Set(werkzeuge(sprache));
  const zeichen = (rel) => [...lies(path.join(ziel, rel))].length;
  const pruefe = [];
  if (ex(path.join(ziel, s.kontext))) pruefe.push([s.kontext, BUDGET.kontext]);
  for (const rel of dateien(ziel)) {
    if (eigen.has(rel) || !rel.endsWith('.md')) continue;
    const teile = rel.split('/');
    if (rel.startsWith(s.projekte + '/') && teile.length === 3 && teile[2] === s.kontext) pruefe.push([rel, BUDGET.projekt]);
    else if (rel.startsWith(s.regeln + '/') && teile.length === 3) pruefe.push([rel, BUDGET.regel]);
    else if (rel.startsWith(s.rollen + '/') && teile[teile.length - 1] === 'SYSTEM.md') pruefe.push([rel, BUDGET.rolle]);
    else if (rel.startsWith(s.workflows + '/') && teile.length === 3) pruefe.push([rel, BUDGET.workflow]);
  }
  return pruefe.map(([rel, grenze]) => ({ rel, n: zeichen(rel), grenze })).filter((x) => x.n > x.grenze);
}

function budgetText(ueber, sprache) {
  if (!ueber.length) return sprache === 'en' ? 'Context budget: all files within the guide values.' : 'Kontext-Budget: alle Dateien im Richtwert.';
  return (sprache === 'en' ? 'Over the guide value (for information, characters / guide value):\n' : 'Über dem Richtwert (zur Information, Zeichen / Richtwert):\n') +
    ueber.map((x) => '  ' + x.rel + ': ' + x.n + ' / ' + x.grenze).join('\n');
}

function befehlPruefen(args) {
  const ziel = zielordner(args);
  const sprache = args.includes('--en') || ex(path.join(ziel, 'Workbench')) ? 'en' : 'de';
  const fehler = pruefeWerkbank(ziel, sprache);
  if (fehler.length) abbruch('Werkzeuge nicht vollständig:\n  ' + fehler.join('\n  '));
  aus((sprache === 'en' ? 'Tools complete (' : 'Werkzeuge vollständig (') + VERSION + ', ' + werkzeuge(sprache).length + ')');
  const eigen = werkzeuge(sprache).filter((rel) => eigeneFassung(ziel, rel));
  if (eigen.length) aus((sprache === 'en' ? 'Own versions (kept): ' : 'Eigene Fassungen (bleiben): ') + eigen.join(', '));
  aus(budgetText(budget(ziel, sprache), sprache));
}

// ---------------------------------------------------------------- einrichten

function befehlEinrichten(args) {
  const sprache = args.includes('--en') ? 'en' : 'de';
  const s = STRUKTUR[sprache];
  const ziel = zielordner(args);
  beschreibbar(ziel);
  for (const k of ['KONTEXT.md', 'CONTEXT.md']) {
    if (ex(path.join(ziel, k))) {
      abbruch('Hier ist schon eine Werkbank (' + k + ' vorhanden).\nAktualisieren: npx holderbaum-werkbank@latest update');
    }
  }
  for (const d of [s.regeln, s.rollen, s.workflows, s.protokolle, s.projekte, ...s.quellen]) {
    fs.mkdirSync(path.join(ziel, d), { recursive: true });
  }
  const uebersprungen = [];
  for (const rel of werkzeuge(sprache)) {
    const p = path.join(ziel, rel);
    if (ex(p)) { uebersprungen.push(rel); continue; }
    schreibe(p, lies(path.join(vorlage(sprache), rel)));
  }
  const fehler = pruefeWerkbank(ziel, sprache).filter((f) => !uebersprungen.some((u) => f.startsWith(u)));
  if (fehler.length) abbruch('Werkzeuge unvollständig:\n  ' + fehler.join('\n  ') + '\nPaket erneut ausführen.');

  // Lauf-Ordner außerhalb der Werkbank — verschwindet mit der Sandbox.
  const stempel = zeitstempel();
  fs.mkdirSync(path.join(os.tmpdir(), 'holderbaum-werkbank'), { recursive: true });
  const lauf = fs.mkdtempSync(path.join(os.tmpdir(), 'holderbaum-werkbank', s.setup + '-' + stempel + '-'));
  fs.mkdirSync(path.join(lauf, s.kladde), { recursive: true });
  const setup = path.join(lauf, 'SETUP.md');
  fs.copyFileSync(path.join(INHALT, sprache, 'SETUP.md'), setup);
  fs.copyFileSync(path.join(INHALT, sprache, s.vorlage), path.join(lauf, s.vorlage));
  schreibe(path.join(lauf, s.laufMd),
    '# ' + s.setup + '-' + stempel + '\n\n' +
    '- holderbaum-werkbank ' + PKG.version + ' · ' + ziel + '\n' +
    '- 1–2 ' + stempel + ': ' + werkzeuge(sprache).length + ' tools' +
    (uebersprungen.length ? '; kept: ' + uebersprungen.join(', ') : '') + '\n');

  if (sprache === 'en') {
    aus('Workbench scaffold created in: ' + ziel);
    aus('holderbaum-werkbank ' + PKG.version + ' · tools ' + VERSION + ' complete');
    if (uebersprungen.length) aus('Existing, not overwritten: ' + uebersprungen.join(', '));
    aus('\nNEXT STEP FOR THE AGENT:\nRead ' + setup + ' completely with the Read tool and follow it from STEP 3.');
  } else {
    aus('Werkbank-Gerüst angelegt in: ' + ziel);
    aus('holderbaum-werkbank ' + PKG.version + ' · Werkzeuge ' + VERSION + ' vollständig');
    if (uebersprungen.length) aus('Vorhanden, nicht überschrieben: ' + uebersprungen.join(', '));
    aus('\nNÄCHSTER SCHRITT FÜR DEN AGENTEN:\nLies ' + setup + ' vollständig mit dem Read-Tool und folge der Anleitung ab SCHRITT 3.');
  }
}

// ---------------------------------------------------------------- update: Befund

// Pfade, an denen eine Werkbank ihre Version verrät (alte und neue Werkzeuge).
const ALTE_WERKZEUGE = [
  'Werkbank/Regeln/werkbank.md', 'Werkbank/Rollen/Sparringpartner/SYSTEM.md',
  'Werkbank/Workflows/FORMAT.md', 'Werkbank/Aufgaben/FORMAT.md',
  'Workbench/Rules/workbench.md', 'Workbench/Roles/SparringPartner/SYSTEM.md', 'Workbench/Workflows/FORMAT.md',
];

function befund(ziel, args) {
  const kontextName = ex(path.join(ziel, 'CONTEXT.md')) ? 'CONTEXT.md'
    : ex(path.join(ziel, 'KONTEXT.md')) ? 'KONTEXT.md' : null;
  if (!kontextName) {
    abbruch('Keine Werkbank in ' + ziel + ' (weder KONTEXT.md noch CONTEXT.md).\n' +
      'Update im Wurzelverzeichnis der Werkbank starten. Neu einrichten: npx holderbaum-werkbank@latest');
  }
  const kontext = lies(path.join(ziel, kontextName));
  const gefunden = []; // { rel, version, sprache } oder { rel, geaendert: true }
  for (const rel of [...new Set([...ALTE_WERKZEUGE, ...werkzeuge('de'), ...werkzeuge('en')])]) {
    const p = path.join(ziel, rel);
    if (!ex(p)) continue;
    const t = BEKANNT[pruefsumme(lies(p))];
    gefunden.push(t ? { rel, versionen: t.versionen, sprache: t.sprache } : { rel, geaendert: true });
  }
  const bekannt = gefunden.filter((g) => g.versionen);
  const m = kontext.match(/(?:Bauanleitung|build guide|Werkbank-Version|Workbench version)\s+v(\d+\.\d+)/i);
  const laut = m ? 'v' + m[1] : null;
  let version = 'unbekannt';
  let herkunft = 'nicht bestimmbar';
  if (bekannt.length) {
    // Schnittmenge der Versionen, in denen jede gefundene Datei so ausgeliefert wurde.
    let menge = bekannt[0].versionen;
    for (const g of bekannt) menge = menge.filter((v) => g.versionen.includes(v));
    const sortiert = (l) => [...l].sort((x, y) => (vkleiner(x, y) ? -1 : 1));
    if (menge.length) {
      version = laut && menge.includes(laut) ? laut : sortiert(menge)[0];
      herkunft = 'Prüfsummen der Werkzeug-Dateien';
    } else { // gemischter Stand, z. B. nur einzelne Dateien aktualisiert
      version = sortiert(bekannt.map((g) => sortiert(g.versionen)[0]))[0];
      herkunft = 'Prüfsummen, gemischter Stand — älteste Datei zählt';
    }
  } else if (laut) {
    version = laut;
    herkunft = 'Bootstrap-Block (Werkzeug-Dateien verändert)';
  }
  let sprache = ex(path.join(ziel, 'Workbench')) || kontextName === 'CONTEXT.md' ||
    bekannt.some((g) => g.sprache === 'en') || /^> Bootstrap info:/m.test(kontext) ? 'en' : 'de';
  if (args.includes('--en')) sprache = 'en';
  if (args.includes('--de')) sprache = 'de';

  let umzug = [];
  if (sprache === 'en' && ex(path.join(ziel, 'Werkbank'))) umzug = UMZUG_EN;
  else if (ex(path.join(ziel, 'Werkbank/Aufgaben'))) umzug = UMZUG_AUFGABEN;

  const eigen = werkzeuge(sprache).filter((rel) => eigeneFassung(ziel, rel));
  for (const g of gefunden) if (eigen.includes(g.rel)) g.eigen = Math.round(eigenAnteil(lies(path.join(ziel, g.rel))) * 100);
  const aktuell = umzug.length === 0 && werkzeuge(sprache).every((rel) => {
    const p = path.join(ziel, rel);
    return eigen.includes(rel) || (ex(p) && norm(lies(p)) === norm(lies(path.join(vorlage(sprache), rel))));
  });
  // Gewachsene Werkbank: KONTEXT nur ergänzen, nicht umbauen.
  const regel = sprache === 'en' ? 'Workbench/Rules/workbench.md' : 'Werkbank/Regeln/werkbank.md';
  const gewachsen = [...kontext].length > BUDGET.kontext || eigen.length > 0 || !ex(path.join(ziel, regel));
  return { ziel, kontextName, version, herkunft, sprache, gefunden, umzug, aktuell, eigen, gewachsen, regelFehlt: !ex(path.join(ziel, regel)) };
}

function befundText(b) {
  const s = STRUKTUR[b.sprache];
  const en = b.sprache === 'en';
  const herkunft = en ? { 'Prüfsummen der Werkzeug-Dateien': 'checksums of the tool files',
    'Prüfsummen, gemischter Stand — älteste Datei zählt': 'checksums, mixed state — oldest file counts',
    'Bootstrap-Block (Werkzeug-Dateien verändert)': 'bootstrap block (tool files changed)',
    'nicht bestimmbar': 'not determinable' }[b.herkunft] : b.herkunft;
  const z = [];
  z.push((en ? 'Workbench: ' : 'Werkbank: ') + b.ziel);
  z.push((en ? 'Installed version: ' : 'Installierte Version: ') + (en && b.version === 'unbekannt' ? 'unknown' : b.version) +
    (en ? ' (determined from ' : ' (bestimmt über ') + herkunft + ')');
  z.push((en ? 'New version: ' : 'Neue Version: ') + VERSION + ' (holderbaum-werkbank ' + PKG.version + ', ' + b.sprache + ')');
  const geaendert = b.gefunden.filter((g) => g.geaendert);
  const angepasst = geaendert.filter((g) => !g.eigen);
  if (angepasst.length) z.push((en ? 'Tool files with own changes: ' : 'Werkzeug-Dateien mit eigenen Änderungen: ') + angepasst.map((g) => g.rel).join(', '));
  const eigen = geaendert.filter((g) => g.eigen);
  if (eigen.length) z.push((en ? 'Own versions, kept: ' : 'Eigene Fassungen, bleiben: ') + eigen.map((g) => g.rel + ' (' + g.eigen + ' %)').join(', '));
  if (b.gewachsen) z.push(en ? 'CONTEXT.md: grown workbench — only add, don\'t restructure' : 'KONTEXT.md: gewachsene Werkbank — nur ergänzen, nicht umbauen');
  if (b.umzug === UMZUG_EN) z.push((en ? 'Structure move: ' : 'Struktur-Umzug: ') + 'Werkbank/ → Workbench/, Projekte/ → Projects/, KONTEXT.md → CONTEXT.md');
  if (b.umzug === UMZUG_AUFGABEN) z.push('Struktur-Umzug: Werkbank/Aufgaben/ → Werkbank/Workflows/');
  z.push((en ? 'Replaced or new: ' : 'Ersetzt bzw. neu: ') + werkzeuge(b.sprache).filter((r) => !b.eigen.includes(r)).join(', '));
  z.push((en ? 'Backup of the old tool files: ' : 'Sicherung der alten Werkzeug-Dateien: ') + s.protokolle + '/' + s.update + '-' + (en ? '<timestamp>' : '<Zeitstempel>') + '/alt/');
  return z.join('\n');
}

// Ordner oder Datei verschieben, ohne zu überschreiben. Konflikte werden gesammelt.
function verschiebe(ziel, von, nach, konflikte) {
  const a = path.join(ziel, von);
  const b = path.join(ziel, nach);
  if (!ex(a)) return;
  if (a !== b && a.toLowerCase() === b.toLowerCase()) { // nur Groß-/Kleinschreibung (macOS)
    fs.renameSync(a, a + '.umzug'); fs.renameSync(a + '.umzug', b); return;
  }
  if (!ex(b)) { fs.mkdirSync(path.dirname(b), { recursive: true }); fs.renameSync(a, b); return; }
  if (fs.statSync(a).isFile()) { konflikte.push(von + ' → ' + nach); return; }
  for (const e of fs.readdirSync(a)) verschiebe(ziel, path.join(von, e), path.join(nach, e), konflikte);
  try { if (fs.readdirSync(a).length === 0) fs.rmdirSync(a); } catch (e) { /* leerer Ordner bleibt */ }
}

// Verweise in den Markdown-Dateien des Nutzers auf die neuen Pfade umschreiben.
function verweiseUmschreiben(ziel, umzug, s) {
  let anzahl = 0;
  for (const rel of dateien(ziel)) {
    if (!rel.endsWith('.md') || [s.protokolle + '/', 'Quellen/', 'Sources/'].some((x) => rel.startsWith(x))) continue;
    const p = path.join(ziel, rel);
    const alt = lies(p);
    let neu = alt;
    for (const [von, nach] of umzug) neu = neu.split(von).join(nach);
    if (umzug === UMZUG_EN) neu = neu.replace(/KONTEXT\.md/g, 'CONTEXT.md');
    if (neu !== alt) { fs.writeFileSync(p, neu); anzahl++; }
  }
  return anzahl;
}

// Dateien, die ein Update sichert bzw. zurückholt: alles außer Lauf-Ordnern und Quellen.
function sicherbar(ziel) {
  const aus = ['Werkbank/protokolle/', 'Workbench/logs/', 'Quellen/', 'Sources/'];
  return dateien(ziel).filter((r) => !aus.some((a) => r.startsWith(a)));
}

// ---------------------------------------------------------------- update: Rückgängig

function befehlRueckgaengig(args) {
  const ziel = zielordner(args);
  const en = ex(path.join(ziel, 'Workbench')) && !ex(path.join(ziel, 'Werkbank/protokolle'));
  const laeufe = [];
  for (const p of ['Werkbank/protokolle', 'Workbench/logs']) {
    if (!ex(path.join(ziel, p))) continue;
    for (const d of fs.readdirSync(path.join(ziel, p))) {
      if (/^(werkbank|workbench)-update-/.test(d) && ex(path.join(ziel, p, d, 'alt'))) laeufe.push(path.join(p, d));
    }
  }
  if (!laeufe.length) abbruch(en ? 'No update to undo (no backup found).' : 'Kein Update zum Rückgängigmachen (keine Sicherung gefunden).');
  laeufe.sort((a, b) => path.basename(a).localeCompare(path.basename(b)));
  const lauf = laeufe[laeufe.length - 1];
  const alt = path.join(ziel, lauf, 'alt');
  const gesichert = new Set(dateien(alt));
  const liste = path.join(ziel, lauf, 'vorher.txt');
  const vorher = ex(liste) ? new Set(lies(liste).split('\n').filter(Boolean)) : gesichert;
  const nichtGeloescht = [];
  for (const rel of sicherbar(ziel)) {
    if (vorher.has(rel)) continue;
    try { fs.unlinkSync(path.join(ziel, rel)); } catch (e) { nichtGeloescht.push(rel); }
  }
  for (const rel of gesichert) {
    fs.mkdirSync(path.dirname(path.join(ziel, rel)), { recursive: true });
    fs.copyFileSync(path.join(alt, rel), path.join(ziel, rel));
  }
  // leere Ordner aufräumen (von unten nach oben), Fehler ignorieren
  const ordner = (dir, rel = '') => {
    for (const e of fs.readdirSync(path.join(dir, rel), { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      const r = rel ? rel + '/' + e.name : e.name;
      if (/^(Werkbank\/protokolle|Workbench\/logs|Quellen|Sources)/.test(r)) continue;
      ordner(dir, r);
      try { if (!fs.readdirSync(path.join(dir, r)).length) fs.rmdirSync(path.join(dir, r)); } catch (x) { /* bleibt */ }
    }
  };
  ordner(ziel);
  schreibe(path.join(ziel, lauf, 'rueckgaengig.md'), '# ' + zeitstempel() + '\n\n' + gesichert.size + ' Dateien zurückgeholt.\n' +
    (nichtGeloescht.length ? 'Nicht gelöscht: ' + nichtGeloescht.join(', ') + '\n' : ''));
  aus((en ? 'Update undone: ' : 'Update rückgängig gemacht: ') + gesichert.size + (en ? ' files restored from ' : ' Dateien zurückgeholt aus ') + lauf + '/alt/.');
  if (nichtGeloescht.length) {
    aus((en ? 'Could not delete (no permission) — remove by hand: ' : 'Nicht löschbar (keine Berechtigung) — von Hand entfernen: ') + nichtGeloescht.join(', '));
  }
}

// ---------------------------------------------------------------- update: Ausführen

function befehlUpdate(args) {
  const ziel = zielordner(args);
  const b = befund(ziel, args);
  const s = STRUKTUR[b.sprache];
  const t = TEXTE[b.sprache];

  if (b.aktuell) return aus(t.aktuell);
  if (b.version !== 'unbekannt' && vkleiner(VERSION, b.version)) {
    abbruch('Die Werkbank (' + b.version + ') ist neuer als dieses Paket (' + VERSION + '). npx holderbaum-werkbank@latest verwenden.');
  }
  if (args.includes('--pruefen') || args.includes('--check')) {
    return aus(befundText(b) + '\n\n' + t.nurGeprueft);
  }
  beschreibbar(ziel);

  const stempel = zeitstempel();
  const laufRel = s.protokolle + '/' + s.update + '-' + stempel;
  const lauf = path.join(ziel, laufRel);

  // 1. Sicherung aller vorhandenen Werkzeug-Dateien.
  // Grundlage für --rueckgaengig: Liste aller Dateien vorher (vorher.txt) und Kopien dessen, was das
  // Update anfasst — Werkzeuge und KONTEXT; bei einem Struktur-Umzug alle Dateien (alte, kleine Werkbänke).
  const vorherListe = sicherbar(ziel);
  schreibe(path.join(lauf, 'vorher.txt'), vorherListe.join('\n') + '\n');
  const zuSichern = b.umzug.length ? vorherListe
    : [...new Set([...b.gefunden.map((g) => g.rel), b.kontextName, ...werkzeuge(b.sprache)])].filter((r) => ex(path.join(ziel, r)));
  for (const rel of zuSichern) {
    fs.mkdirSync(path.dirname(path.join(lauf, 'alt', rel)), { recursive: true });
    fs.copyFileSync(path.join(ziel, rel), path.join(lauf, 'alt', rel));
  }
  // Eigene Zeilen in veränderten Werkzeug-Dateien: alles, was in keiner ausgelieferten Fassung steht.
  const eigeneZeilen = [];
  for (const g of b.gefunden.filter((x) => x.geaendert && !x.eigen)) {
    const zeilen = norm(lies(path.join(ziel, g.rel))).split('\n');
    const eigen = zeilen.map((z, i) => [i + 1, z]).filter(([, z]) => z.trim() && !ZEILEN.has(zeilenSumme(z)));
    if (!eigen.length) continue;
    const rel = 'eigene-zeilen/' + g.rel;
    schreibe(path.join(lauf, rel), eigen.map(([n, z]) => n + ': ' + z).join('\n') + '\n');
    eigeneZeilen.push(laufRel + '/' + rel);
  }

  // 2. Struktur-Umzug und Verweise.
  const konflikte = [];
  let umgeschrieben = 0;
  if (b.umzug === UMZUG_EN) {
    for (const [von, nach] of [['Werkbank/Regeln/werkbank.md', 'Werkbank/Regeln/workbench.md'],
      ['Werkbank/Rollen/Sparringpartner', 'Werkbank/Rollen/SparringPartner'], ['Werkbank/Regeln', 'Workbench/Rules'],
      ['Werkbank/Rollen', 'Workbench/Roles'], ['Werkbank/Aufgaben', 'Workbench/Workflows'],
      ['Werkbank/Workflows', 'Workbench/Workflows'], ['Werkbank/protokolle', 'Workbench/logs'],
      ['Werkbank', 'Workbench'], ['Projekte', 'Projects']]) verschiebe(ziel, von, nach, konflikte);
    for (const rel of dateien(ziel).filter((r) => path.basename(r) === 'KONTEXT.md' && !r.startsWith(s.protokolle))) {
      verschiebe(ziel, rel, path.join(path.dirname(rel), 'CONTEXT.md'), konflikte);
    }
  } else if (b.umzug === UMZUG_AUFGABEN) {
    verschiebe(ziel, 'Werkbank/Aufgaben', 'Werkbank/Workflows', konflikte);
  }
  if (b.umzug.length) umgeschrieben = verweiseUmschreiben(ziel, b.umzug, s);

  // 3. Verzeichnisse und Werkzeuge.
  for (const d of [s.regeln, s.rollen, s.workflows, s.protokolle, s.projekte]) fs.mkdirSync(path.join(ziel, d), { recursive: true });
  for (const rel of werkzeuge(b.sprache)) {
    const neu = lies(path.join(vorlage(b.sprache), rel));
    if (b.eigen.includes(rel)) schreibe(path.join(lauf, 'neu', rel), neu); // nur zur Ansicht
    else schreibe(path.join(ziel, rel), neu);
  }
  const fehler = pruefeWerkbank(ziel, b.sprache);
  if (fehler.length) abbruch('Nach dem Einspielen unvollständig:\n  ' + fehler.join('\n  ') + '\nSicherung: ' + laufRel + '/alt/');

  // 4. Anleitung für den Agenten im Lauf-Ordner.
  fs.copyFileSync(path.join(INHALT, b.sprache, s.vorlage), path.join(lauf, s.vorlage));
  const geaendert = b.gefunden.filter((g) => g.geaendert && !g.eigen).map((g) => g.rel);
  const eigenTxt = b.eigen.length ? t.eigen(b.eigen, laufRel) + '\n\n' : '';
  let befundTxt = befundText(b).replace(/<Zeitstempel>|<timestamp>/, stempel);
  if (b.umzug.length) befundTxt += '\n' + t.umgeschrieben(umgeschrieben);
  if (konflikte.length) befundTxt += '\n' + t.konflikte + konflikte.join(', ');
  schreibe(path.join(lauf, 'UPDATE.md'), lies(path.join(INHALT, b.sprache, 'UPDATE.md'))
    .replace('{BEFUND}', befundTxt)
    .replace('{GEAENDERT}', eigenTxt + (geaendert.length ? t.geaendert(geaendert, laufRel, eigeneZeilen) : t.nichtGeaendert))
    .replace('{KONTEXT_MODUS}', b.gewachsen ? t.gewachsen(b.regelFehlt) : t.normal)
    .replace('{UMZUG_HINWEIS}', b.umzug.length ? t.umzugHinweis : '')
    .replace('{ANWEISUNGEN}', t.anweisungen(b.version))
    .replace('{BUDGET}', budgetText(budget(ziel, b.sprache), b.sprache)));
  schreibe(path.join(lauf, s.laufMd), '# ' + s.update + '-' + stempel + '\n\n' +
    '- ' + b.version + ' → ' + VERSION + ' (holderbaum-werkbank ' + PKG.version + ')\n' +
    '- alt/: ' + (b.gefunden.map((g) => g.rel).join(', ') || '—') + '\n' +
    '- ' + werkzeuge(b.sprache).join(', ') + '\n' +
    (b.umzug.length ? '- ' + t.umgeschrieben(umgeschrieben) + (konflikte.length ? ' ' + t.konflikte + konflikte.join(', ') : '') + '\n' : ''));

  aus(befundTxt + '\n\n' + t.weiter(path.join(lauf, 'UPDATE.md')));
}

// ---------------------------------------------------------------- Texte

const PROJEKTANWEISUNG = {
  de: '```markdown\n# Werkbank-Projekt\n\nJeder verbundene Ordner kann eine Werkbank sein: eine eingerichtete\n' +
    'Arbeitsumgebung mit einer `KONTEXT.md` im Root, die die Anleitung zu\ndieser Werkbank ist.\n\n' +
    '## PFLICHT: Session-Start-Sequenz\n\nVor deiner ersten Antwort — egal ob „hallo", Frage oder Auftrag.\n' +
    'Keine Ausnahmen, auch nicht bei Smalltalk.\n\n1. Lies mit dem Read-Tool die `KONTEXT.md` im Root jedes verbundenen\n' +
    '   Verzeichnisses, das eine hat — nicht aus dem Gedächtnis — und\n   folge ihren Anweisungen vollständig.\n' +
    "2. Ruf `date '+%Y-%m-%d %H:%M %A'` im Terminal auf.\n```\n",
  en: '```markdown\n# Workbench project\n\nAny connected folder can be a Workbench: a set-up working\n' +
    'environment with a `CONTEXT.md` in its root that is the manual for\nthat Workbench.\n\n' +
    '## MANDATORY: Session start sequence\n\nBefore your first response — whether it\'s "hi", a question or a\n' +
    'task. No exceptions, not even for small talk.\n\n1. Use the Read tool to read the `CONTEXT.md` in the root of every\n' +
    '   connected directory that has one — not from memory — and follow\n   its instructions in full.\n' +
    "2. Run `date '+%Y-%m-%d %H:%M %A'` in the terminal.\n```\n",
};

const TEXTE = {
  de: {
    aktuell: 'Auf dem aktuellen Stand (' + VERSION + ').',
    nurGeprueft: 'Geprüft, nichts geändert. Einspielen: npx holderbaum-werkbank@latest update',
    konflikte: 'Nicht verschoben, Ziel existiert schon: ',
    umgeschrieben: (n) => 'Verweise auf neue Pfade umgeschrieben in ' + n + ' Dateien.',
    eigen: (liste, lauf) => 'EIGENE FASSUNGEN — diese Werkzeug-Dateien sind überwiegend selbst geschrieben und\n' +
      'wurden NICHT ersetzt:\n\n' + liste.map((r) => '  - ' + r).join('\n') + '\n\n' +
      'Die neue Produktfassung liegt nur zur Ansicht unter ' + lauf + '/neu/. Nichts tun;\n' +
      'im Bericht ein Satz: „Dein eigener … bleibt, wie er ist."',
    gewachsen: (regelFehlt) => 'MODUS: ERGÄNZEN. Diese Werkbank ist gewachsen (große KONTEXT.md, eigene Fassungen\n' +
      'oder eigenes Regelsystem). Die KONTEXT.md wird NICHT auf die Vorlage umgebaut. Nur die Punkte\n' +
      '1, 4, 7, 10 und 16 unten werden angewandt — jeweils als Einfügung an passender Stelle, ohne\n' +
      'eigene Abschnitte zu verschieben, zusammenzufassen oder umzuformulieren. Alle anderen Punkte\n' +
      'entfallen, auch wenn die KONTEXT.md von der Vorlage abweicht.' +
      (regelFehlt ? '\nDie Werkbank hat eine eigene Regel für „Merk dir das" / „Regel erstellen" statt\n' +
        'werkbank.md: Die bleibt zuständig. Keine Zeile für werkbank.md in den Regel-Index.' : ''),
    normal: 'MODUS: ANGLEICHEN. Die Punkte unten gelten vollständig.',
    nichtGeaendert: 'Keine eigenen Änderungen gefunden — alle Werkzeug-Dateien waren Originale.\nWeiter mit Schritt B.',
    geaendert: (liste, lauf, eigen) => 'Diese Werkzeug-Dateien weichen von jeder ausgelieferten Fassung ab —\n' +
      'der Nutzer hat sie angepasst (alte Fassung in ' + lauf + '/alt/):\n\n' +
      liste.map((r) => '  - ' + r).join('\n') + '\n\n' +
      (eigen.length ? 'Die Zeilen, die in keiner ausgelieferten Fassung stehen — also vom Nutzer —,\n' +
        'hat das Paket herausgesucht (mit Zeilennummer der alten Datei):\n\n' + eigen.map((r) => '  - ' + r).join('\n') + '\n\n'
        : 'Eigene Zeilen ließen sich nicht herauslösen (nur gestrichene Zeilen?) — alte Fassung lesen.\n\n') +
      'Ohne Rückfrage übernehmen: Den Inhalt dieser Zeilen (im Zusammenhang der alten\n' +
      'Datei gelesen) als eigene Regel anlegen — Format nach der Werkbank-Regel, mit\n' +
      'ausdrücklichem Vorrang vor der aktiven Rolle. Trigger so eng wie vorher: Stand\n' +
      'die Ergänzung im Sparringpartner, gilt die Regel nur, wenn der Sparringpartner\n' +
      'aktiv ist. Eintrag im Regel-Index. Nie zurück in eine Werkzeug-Datei — die\n' +
      'ersetzt das nächste Update wieder. Im Bericht ein Satz.',
    umzugHinweis: 'Hinweis: Das Paket hat Ordner umbenannt und Verweise in den Markdown-\n' +
      'Dateien umgeschrieben (siehe Befund). Bei Punkt 7 und 8 die neuen Pfade verwenden.',
    anweisungen: (v) => {
      const teile = [];
      if (v === 'unbekannt' || vkleiner(v, 'v3.3')) {
        teile.push('PROJEKTANWEISUNG — ältere Werkbänke haben eine ältere Fassung. Die Projektanweisung\n' +
          'dieses Projekts steht in deinem Kontext. Enthält sie den Kern (die KONTEXT.md jedes verbundenen\n' +
          'Ordners lesen und ihr folgen; `date` aufrufen): nichts tun, nichts erwähnen. Fehlt etwas: nur das\n' +
          'Fehlende als Ergänzung zeigen — eigene Zusätze des Nutzers bleiben, nie den ganzen Text ersetzen.\n' +
          'Gibt es gar keine Projektanweisung, diesen Block zeigen (verbatim, Markdown-Codeblock):\n\n' + PROJEKTANWEISUNG.de +
          '\nWeg: Seitenleiste des Projekts → Anweisungen. Bestätigung abwarten.');
      }
      return teile.length ? teile.join('\n\n') : 'Nichts. Projektanweisung und About Me bleiben, wie sie sind.';
    },
    weiter: (p) => 'NÄCHSTER SCHRITT FÜR DEN AGENTEN:\nLies ' + p + ' vollständig mit dem Read-Tool und folge der Anleitung.',
  },
  en: {
    aktuell: 'Up to date (' + VERSION + ').',
    nurGeprueft: 'Checked, nothing changed. Apply: npx holderbaum-werkbank@latest update',
    konflikte: 'Not moved, target already exists: ',
    umgeschrieben: (n) => 'References rewritten to the new paths in ' + n + ' files.',
    eigen: (liste, lauf) => 'OWN VERSIONS — these tool files are mostly self-written and were NOT\n' +
      'replaced:\n\n' + liste.map((r) => '  - ' + r).join('\n') + '\n\n' +
      'The new product version is only in ' + lauf + '/neu/ for reference. Do nothing;\n' +
      'one sentence in the report: "Your own … stays as it is."',
    gewachsen: (regelFehlt) => 'MODE: ADD. This workbench has grown (large CONTEXT.md, own versions or own\n' +
      'rule system). CONTEXT.md is NOT restructured to the template. Only points 1, 4, 7, 10 and 16\n' +
      'below apply — each as an insertion in a fitting place, without moving, merging or rewording\n' +
      'own sections. All other points are dropped, even if CONTEXT.md differs from the template.' +
      (regelFehlt ? '\nThe workbench has its own rule for "remember this" / "create a rule" instead of\n' +
        'workbench.md: it stays in charge. No row for workbench.md in the rule index.' : ''),
    normal: 'MODE: ALIGN. The points below apply in full.',
    nichtGeaendert: 'No own changes found — all tool files were originals.\nContinue with step B.',
    geaendert: (liste, lauf, eigen) => 'These tool files differ from every shipped version — the user\n' +
      'adapted them (old version in ' + lauf + '/alt/):\n\n' +
      liste.map((r) => '  - ' + r).join('\n') + '\n\n' +
      (eigen.length ? 'The lines that appear in no shipped version — so the user\'s own — were\n' +
        'extracted by the package (with line numbers of the old file):\n\n' + eigen.map((r) => '  - ' + r).join('\n') + '\n\n'
        : 'Own lines could not be extracted (only deleted lines?) — read the old version.\n\n') +
      'Carry over without asking: create the content of these lines (read in the context\n' +
      'of the old file) as an own rule — format per the workbench rule, with explicit\n' +
      'precedence over the active role. Trigger as narrow as before: if the addition\n' +
      'was in the Sparring Partner, the rule only applies while the Sparring Partner is\n' +
      'active. Entry in the rule index. Never back into a tool file — the next update\n' +
      'replaces it again. One sentence in the report.',
    umzugHinweis: 'Note: the package renamed folders and rewrote references in the Markdown\n' +
      'files (see findings). Use the new paths for points 7 and 8.',
    anweisungen: (v) => {
      const teile = [];
      if (v === 'unbekannt' || vkleiner(v, 'v3.3')) {
        teile.push('PROJECT INSTRUCTIONS — older workbenches have an older version. This project\'s\n' +
          'instructions are in your context. If they contain the core (read the CONTEXT.md of every\n' +
          'connected folder and follow it; run `date`): do nothing, mention nothing. If something is\n' +
          'missing: show only what is missing as an addition — the user\'s own additions stay, never\n' +
          'replace the whole text. If there are no project instructions at all, show this block\n' +
          '(verbatim, Markdown code block):\n\n' + PROJEKTANWEISUNG.en +
          '\nPath: project sidebar → Instructions. Wait for confirmation.');
      }
      return teile.length ? teile.join('\n\n') : 'Nothing. Project instructions and About Me stay as they are.';
    },
    weiter: (p) => 'NEXT STEP FOR THE AGENT:\nRead ' + p + ' completely with the Read tool and follow it.',
  },
};

// ---------------------------------------------------------------- Hilfe, Start

function hilfe() {
  aus('holderbaum-werkbank ' + PKG.version + ' (Werkbank ' + VERSION + ')\n\n' +
    'Im Ordner, der die Werkbank ist oder werden soll:\n' +
    '  npx holderbaum-werkbank@latest                    einrichten\n' +
    '  npx holderbaum-werkbank@latest update             aktualisieren\n' +
    '  npx holderbaum-werkbank@latest update --pruefen   nur anzeigen, was ein Update ändert\n' +
    '  npx holderbaum-werkbank@latest update --rueckgaengig   letztes Update zurückdrehen\n' +
    '  npx holderbaum-werkbank@latest pruefen            Werkzeuge prüfen\n\n' +
    'Optionen:\n' +
    '  --en           englische Werkbank (Workbench/, CONTEXT.md)\n' +
    '  --dir <pfad>   Ordner statt des aktuellen\n' +
    '  --version, --help\n\n' +
    'Quelle: ' + PKG.homepage);
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) return hilfe();
  if (args.includes('--version') || args.includes('-v')) return aus(PKG.version);
  const befehl = args.find((a, i) => !a.startsWith('-') && args[i - 1] !== '--dir');
  if (!befehl || befehl === 'einrichten' || befehl === 'setup') return befehlEinrichten(args);
  if (befehl === 'update' && (args.includes('--rueckgaengig') || args.includes('--undo'))) return befehlRueckgaengig(args);
  if (befehl === 'update') return befehlUpdate(args);
  if (befehl === 'pruefen' || befehl === 'check') return befehlPruefen(args);
  return abbruch('Unbekannter Befehl: ' + befehl + '\nHilfe: npx holderbaum-werkbank@latest --help');
}

main();
