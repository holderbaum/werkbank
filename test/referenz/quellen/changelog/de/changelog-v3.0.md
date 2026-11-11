v3.0 (2026-07-06)

Umbenennung: "Aufgabe" heißt jetzt durchgehend "Workflow" — im
Begriff und im Verzeichnis. "Aufgabe" war generisch und
bedeutungsarm; "Workflow" trifft genau, was das Format
beschreibt: ein wiederkehrender Ablauf mit Auslöser, festen
Schritten und definiertem Ergebnis. Dazu schärft der
Sparringpartner jetzt die Grundfrage "reden oder ablaufen?"
(Rolle vs. Workflow) bevor er baut, und bekommt erstmals ein
sauberes Automatisierungs-Modell: Workflow zuerst von Hand
auslösen und verifizieren, dann optional ein Scheduler als
ultradünnen Auslöser. BREAKING: Das Verzeichnis
Werkbank/Aufgaben/ wird zu Werkbank/Workflows/.

Dateien ersetzen:

Folgende Dateien herunterladen und die lokalen Versionen damit
ersetzen. Bei einer Mehrebenen-Werkbank ist das die Werkbank,
in der Sparringpartner und werkbank.md liegen.

| Datei | URL | Lokaler Pfad |
|-------|-----|-------------|
| Werkbank-Regel | https://holderbaum.io/werkstatt/bauanleitung/werkbank-regel.md | Werkbank/Regeln/werkbank.md |
| Sparringpartner | https://holderbaum.io/werkstatt/bauanleitung/sparringpartner-system.md | Werkbank/Rollen/Sparringpartner/SYSTEM.md |
| Workflow-Format | https://holderbaum.io/werkstatt/bauanleitung/format.md | Werkbank/Workflows/FORMAT.md |

Verzeichnis umbenennen (BREAKING):

- Benenne das Verzeichnis `Werkbank/Aufgaben/` in
  `Werkbank/Workflows/` um. Alle bestehenden Dateien wandern mit
  — inklusive FORMAT.md, falls vorhanden.
- Gibt es `Werkbank/Aufgaben/` nicht (Werkbank ohne Workflows),
  lege `Werkbank/Workflows/` leer an und lege FORMAT.md dort ab.

Was sich am Sparringpartner geändert hat:

- Neue Grundfrage-Weiche vor jedem Bauen: "Willst du damit reden
  (→ Rolle) oder soll das ablaufen (→ Workflow)?" — inklusive
  Sidecar-Rolle (ein einzelner Workflow-Schritt läuft in einer
  Rolle).
- Neue Sektion "Automatisierung": Ein Workflow wird immer erst
  von Hand ausgelöst und verifiziert; erst danach optional ein
  Scheduler. Der Scheduler ist ein ultradünner Layer ("Führe den
  Workflow X in der Werkbank aus"), führt nur Workflows aus, nie
  ein Gespräch oder Sparring.
- Durchgängige Umbenennung Aufgabe → Workflow.
- Fix: Der in die Bauanleitung eingebettete Sparringpartner war
  in v2.3 hinter der Standalone-Datei zurück (ihm fehlte die
  Kompositions-Sektion). Frisch-Install und Update liefern jetzt
  wieder denselben Sparringpartner.

Was sich in der Werkbank-Regel geändert hat:

- Umbenennung Aufgabe → Workflow (Trigger, Educated-Guess-Zweig,
  Prüfreihenfolge, Format-Sektion).

Was sich am Update- und Install-Mechanismus ändert:

- Der Update-Flow läuft ab jetzt über einen **Changelog-Index**
  (https://holderbaum.io/werkstatt/bauanleitung/changelog.md)
  statt über den Changelog-Abschnitt der Bauanleitung. Der neue
  Sparringpartner (oben unter "Dateien ersetzen") bringt diesen
  Flow schon mit: Er liest deine Version, holt aus dem Index nur
  die dazwischenliegenden Einträge und arbeitet sie aufsteigend
  ab. Für dich ändert sich am Trigger nichts — weiterhin "Werkbank
  updaten".
- Neue Werkbänke holen ihre Werkzeuge beim Aufbau jetzt per
  Download aufs Filesystem, statt sie inline aus der Bauanleitung
  zu kopieren. Für bestehende Werkbänke ist das irrelevant — es
  betrifft nur den Erstaufbau.

KONTEXT.md — empfohlene strukturelle Änderungen:

1. Sektion `## Aufgaben` in `## Workflows` umbenennen. Einträge,
   die auf `Werkbank/Aufgaben/…` zeigen, auf
   `Werkbank/Workflows/…` umbiegen.
2. Im Trigger der Werkbank-Regel (Regelsystem-Index): "Aufgabe
   anlegen" → "Workflow anlegen", "mach das zur Aufgabe" → "mach
   das zum Workflow".
3. In der Verzeichnisstruktur-Übersicht `Aufgaben/` → `Workflows/`.

Version danach:

Bootstrap-Block in der KONTEXT.md auf v3.0 hochziehen:

> Bootstrap-Info: Diese Werkbank wurde mit der
> Holderbaum-Werkbank-Bauanleitung v3.0 (06.07.2026) angelegt.
> Aktuelle Version und Updates:
> https://holderbaum.io/werkstatt/bauanleitung.txt
