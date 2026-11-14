'use strict';
// Update gegen jede Referenz-Werkbank aus dem Feld (test/referenz/werkbaenke).
// Prüft: Version erkannt, Werkzeuge ersetzt und vollständig, alte Fassungen
// gesichert, Struktur umgezogen, Nutzerbestand erhalten, KONTEXT unangetastet
// (bis auf umgeschriebene Pfade), Anleitung vollständig, zweiter Lauf ändert nichts.
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const assert = require('assert');

const bin = path.join(__dirname, '..', 'bin', 'holderbaum-werkbank.js');
const REF = path.join(__dirname, 'referenz', 'werkbaenke');
// HOME zeigt auf einen leeren Ordner: die Werkbank-Suche darf nie echte Werkbänke
// des Entwicklerrechners finden (und ein Update dort anstoßen).
const HOME_LEER = fs.mkdtempSync(path.join(os.tmpdir(), 'werkbank-home-'));
const run = (args, cwd) => spawnSync('node', [bin, ...args], { cwd, encoding: 'utf8', env: { ...process.env, HOME: HOME_LEER } });
const ZIEL = 'v' + require('../package.json').version.split('.').slice(0, 2).join('.');

// v2.1 und v2.3 sind von ihrer Vorversion nicht zu unterscheiden: gleiche Werkzeug-Dateien,
// und ihre Bauanleitung schrieb die Vorversion in den Bootstrap-Block.
const ERWARTET = { 'v2.1': 'v2.0', 'v2.3': 'v2.2', gewachsen: 'v3.2' };

function kopie(von, nach) {
  fs.mkdirSync(nach, { recursive: true });
  for (const e of fs.readdirSync(von, { withFileTypes: true })) {
    const a = path.join(von, e.name); const b = path.join(nach, e.name);
    if (e.isDirectory()) kopie(a, b); else fs.copyFileSync(a, b);
  }
}
function alle(dir, rel = '') {
  const out = [];
  for (const e of fs.readdirSync(path.join(dir, rel), { withFileTypes: true })) {
    const r = rel ? rel + '/' + e.name : e.name;
    if (e.isDirectory()) out.push(...alle(dir, r)); else out.push(r);
  }
  return out;
}

let n = 0;
for (const name of fs.readdirSync(REF).sort()) {
  const [sprache, version] = name.split('-');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'werkbank-update-' + name + '-'));
  kopie(path.join(REF, name), tmp);
  const vorher = Object.fromEntries(alle(tmp).map((r) => [r, fs.readFileSync(path.join(tmp, r), 'utf8')]));
  const kontextAlt = fs.existsSync(path.join(tmp, 'CONTEXT.md')) ? 'CONTEXT.md' : 'KONTEXT.md';
  const t = (m) => name + ': ' + m;

  // Prüfen ändert nichts und erkennt die Version
  const p = run(['update', '--pruefen'], tmp);
  assert.strictEqual(p.status, 0, t(p.stderr));
  assert.match(p.stdout, new RegExp('(Installierte Version|Installed version): ' + (ERWARTET[version] || version).replace('.', '\\.') + ' '), t(p.stdout));
  assert.deepStrictEqual(alle(tmp).sort(), Object.keys(vorher).sort(), t('--pruefen hat Dateien verändert'));

  // Einspielen
  const u = run(['update'], tmp);
  assert.strictEqual(u.status, 0, t(u.stderr));
  const s = sprache === 'en'
    ? { k: 'CONTEXT.md', prot: 'Workbench/logs', upd: 'workbench-update', wf: 'Workbench/Workflows', proj: 'Projects/ServiceCases/CONTEXT.md', regel: 'Workbench/Rules/customer-texts.md', rolle: 'Workbench/Roles/Sales/SYSTEM.md', ablauf: 'Workbench/Workflows/weekly-report.md' }
    : { k: 'KONTEXT.md', prot: 'Werkbank/protokolle', upd: 'werkbank-update', wf: 'Werkbank/Workflows', proj: 'Projekte/Servicefaelle/KONTEXT.md', regel: 'Werkbank/Regeln/kundentexte.md', rolle: 'Werkbank/Rollen/Vertrieb/SYSTEM.md', ablauf: 'Werkbank/Workflows/wochenbericht.md' };
  if (name === 'en-v3.0') { // deutsche Struktur, deutscher Nutzerbestand → englische Struktur
    Object.assign(s, { proj: 'Projects/Servicefaelle/CONTEXT.md', regel: 'Workbench/Rules/kundentexte.md', rolle: 'Workbench/Roles/Vertrieb/SYSTEM.md', ablauf: 'Workbench/Workflows/wochenbericht.md' });
  }
  assert.strictEqual(run(['pruefen'], tmp).status, 0, t('pruefen nach Update'));
  for (const f of [s.k, s.proj, s.regel, s.rolle, s.ablauf]) assert.ok(fs.existsSync(path.join(tmp, f)), t(f + ' fehlt nach Update'));
  assert.ok(!fs.existsSync(path.join(tmp, 'Werkbank/Aufgaben/wochenbericht.md')), t('Aufgaben nicht umgezogen'));

  // Nutzerbestand inhaltlich erhalten (Pfade dürfen umgeschrieben sein)
  const mitNeuenPfaden = (x) => x.replace(/Werkbank\/Aufgaben\//g, sprache === 'en' ? 'Workbench/Workflows/' : 'Werkbank/Workflows/');
  for (const [alt, neu] of [['Werkbank/Regeln/kundentexte.md', s.regel], ['Workbench/Rules/customer-texts.md', s.regel]]) {
    if (vorher[alt]) assert.strictEqual(fs.readFileSync(path.join(tmp, neu), 'utf8'), vorher[alt], t('Regel verändert'));
  }
  // KONTEXT: Paket fasst den Inhalt nicht an — nur Pfade
  const kNeu = fs.readFileSync(path.join(tmp, s.k), 'utf8');
  if (name === 'en-v3.0') assert.match(kNeu, /Workbench\/Rules\//);
  else assert.strictEqual(kNeu, mitNeuenPfaden(vorher[kontextAlt]), t('KONTEXT verändert'));

  // Lauf-Ordner: Sicherung, Anleitung ohne offene Platzhalter
  const laeufe = fs.readdirSync(path.join(tmp, s.prot)).filter((x) => x.startsWith(s.upd));
  assert.strictEqual(laeufe.length, 1, t('Lauf-Ordner'));
  const lauf = path.join(tmp, s.prot, laeufe[0]);
  const anleitung = fs.readFileSync(path.join(lauf, 'UPDATE.md'), 'utf8');
  assert.ok(!/\{[A-Z_]+\}/.test(anleitung), t('Platzhalter in UPDATE.md'));
  assert.match(anleitung, /10\. (Kein Verweis auf holderbaum\.io|No reference to holderbaum\.io)/, t('Punkt 10 fehlt'));
  if (version < 'v3.3' || version === 'gewachsen') assert.match(anleitung, /PROJEKTANWEISUNG|PROJECT INSTRUCTIONS/, t('Projektanweisung fehlt'));
  else assert.doesNotMatch(anleitung, /PROJEKTANWEISUNG —|PROJECT INSTRUCTIONS —/, t('Projektanweisung unnötig'));
  assert.ok(alle(path.join(lauf, 'alt')).length >= 2, t('Sicherung fehlt'));
  assert.ok(fs.existsSync(path.join(lauf, sprache === 'en' ? 'context-template.md' : 'kontext-vorlage.md')));
  if (version === 'gewachsen') {
    assert.match(anleitung, /MODUS: ERGÄNZEN/, t('Modus'));
    assert.match(anleitung, /Keine Zeile für werkbank\.md/, t('eigenes Regelsystem'));
    assert.ok(fs.existsSync(path.join(tmp, 'Werkbank/Regeln/regelsystem.md')), t('regelsystem.md'));
    assert.ok(fs.existsSync(path.join(lauf, 'eigene-zeilen/Werkbank/Workflows/FORMAT.md')), t('eigene FORMAT-Zeilen'));
  } else assert.match(anleitung, /Original/i, t('Originale nicht erkannt'));

  // Rückgängig in einer Kopie: Stand wie vorher (Lauf-Ordner bleibt)
  {
    const r = fs.mkdtempSync(path.join(os.tmpdir(), 'werkbank-undo-' + name + '-'));
    kopie(tmp, r);
    const u2 = run(['update', '--rueckgaengig'], r);
    assert.strictEqual(u2.status, 0, t('rückgängig: ' + u2.stderr));
    const nachher = alle(r).filter((x) => !x.startsWith(s.prot + '/' + laeufe[0]));
    assert.deepStrictEqual(nachher.sort(), Object.keys(vorher).sort(), t('rückgängig: Dateiliste'));
    for (const rel of nachher) assert.strictEqual(fs.readFileSync(path.join(r, rel), 'utf8'), vorher[rel], t('rückgängig: ' + rel));
    fs.rmSync(r, { recursive: true, force: true });
  }

  // Zweiter Lauf: nichts mehr zu tun
  const zweit = run(['update'], tmp);
  assert.strictEqual(zweit.status, 0, t(zweit.stderr));
  assert.match(zweit.stdout, new RegExp('(Auf dem aktuellen Stand|Up to date) \\(' + ZIEL.replace('.', '\\.')), t(zweit.stdout));

  fs.rmSync(tmp, { recursive: true, force: true });
  n++;
}

// Eigene Änderung an einer Werkzeug-Datei wird erkannt und gesichert
{
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'werkbank-update-eigen-'));
  kopie(path.join(REF, 'de-v4.0'), tmp);
  const sp = path.join(tmp, 'Werkbank/Rollen/Sparringpartner/SYSTEM.md');
  fs.writeFileSync(sp, fs.readFileSync(sp, 'utf8').replace('## Funktion', '## Funktion\n\nEIGENE ERGÄNZUNG'));
  const u = run(['update'], tmp);
  assert.strictEqual(u.status, 0, u.stderr);
  assert.match(u.stdout, /Installierte Version: v4\.0/);
  assert.match(u.stdout, /eigenen Änderungen: Werkbank\/Rollen\/Sparringpartner\/SYSTEM\.md/);
  const lauf = path.join(tmp, 'Werkbank/protokolle', fs.readdirSync(path.join(tmp, 'Werkbank/protokolle')).find((x) => x.startsWith('werkbank-update')));
  assert.match(fs.readFileSync(path.join(lauf, 'alt/Werkbank/Rollen/Sparringpartner/SYSTEM.md'), 'utf8'), /EIGENE ERGÄNZUNG/);
  assert.match(fs.readFileSync(path.join(lauf, 'UPDATE.md'), 'utf8'), /eigene Regel/);
  const eigen = fs.readFileSync(path.join(lauf, 'eigene-zeilen/Werkbank/Rollen/Sparringpartner/SYSTEM.md'), 'utf8');
  assert.match(eigen, /^\d+: EIGENE ERGÄNZUNG$/m);
  assert.strictEqual(eigen.trim().split('\n').length, 1, 'nur die eigene Zeile: ' + eigen);
  fs.rmSync(tmp, { recursive: true, force: true });
}

// Gewachsene Werkbank: eigene Fassung bleibt, eigenes Regelsystem, große KONTEXT.md
{
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'werkbank-update-gewachsen-'));
  kopie(path.join(REF, 'de-v3.2'), tmp);
  const sp = path.join(tmp, 'Werkbank/Rollen/Sparringpartner/SYSTEM.md');
  const eigen = '# Sparringpartner\n\n' + Array.from({ length: 80 }, (_, i) => 'Eigene Regel Nummer ' + i + ' für diese Werkbank.').join('\n') + '\n';
  fs.writeFileSync(sp, eigen);
  fs.renameSync(path.join(tmp, 'Werkbank/Regeln/werkbank.md'), path.join(tmp, 'Werkbank/Regeln/regelsystem.md'));
  fs.appendFileSync(path.join(tmp, 'KONTEXT.md'), '\n## Notizen\n\n' + 'x'.repeat(12000) + '\n');
  const p = run(['update', '--pruefen'], tmp);
  assert.match(p.stdout, /Eigene Fassungen, bleiben: Werkbank\/Rollen\/Sparringpartner\/SYSTEM\.md \(\d+ %\)/, p.stdout);
  assert.match(p.stdout, /gewachsene Werkbank/);
  const u = run(['update'], tmp);
  assert.strictEqual(u.status, 0, u.stderr);
  assert.strictEqual(fs.readFileSync(sp, 'utf8'), eigen, 'eigene Fassung überschrieben');
  const lauf = path.join(tmp, 'Werkbank/protokolle', fs.readdirSync(path.join(tmp, 'Werkbank/protokolle')).find((x) => x.startsWith('werkbank-update')));
  assert.ok(fs.existsSync(path.join(lauf, 'neu/Werkbank/Rollen/Sparringpartner/SYSTEM.md')));
  const anl = fs.readFileSync(path.join(lauf, 'UPDATE.md'), 'utf8');
  assert.match(anl, /MODUS: ERGÄNZEN/);
  assert.match(anl, /Keine Zeile für werkbank\.md/);
  assert.match(anl, /EIGENE FASSUNGEN/);
  const pr = run(['pruefen'], tmp);
  assert.strictEqual(pr.status, 0, pr.stderr);
  assert.match(pr.stdout, /Eigene Fassungen \(bleiben\)/);
  assert.match(run(['update'], tmp).stdout, /Auf dem aktuellen Stand/);
  fs.rmSync(tmp, { recursive: true, force: true });
}

// Ohne Werkbank: klare Ablehnung
{
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'werkbank-update-leer-'));
  const u = run(['update'], tmp);
  assert.notStrictEqual(u.status, 0);
  assert.match(u.stderr, /Keine Werkbank/);
  fs.rmSync(tmp, { recursive: true, force: true });
}

// Werkbank suchen: Cowork startet im Sandbox-Home, die Werkbank liegt unter mnt/.
{
  const sb = fs.mkdtempSync(path.join(os.tmpdir(), 'werkbank-suche-'));
  fs.mkdirSync(path.join(sb, 'mnt', 'outputs'), { recursive: true });
  fs.mkdirSync(path.join(sb, 'mnt', 'Fotos'));
  kopie(path.join(REF, 'de-v4.0'), path.join(sb, 'mnt', 'Meine Werkbank'));
  const eine = run(['update', '--pruefen'], sb);
  assert.strictEqual(eine.status, 0, 'Suche: ' + eine.stderr);
  assert.match(eine.stdout, /Werkbank: .*mnt\/Meine Werkbank/, 'Suche: Pfad nicht genannt');
  assert.match(eine.stdout, /Installierte Version: v4\.0 /, 'Suche: ' + eine.stdout);
  const pr = run(['pruefen'], sb);
  assert.match(pr.stdout, /Werkbank: .*mnt\/Meine Werkbank/, 'Suche (pruefen): ' + pr.stdout + pr.stderr);
  kopie(path.join(REF, 'en-v4.0'), path.join(sb, 'mnt', 'Company'));
  const zwei = run(['update'], sb);
  assert.strictEqual(zwei.status, 1, 'Suche: zwei Werkbänke müssen abbrechen');
  assert.match(zwei.stderr, /Meine Werkbank[\s\S]*Company|Company[\s\S]*Meine Werkbank/, 'Suche: Liste fehlt');
  assert.ok(!fs.existsSync(path.join(sb, 'mnt', 'Meine Werkbank', 'Werkbank', 'protokolle', 'x')) &&
    !fs.readdirSync(path.join(sb, 'mnt', 'Meine Werkbank', 'Werkbank', 'protokolle')).some((d) => d.startsWith('werkbank-update-')),
    'Suche: bei zwei Werkbänken darf nichts geändert werden');
  const dir = run(['update', '--pruefen', '--dir', path.join(sb, 'mnt', 'Company')], sb);
  assert.strictEqual(dir.status, 0, 'Suche --dir: ' + dir.stderr);
  const leer = fs.mkdtempSync(path.join(os.tmpdir(), 'werkbank-leer-'));
  const keine = run(['update'], leer);
  assert.strictEqual(keine.status, 1, 'Suche: ohne Werkbank muss abbrechen');
  assert.match(keine.stderr, /Keine Werkbank gefunden/);
}

console.log('update: ok (' + n + ' Referenz-Werkbänke, Werkbank-Suche)');
