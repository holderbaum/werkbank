#!/usr/bin/env node
'use strict';
// Erzeugt lib/bekannt.json: Prüfsumme jeder je ausgelieferten Werkzeug-Datei →
// Versionen, in denen sie so ausgeliefert wurde, und Sprache. Quelle: die
// Referenz-Werkbänke (test/referenz/werkbaenke) und die aktuelle Vorlage.
// Aufruf aus der Repo-Wurzel: node tools/bekannt-erzeugen.js [--pruefen]
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const WURZEL = path.join(__dirname, '..');
const norm = (t) => t.replace(/\r\n/g, '\n').replace(/\s+$/, '') + '\n';
const summe = (p) => crypto.createHash('sha256').update(norm(fs.readFileSync(p, 'utf8'))).digest('hex');
const PKG = require('../package.json');
const AKTUELL = 'v' + PKG.version.split('.').slice(0, 2).join('.');
const PFADE = [
  'Werkbank/Regeln/werkbank.md', 'Werkbank/Rollen/Sparringpartner/SYSTEM.md',
  'Werkbank/Workflows/FORMAT.md', 'Werkbank/Aufgaben/FORMAT.md',
  'Workbench/Rules/workbench.md', 'Workbench/Roles/SparringPartner/SYSTEM.md', 'Workbench/Workflows/FORMAT.md',
];

function alle(dir, rel = '') {
  const out = [];
  for (const e of fs.readdirSync(path.join(dir, rel), { withFileTypes: true })) {
    const r = rel ? rel + '/' + e.name : e.name;
    if (e.isDirectory()) out.push(...alle(dir, r)); else out.push(r);
  }
  return out;
}

const bekannt = {};
const zeilen = new Set();
const zeilenSumme = (z) => crypto.createHash('sha256').update(z.trim().replace(/\s+/g, ' ')).digest('hex').slice(0, 8);
function eintragen(datei, version, sprache) {
  for (const z of norm(fs.readFileSync(datei, 'utf8')).split('\n')) if (z.trim()) zeilen.add(zeilenSumme(z));
  const h = summe(datei);
  const e = bekannt[h] || (bekannt[h] = { sprache, versionen: [] });
  if (!e.versionen.includes(version)) e.versionen.push(version);
}

const ref = path.join(WURZEL, 'test/referenz/werkbaenke');
for (const name of fs.readdirSync(ref).sort()) {
  const [sprache, version] = name.split('-');
  for (const rel of PFADE) {
    const p = path.join(ref, name, rel);
    if (fs.existsSync(p)) eintragen(p, version, sprache);
  }
}
for (const sprache of ['de', 'en']) {
  const v = path.join(WURZEL, 'werkbank', sprache, 'vorlage');
  if (!fs.existsSync(v)) continue;
  for (const rel of alle(v)) eintragen(path.join(v, rel), AKTUELL, sprache);
}
const sortiert = {};
for (const k of Object.keys(bekannt).sort()) sortiert[k] = bekannt[k];
const json = JSON.stringify(sortiert, null, 1) + '\n';
const ziel = path.join(WURZEL, 'lib/bekannt.json');
const zeilenZiel = path.join(WURZEL, 'lib/zeilen.json');
const zeilenJson = JSON.stringify([...zeilen].sort()) + '\n';
if (process.argv.includes('--pruefen')) {
  if (!fs.existsSync(ziel) || fs.readFileSync(ziel, 'utf8') !== json ||
      !fs.existsSync(zeilenZiel) || fs.readFileSync(zeilenZiel, 'utf8') !== zeilenJson) {
    console.error('lib/bekannt.json oder lib/zeilen.json ist veraltet: node tools/bekannt-erzeugen.js');
    process.exit(1);
  }
} else {
  fs.writeFileSync(ziel, json);
  fs.writeFileSync(zeilenZiel, zeilenJson);
  console.log(Object.keys(bekannt).length + ' Prüfsummen → lib/bekannt.json, ' + zeilen.size + ' Zeilen → lib/zeilen.json');
}
