# Werkbank

Die Werkbank ist ein strukturiertes Verzeichnis, in dem ein Mensch mit KI-Agenten arbeitet: eine `KONTEXT.md` als Schild an der Wand, dazu Regeln, Rollen und Workflows. Gedacht für Claude Cowork.

Mehr zur Idee: [holderbaum.io](https://holderbaum.io)

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

Der Agent legt das Gerüst an, sammelt Material über dich ein (Website, Unterlagen, ChatGPT-/Claude-Gedächtnis) und baut daraus deine `KONTEXT.md`. Am Ende zeigt er zwei kurze Textblöcke, die du selbst in deine Claude-Einstellungen kopierst.

## Was das Paket tut

- legt `Werkbank/`, `Quellen/` und `Projekte/` im aktuellen Ordner an
- kopiert drei Werkzeuge: Werkbank-Regel, Sparringpartner, Workflow-Format
- überschreibt keine vorhandene Datei
- legt die Setup-Anleitung in `Werkbank/protokolle/werkbank-setup-<Zeitstempel>/SETUP.md`
- hat keine Abhängigkeiten und lädt nichts nach

Der Inhalt liegt offen in [`werkbank/de/`](werkbank/de/).

## Für den Agenten: wenn etwas schiefgeht

- **Befehl lief im falschen Ordner:** Cowork startet Terminal-Befehle im Sandbox-Verzeichnis. Vorher mit `cd` in den verbundenen Ordner des Nutzers wechseln (unter `/sessions/<id>/mnt/<Ordner>`).
- **npm nicht erreichbar:** Dem Nutzer die Fehlermeldung zeigen. Nichts zusammenraten, keine Datei aus dem Gedächtnis schreiben.

## Releases

Ein Tag `vX.Y.Z` auf `main` veröffentlicht das Paket per GitHub Action auf npm (`.github/workflows/release.yml`). Die Version in `package.json` muss zum Tag passen. `npm test` prüft die Installation in einem leeren und einem befüllten Ordner.

## Lizenz

MIT
