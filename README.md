# Werkbank

Die Werkbank ist ein strukturiertes Verzeichnis, in dem ein Mensch mit KI-Agenten arbeitet: eine `KONTEXT.md` als Schild an der Wand, dazu Regeln, Rollen und Workflows. Gedacht für Claude Cowork.

## Einrichten

Ordner in Cowork verbinden, neue Session starten, diesen Text hineinkopieren:

```
Hallo! Ich möchte in diesem Ordner meine Werkbank einrichten. Das ist eine
Arbeitsumgebung, in der wir beide gut zusammenarbeiten können.

Lade sie bitte herunter und folge der Anleitung, die dabei ist. Wenn du etwas
von mir brauchst, frag mich einfach.

---
Für den Agenten:
npx holderbaum-werkbank@latest
```

Englische Werkbank: `npx holderbaum-werkbank@latest --en`.

Der Agent legt das Gerüst an und bittet um Material: ein Gedächtnis-Export aus ChatGPT oder Claude, die Website, Unterlagen über das Unternehmen — alles per Drag & Drop in den Chat. Daraus entsteht die `KONTEXT.md`. Am Ende zeigt er zwei kurze Textblöcke, die du selbst in deine Claude-Einstellungen kopierst.

## Aktualisieren

In der Werkbank: „Werkbank updaten". Der Workflow `werkbank-update` führt `npx holderbaum-werkbank@latest update` aus, zeigt vorher, was sich ändert, und legt Änderungen an der `KONTEXT.md` zur Freigabe vor.

Werkbänke, die vor dem npm-Paket über die Bauanleitung eingerichtet wurden (v1.5 bis v4.0), bringt derselbe Befehl auf den aktuellen Stand.

## Befehle

| Befehl | Was |
|---|---|
| `npx holderbaum-werkbank@latest` | einrichten (`--en` für Englisch) |
| `npx holderbaum-werkbank@latest update --pruefen` | anzeigen, was ein Update ändert |
| `npx holderbaum-werkbank@latest update` | aktualisieren |
| `npx holderbaum-werkbank@latest update --rueckgaengig` | letztes Update zurückdrehen |
| `npx holderbaum-werkbank@latest pruefen` | Werkzeug-Dateien prüfen |

Das Paket überschreibt nie Dateien des Nutzers. Ein Update ersetzt nur die Werkzeug-Dateien, die es selbst mitbringt, und sichert die alten Fassungen im Lauf-Ordner der Werkbank. Die Einrichtungsanleitung legt es außerhalb der Werkbank ab; nach der Einrichtung bleibt dort nichts davon liegen. Keine Abhängigkeiten.

Der Inhalt liegt offen in [`werkbank/de/`](werkbank/de/) und [`werkbank/en/`](werkbank/en/).

## Für den Agenten: wenn etwas schiefgeht

- **Befehl lief im falschen Ordner:** Cowork startet Terminal-Befehle im Sandbox-Verzeichnis. Vorher mit `cd` in den verbundenen Ordner des Nutzers wechseln (unter `/sessions/<id>/mnt/<Ordner>`).
- **npm nicht erreichbar:** Dem Nutzer die Fehlermeldung zeigen. Nichts zusammenraten, keine Datei aus dem Gedächtnis schreiben.

## Entwicklung

- `npm test` — Einrichtung (de, en), Update gegen jede Referenz-Werkbank, Prüfsummen-Liste aktuell.
- `test/referenz/` — Referenz-Werkbänke aller Versionen im Feld und ihre Quellen, siehe [`test/referenz/README.md`](test/referenz/README.md).
- `lib/bekannt.json`, `lib/zeilen.json` — Prüfsummen aller je ausgelieferten Werkzeug-Dateien und ihrer Zeilen; daran erkennt das Update die installierte Version und eigene Zeilen des Nutzers. Nach jeder Änderung an einer Werkzeug-Datei: `node tools/bekannt-erzeugen.js`.
- Release: Tag `vX.Y.Z` auf `main` → GitHub Action veröffentlicht per Trusted Publishing auf npm (`.github/workflows/release.yml`). Die Version in `package.json` muss zum Tag passen.

Tests mit Agenten (Inhalt, Sperre, echter Lauf): [`test/agenten-tests.md`](test/agenten-tests.md).

Änderungen je Version: [CHANGELOG.md](CHANGELOG.md).

## Lizenz

- **Werkbank-Inhalt** (`werkbank/`: Werkbank-Regel, Sparringpartner, Workflow-Format, Workflows, SETUP, UPDATE): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.de). Nutzen, ändern, weitergeben, auch kommerziell, mit Namensnennung: „Holderbaum Werkbank von Jakob Holderbaum, https://github.com/holderbaum/werkbank“. Änderungen kennzeichnen. Details: [`werkbank/LICENSE.md`](werkbank/LICENSE.md).
- **Code** (`bin/`, `lib/`, `tools/`, `test/`): MIT, siehe [`LICENSE`](LICENSE).
- **Deine Werkbank gehört dir.** Was in deiner Werkbank entsteht (KONTEXT.md, eigene Regeln, Rollen, Workflows, Quellen), fällt nicht unter diese Lizenzen.
- **Der Name ist nicht lizenziert.** „Holderbaum“ und „Holderbaum Werkbank“ sind nicht Teil der Lizenz. Abgewandelte Fassungen bitte unter eigenem Namen anbieten.
