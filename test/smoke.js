'use strict';
// Rauchtest: Installation in leeren Ordner, zweiter Lauf überschreibt nichts.
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const assert = require('assert');

const bin = path.join(__dirname, '..', 'bin', 'holderbaum-werkbank.js');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'werkbank-test-'));

const out1 = execFileSync('node', [bin], { cwd: tmp, encoding: 'utf8' });
assert.match(out1, /NÄCHSTER SCHRITT/);
for (const f of ['Werkbank/Regeln/werkbank.md', 'Werkbank/Rollen/Sparringpartner/SYSTEM.md', 'Werkbank/Workflows/FORMAT.md']) {
  assert.ok(fs.existsSync(path.join(tmp, f)), f + ' fehlt');
}
for (const d of ['Quellen/unterlagen', 'Quellen/website', 'Projekte']) {
  assert.ok(fs.statSync(path.join(tmp, d)).isDirectory(), d + ' fehlt');
}
const laeufe = fs.readdirSync(path.join(tmp, 'Werkbank/protokolle'));
assert.strictEqual(laeufe.length, 1);
assert.match(laeufe[0], /^werkbank-setup-\d{4}-\d\d-\d\dT\d\d-\d\d-\d\d$/);
const lauf = path.join(tmp, 'Werkbank/protokolle', laeufe[0]);
assert.ok(fs.existsSync(path.join(lauf, 'SETUP.md')));
assert.ok(fs.existsSync(path.join(lauf, 'lauf.md')));
assert.ok(fs.statSync(path.join(lauf, 'kladde')).isDirectory());
assert.ok(!fs.existsSync(path.join(tmp, 'KONTEXT.md')), 'KONTEXT.md darf das Paket nicht anlegen');

// Zweiter Lauf: eigene Änderung bleibt erhalten
const regel = path.join(tmp, 'Werkbank/Regeln/werkbank.md');
fs.writeFileSync(path.join(tmp, 'KONTEXT.md'), '# Meine KONTEXT\n');
const inhalt = fs.readFileSync(path.join(__dirname, '..', 'werkbank/de/Werkbank/Regeln/werkbank.md'), 'utf8');
fs.writeFileSync(regel, inhalt.replace('# ', '# <!-- eigene Ergänzung --> '));
const out2 = execFileSync('node', [bin], { cwd: tmp, encoding: 'utf8' });
assert.match(out2, /nicht überschrieben/);
assert.match(fs.readFileSync(regel, 'utf8'), /eigene Ergänzung/);
assert.strictEqual(fs.readFileSync(path.join(tmp, 'KONTEXT.md'), 'utf8'), '# Meine KONTEXT\n');

// --version, --help
assert.strictEqual(execFileSync('node', [bin, '--version'], { encoding: 'utf8' }).trim(), require('../package.json').version);
assert.match(execFileSync('node', [bin, '--help'], { encoding: 'utf8' }), /npx holderbaum-werkbank@latest/);

fs.rmSync(tmp, { recursive: true, force: true });
console.log('smoke: ok');
