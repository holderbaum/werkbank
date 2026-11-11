<!-- HOLDERBAUM-WERKSTATT · format-schreiben · v5.0 -->
# Workflow-Format — Schreiben

Gelesen nur, wenn ein Workflow gebaut oder geändert wird. Was ein Lauf zum Ausführen braucht, steht
in [[Werkbank/Workflows/FORMAT.md]] — beides zusammen ist die Grammatik. Ein einzelner Workflow
erklärt das Format nicht noch einmal.

## Skelett

```
---
name: …
version: …
status: …
rolle: …            (falls der ganze Workflow in einer Rolle läuft)
template: …         (falls der Workflow ein festes Template füllt)
---

# Titel
Ein-Satz-Zweck.

## Was dein Agent tut         Klartext-Überblick für den Besitzer: der Lauf, die Halte,
                              was ohne den Menschen nie passiert
## Worauf es ankommt          die wenigen Dinge, an denen die Qualität hängt
## Trigger
## Bevor es losgeht           Voraussetzungen
## Zonen                      konkrete Quelle-, Kladde- und Ziel-Pfade

## Die Schritte
### 1. …
### Halt 1 — … · DU BIST DRAN
↻ Korrekturschleife: …        (falls Prüfschritte zurückspringen)
### 2. …

## Referenz                   task-spezifische Checklisten, Quellen
```

„Was dein Agent tut" und „Worauf es ankommt" sind task-spezifisch und kurz. Alles Generische steht
im Format, nicht im einzelnen Workflow.

## Ein Schritt

Überschrift (Klartext-Name), **Intent-Satz** (was passiert — für den Menschen), dann die kursive
Zeile mit Anspruch, optional `nutzt` und `Rolle`, dann `liest`, `schreibt`, Auftrag.

- Mehrere Ergebnisdateien: je Datei eine `schreibt:`-Zeile.
- Dateien, die der Nutzer liefert (Listen, Vorlagen), liegen im Projekt-Ordner und stehen unter
  Zonen → Quelle; der Workflow nennt den Pfad.
- Hinter jeder `schreibt:`-Datei steht ihre **Form** (Tabelle mit Spalten X | Y | Z; Datenblatt mit
  Feldern …), damit der nächste Schritt weiß, was er bekommt.
- **Anspruch** ehrlich wählen: Handgriff für Ablegen, Abhaken, ein Tool laufen lassen; Urteil für
  Synthese und Text; Fachurteil nur bei geringer Fehlertoleranz und hoher Konsequenz.
- **Fan-out:** In `nutzt` steht „mehrere Subagenten parallel, einer je …". Der Schritt beschreibt,
  was *ein* Teil-Agent tut und wie die Teildateien zusammengeführt werden. Nie schreiben mehrere in
  dieselbe Datei.

## Prüfschritte und Korrekturschleifen

Ein Prüfschritt trägt keine eigene Grenze; er zeigt nur in den Loop („bei Mängeln → zurück in die
Korrekturschleife, Schritt N"). Die Grenze steht einmal, als eigene Zeile direkt vor dem ersten
Schritt des Blocks (im Skelett: vor Schritt 2): Block, Anzahl Durchläufe, fester Ausgang (ein Halt). So multiplizieren sich
verschachtelte Schleifen nicht.

## Außenwirkung

Alles, was außerhalb der Dateien wirkt — Mail, Eintrag in einem Tool, Veröffentlichung — bekommt ⚠
und einen Halt davor. So ist auf einen Blick klar, wo ein Schritt die Welt verändert.

## Self-contained

Alles, worauf sich ein Workflow stützt, ist sichtbar benannt.

- **Erlaubt:** benannte Eingaben (Templates, Daten, Wissensquellen), Werkzeuge (Skripte,
  Konnektoren), das Laufen in einer Rolle, andere Workflows (auch parallel).
- **Verboten:** sich auf Betriebsregeln der Werkbank verlassen, die im Hintergrund feuern. Was der
  Workflow davon braucht, trägt er selbst.

## Plan-Modus und lokale Ergänzungen

- Soll ein Workflow ohne Chat laufen können (geplante Aufgabe, Aufrufer ohne Mensch), trägt er in
  § Zonen den Satz „Plan-Modus möglich: Datenbestand-Pfade gehen nach `kladde/plan/`."
  Details: [[Werkbank/Workflows/FORMAT-plan-modus.md]].
- Lernt die Werkbank etwas über das Format, gehört es nach `Werkbank/Workflows/FORMAT-lokal.md`,
  nie in eine der ausgelieferten FORMAT-Dateien — die ersetzt jedes Update.

## Größe

Ein Workflow wird bei jedem Lauf geladen: Richtwert 15.000 Zeichen (Werkbank-Regel →
Kontext-Budget). Keine Änderungshistorie im Workflow; Lauf-Protokolle stehen in `lauf.md`.
Seltene Teile (lange Checklisten, Beispiele) in eine Datei daneben, die ein Schritt bei Bedarf
liest.
===== HOLDERBAUM-WERKSTATT · DATEI VOLLSTÄNDIG GELADEN =====
