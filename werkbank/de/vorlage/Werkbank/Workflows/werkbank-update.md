---
name: werkbank-update
version: 5.0
status: aktiv
---
<!-- HOLDERBAUM-WERKSTATT · workflow-werkbank-update · v5.0 -->

# Werkbank-Update
Bringt diese Werkbank auf die neueste Version des Pakets `holderbaum-werkbank`.

## Was dein Agent tut

Er fragt das Paket, ob es eine neuere Version gibt, und fragt dich einmal, ob er sie einspielen soll (**Halt 1**). Danach erledigt er alles selbst: neue Werkzeuge, deine KONTEXT.md auf die neue Struktur — deine Inhalte, Regeln, Rollen, Workflows und Projekte bleiben, wie sie sind. Zum Schluss ein kurzer Bericht. Alles ist gesichert und lässt sich mit „Update rückgängig machen" zurückdrehen.

## Worauf es ankommt

- Der Nutzer will eine aktuelle Werkbank und nichts verlieren. Keine technischen Rückfragen, keine Dateipfade im Chat. Wo etwas zu entscheiden ist: die naheliegende Lösung, im Zweifel das Eigene des Nutzers behalten.
- Die Anleitung kommt vom Paket (`UPDATE.md`), nicht aus dem Gedächtnis.

## Trigger

„Werkbank updaten", „Werkbank-Update", „Update rückgängig machen" (→ Referenz).

## Bevor es losgeht

- Terminal im Wurzelverzeichnis dieser Werkbank (dort, wo die KONTEXT.md liegt). Cowork startet im Sandbox-Verzeichnis: vorher mit `cd` in den verbundenen Ordner.
- Schlägt ein Befehl fehl: in einem Satz sagen, dass das Update gerade nicht geht, Fehlermeldung darunter. Nichts von Hand nachbauen.

## Zonen

- **Quelle:** das Paket `holderbaum-werkbank`.
- **Kladde:** Lauf-Ordner `Werkbank/protokolle/werkbank-update-<Zeitstempel>/` (vom Paket angelegt: `UPDATE.md`, `lauf.md`, Sicherung `alt/`).
- **Ziel:** Werkzeug-Dateien und KONTEXT.md der Werkbank.

## Die Schritte

### 1. Nachsehen
*Handgriff*
`npx holderbaum-werkbank@latest update --pruefen`. Ändert nichts.
Schon aktuell → „Deine Werkbank ist aktuell." Ende.

### Halt 1 — Einspielen? · DU BIST DRAN
legt vor, in zwei Sätzen Alltagssprache: „Es gibt eine neue Version der Werkbank (vX.Y). Deine eigenen Inhalte, Regeln, Rollen, Workflows und Projekte bleiben erhalten." Hat das Paket eigene Änderungen an Werkzeug-Dateien gemeldet, ein dritter Satz: „Eigene Anpassungen am Sparringpartner oder an der Werkbank-Regel werden übernommen." Dann: „Einspielen?"

### 2. Einspielen und abarbeiten
*Urteil*
`npx holderbaum-werkbank@latest update`, dann `UPDATE.md` aus dem Lauf-Ordner (Pfad steht in der Ausgabe) vollständig mit dem Read-Tool lesen und befolgen. Keine weiteren Rückfragen außer denen, die `UPDATE.md` ausdrücklich vorsieht.

### 3. Bericht
*Handgriff*
Wie in `UPDATE.md` Schritt D: drei bis fünf Zeilen, Alltagssprache.

## Referenz

**Update rückgängig machen:** `npx holderbaum-werkbank@latest update --rueckgaengig` im Wurzelverzeichnis. Holt den vollständigen Stand vor dem letzten Update zurück; meldet der Befehl Dateien, die er nicht löschen durfte, diese nach Freigabe des Nutzers entfernen. Bericht in einem Satz.
===== HOLDERBAUM-WERKSTATT · DATEI VOLLSTÄNDIG GELADEN =====
