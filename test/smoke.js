'use strict';
// Einrichtung in leeren Ordnern (de, en), Schutz vor Doppel-Einrichtung, pruefen.
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const assert = require('assert');

const bin = path.join(__dirname, '..', 'bin', 'holderbaum-werkbank.js');
const HOME_LEER = fs.mkdtempSync(path.join(os.tmpdir(), 'werkbank-home-')); // Suche findet nie echte Werkbänke
const run = (args, cwd) => spawnSync('node', [bin, ...args], { cwd, encoding: 'utf8', env: { ...process.env, HOME: HOME_LEER } });

for (const [sprache, args, kontext, pfade] of [
  ['de', [], 'KONTEXT.md', ['Werkbank/Regeln/werkbank.md', 'Werkbank/Rollen/Sparringpartner/SYSTEM.md',
    'Werkbank/Workflows/FORMAT.md', 'Werkbank/Workflows/werkbank-update.md', 'Quellen/unterlagen', 'Projekte', 'Werkbank/protokolle']],
  ['en', ['--en'], 'CONTEXT.md', ['Workbench/Rules/workbench.md', 'Workbench/Roles/SparringPartner/SYSTEM.md',
    'Workbench/Workflows/FORMAT.md', 'Workbench/Workflows/workbench-update.md', 'Sources/documents', 'Projects', 'Workbench/logs']],
]) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'werkbank-smoke-'));
  const r = run(args, tmp);
  assert.strictEqual(r.status, 0, sprache + ': ' + r.stderr);
  for (const p of pfade) assert.ok(fs.existsSync(path.join(tmp, p)), sprache + ': ' + p + ' fehlt');
  assert.ok(!fs.existsSync(path.join(tmp, kontext)), sprache + ': ' + kontext + ' legt das Paket nicht an');
  // Lauf-Ordner liegt außerhalb der Werkbank
  const setup = r.stdout.match(/(\/\S+\/SETUP\.md)/)[1];
  assert.ok(!setup.startsWith(tmp), sprache + ': SETUP.md liegt in der Werkbank');
  assert.ok(fs.existsSync(setup) && fs.existsSync(path.join(path.dirname(setup), sprache === 'en' ? 'context-template.md' : 'kontext-vorlage.md')));
  assert.deepStrictEqual(fs.readdirSync(path.join(tmp, sprache === 'en' ? 'Workbench/logs' : 'Werkbank/protokolle')), []);
  // Kein holderbaum.io in der Werkbank
  assert.strictEqual(spawnSync('grep', ['-rl', 'holderbaum\\.io', tmp]).status, 1, sprache + ': holderbaum.io in der Werkbank');
  // pruefen grün, nach Beschädigung rot
  assert.strictEqual(run(['pruefen'], tmp).status, 0, sprache + ': pruefen');
  // Kontext-Budget: zu große KONTEXT.md wird gemeldet, ist aber kein Fehler
  fs.writeFileSync(path.join(tmp, kontext), '# K\n' + 'x'.repeat(10500));
  const b = run(['pruefen'], tmp);
  assert.strictEqual(b.status, 0);
  assert.match(b.stdout, new RegExp(kontext.replace('.', '\\.') + ': 1050\\d / 10000'), sprache + ': Budget ' + b.stdout);
  fs.unlinkSync(path.join(tmp, kontext));
  const regel = path.join(tmp, pfade[0]);
  fs.writeFileSync(regel, fs.readFileSync(regel, 'utf8').split('\n').slice(0, 20).join('\n'));
  assert.notStrictEqual(run(['pruefen'], tmp).status, 0, sprache + ': pruefen erkennt Kürzung nicht');
  // Zweite Einrichtung in einer bestehenden Werkbank wird abgelehnt
  fs.writeFileSync(path.join(tmp, kontext), '# eigene\n');
  const r2 = run(args, tmp);
  assert.notStrictEqual(r2.status, 0);
  assert.match(r2.stderr, /update/);
  fs.rmSync(tmp, { recursive: true, force: true });
}

// Zwei Einrichtungen in derselben Sekunde bekommen getrennte Lauf-Ordner
{
  const a = fs.mkdtempSync(path.join(os.tmpdir(), 'werkbank-smoke-a-'));
  const b = fs.mkdtempSync(path.join(os.tmpdir(), 'werkbank-smoke-b-'));
  const pa = run([], a).stdout.match(/(\/\S+\/SETUP\.md)/)[1];
  const pb = run([], b).stdout.match(/(\/\S+\/SETUP\.md)/)[1];
  assert.notStrictEqual(pa, pb);
}

assert.strictEqual(run(['--version']).stdout.trim(), require('../package.json').version);
assert.match(run(['--help']).stdout, /update --pruefen/);
console.log('smoke: ok');
