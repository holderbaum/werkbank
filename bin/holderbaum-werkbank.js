#!/usr/bin/env node
'use strict';

// holderbaum-werkbank — legt eine Werkbank im aktuellen Ordner an.
// Keine Abhängigkeiten. Überschreibt nie eine vorhandene Datei.

const fs = require('fs');
const path = require('path');

const PKG = require('../package.json');
const QUELLE = path.join(__dirname, '..', 'werkbank');
const MARKER = '===== HOLDERBAUM-WERKSTATT · DATEI VOLLSTÄNDIG GELADEN =====';
const WERKZEUGE = [
  ['Werkbank/Regeln/werkbank.md', 150],
  ['Werkbank/Rollen/Sparringpartner/SYSTEM.md', 150],
  ['Werkbank/Workflows/FORMAT.md', 100],
];

function abbruch(text) {
  process.stderr.write('\nholderbaum-werkbank: ' + text + '\n\n');
  process.exit(1);
}

function hilfe() {
  process.stdout.write(
    'holderbaum-werkbank ' + PKG.version + '\n\n' +
    'Aufruf (im Ordner, der die Werkbank werden soll):\n' +
    '  npx holderbaum-werkbank@latest\n\n' +
    'Optionen:\n' +
    '  --dir <pfad>   Zielordner statt des aktuellen Ordners\n' +
    '  --en           Englische Fassung (noch nicht verfügbar)\n' +
    '  --version      Version ausgeben\n' +
    '  --help         Diese Hilfe\n\n' +
    'Quelle: ' + PKG.homepage + '\n'
  );
}

// Zeitstempel in Europe/Berlin, Format JJJJ-MM-TTTHH-MM-SS
function zeitstempel() {
  const teile = new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  }).formatToParts(new Date());
  const t = {};
  for (const p of teile) t[p.type] = p.value;
  return `${t.year}-${t.month}-${t.day}T${t.hour}-${t.minute}-${t.second}`;
}

function kopiere(von, nach, bericht) {
  for (const eintrag of fs.readdirSync(von, { withFileTypes: true })) {
    const a = path.join(von, eintrag.name);
    const b = path.join(nach, eintrag.name);
    if (eintrag.isDirectory()) {
      fs.mkdirSync(b, { recursive: true });
      kopiere(a, b, bericht);
    } else if (fs.existsSync(b)) {
      bericht.uebersprungen.push(b);
    } else {
      fs.copyFileSync(a, b);
      bericht.angelegt.push(b);
    }
  }
}

function pruefeWerkzeug(ziel, rel, minZeilen) {
  const datei = path.join(ziel, rel);
  if (!fs.existsSync(datei)) return rel + ': fehlt';
  const zeilen = fs.readFileSync(datei, 'utf8').split('\n');
  const inhalt = zeilen.filter((z) => z.trim() !== '');
  if (zeilen.length < minZeilen) return rel + ': nur ' + zeilen.length + ' Zeilen';
  if (inhalt[inhalt.length - 1] !== MARKER) return rel + ': End-Marker fehlt';
  return null;
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) return hilfe();
  if (args.includes('--version') || args.includes('-v')) {
    return process.stdout.write(PKG.version + '\n');
  }
  if (args.includes('--en')) {
    abbruch('Die englische Fassung ist noch nicht verfügbar. Ohne --en starten.');
  }

  const i = args.indexOf('--dir');
  const ziel = path.resolve(i >= 0 && args[i + 1] ? args[i + 1] : process.cwd());

  // Schutz: Cowork startet Terminal-Befehle im Sandbox-Home, nicht im
  // Ordner des Nutzers. Dort darf keine Werkbank entstehen.
  if (/^\/sessions\/[^/]+\/?$/.test(ziel)) {
    abbruch(
      'Falscher Ordner: ' + ziel + ' ist das Sandbox-Verzeichnis, nicht der Ordner des Nutzers.\n' +
      'Wechsle mit cd in den verbundenen Ordner (unter ' + ziel.replace(/\/$/, '') + '/mnt/…) und starte erneut.'
    );
  }
  if (!fs.existsSync(ziel) || !fs.statSync(ziel).isDirectory()) {
    abbruch('Zielordner existiert nicht: ' + ziel);
  }
  try {
    fs.accessSync(ziel, fs.constants.W_OK);
  } catch (e) {
    abbruch('Kein Schreibrecht im Zielordner: ' + ziel);
  }

  const stempel = zeitstempel();
  const laufRel = path.join('Werkbank', 'protokolle', 'werkbank-setup-' + stempel);
  const lauf = path.join(ziel, laufRel);
  const bericht = { angelegt: [], uebersprungen: [] };

  // Schritt 1: Verzeichnisse
  for (const d of [
    'Werkbank/Regeln', 'Werkbank/Rollen/Sparringpartner', 'Werkbank/Workflows',
    path.join(laufRel, 'kladde'), 'Quellen/unterlagen', 'Quellen/website', 'Projekte',
  ]) {
    fs.mkdirSync(path.join(ziel, d), { recursive: true });
  }

  // Schritt 2: Werkzeuge (SETUP.md kommt in den Lauf-Ordner, nicht ins Root)
  const de = path.join(QUELLE, 'de');
  kopiere(path.join(de, 'Werkbank'), path.join(ziel, 'Werkbank'), bericht);
  fs.copyFileSync(path.join(de, 'SETUP.md'), path.join(lauf, 'SETUP.md'));

  const fehler = WERKZEUGE.map(([rel, n]) => pruefeWerkzeug(ziel, rel, n)).filter(Boolean);
  if (fehler.length) {
    abbruch('Werkzeuge unvollständig:\n  ' + fehler.join('\n  ') + '\nNichts zusammenraten — Paket neu ausführen.');
  }

  const zeilenzahl = (rel) => fs.readFileSync(path.join(ziel, rel), 'utf8').replace(/\n$/, '').split('\n').length;
  fs.writeFileSync(path.join(lauf, 'lauf.md'),
    '# Lauf werkbank-setup-' + stempel + '\n' +
    '- Paket: holderbaum-werkbank ' + PKG.version + ' (Bauanleitung v4.0)\n' +
    '- Start: ' + stempel + '\n' +
    '- Schritte:\n' +
    '  - Schritt 1, ' + stempel + ': Verzeichnisse angelegt (Paket)\n' +
    '  - Schritt 2, ' + stempel + ': Werkzeuge ' +
      WERKZEUGE.map(([rel]) => path.basename(path.dirname(rel)) + '/' + path.basename(rel) + ' (' + zeilenzahl(rel) + ' Zeilen)').join(', ') +
      (bericht.uebersprungen.length ? '; vorhanden und nicht überschrieben: ' + bericht.uebersprungen.map((p) => path.relative(ziel, p)).join(', ') : '') +
      '\n'
  );

  const setupRel = path.join(laufRel, 'SETUP.md');
  process.stdout.write(
    'Werkbank-Gerüst angelegt in: ' + ziel + '\n' +
    'Paket holderbaum-werkbank ' + PKG.version + ' · Werkzeuge v4.0 vollständig\n' +
    (bericht.uebersprungen.length
      ? 'Vorhanden, nicht überschrieben: ' + bericht.uebersprungen.map((p) => path.relative(ziel, p)).join(', ') + '\n'
      : '') +
    '\n' +
    'NÄCHSTER SCHRITT FÜR DEN AGENTEN:\n' +
    'Lies ' + setupRel + ' (relativ zu diesem Ordner) vollständig mit dem Read-Tool\n' +
    'und folge der Anleitung ab SCHRITT 3. Der Nutzer muss nichts tun.\n'
  );
}

main();
