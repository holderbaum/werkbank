v2.0 (2026-06-16)

Großes Update. Der Sparringpartner kann jetzt geteilte Werkbänke
aufbauen und bestehende Werkbänke in eine Mehrebenen-Hierarchie
migrieren. Die Werkbank-Regel kennt jetzt die Prüfreihenfolge nach
kleinstem Blastradius und kann mit mehreren Werkbänken umgehen. Der
Update-Mechanismus ist von hardcodierten URLs auf dieses Changelog
umgestellt.

Dateien ersetzen:

Folgende Dateien herunterladen und die lokalen Versionen damit
ersetzen. Die Dateien liegen in der Werkbank, in der Sparringpartner
und werkbank.md leben — bei einer Mehrebenen-Werkbank ist das
typischerweise die geteilte (Unternehmens-)Werkbank, nicht die
persönliche.

| Datei | URL | Lokaler Pfad |
|-------|-----|-------------|
| Werkbank-Regel | https://holderbaum.io/werkstatt/bauanleitung/werkbank-regel.md | Werkbank/Regeln/werkbank.md |
| Sparringpartner | https://holderbaum.io/werkstatt/bauanleitung/sparringpartner-system.md | Werkbank/Rollen/Sparringpartner/SYSTEM.md |

Was sich in der Werkbank-Regel geändert hat:

- Prüfreihenfolge (kleinster Blastradius zuerst) im Abschnitt
  "Educated Guess": Wenn der Nutzer Feedback gibt, prüft der Agent
  jetzt zuerst den spezifischsten Ort — aktive Aufgabe → aktive
  Rolle → bestehende Regel erweitern → erst dann neue Regel. Das
  verhindert, dass für jede Korrektur eine globale Regel entsteht.
- Triage bei mehreren Werkbänken: Wenn ein betroffenes Artefakt
  in einer höheren Werkbank-Ebene lebt, bietet der Agent zwei Wege
  an (dort direkt ändern vs. lokale Überschreibung). Wenn ein
  Artefakt noch nicht existiert, fragt er, auf welcher Ebene es
  angelegt werden soll.

Was sich am Sparringpartner geändert hat:

- Dritte Zuständigkeit: Werkbank-Aufbau und Migration. Der
  Sparringpartner kann jetzt eine geteilte Werkbank einrichten und
  bestehende Inhalte Stück für Stück dorthin migrieren. Er geht
  Regeln, Rollen und Aufgaben einzeln durch, fragt den Nutzer
  jeweils inhaltlich ("Gilt das für alle oder nur für dich?"), und
  verschiebt nach Bestätigung. Am Ende: Hygiene-Prüfung beider
  Werkbänke.
- N-Ebenen-Hierarchie. Keine Hardcodierung auf zwei Ebenen.
  Der Sparringpartner kennt Beispiele (nur persönlich, Unternehmen +
  Person, Unternehmen + Abteilung + Person, Projekt-Team + Person)
  und erklärt dem Nutzer, dass die Hierarchie entsteht, wenn er sie
  braucht.
- Migrationsprinzipien: Verschieben statt Kopieren (System-
  entscheidung, keine Nutzerfrage). Nur inhaltliche Fragen stellen.
  Stück für Stück. Nichts allein entscheiden. Nichts ohne
  Bestätigung verschieben.
- Werkbank-Update umgestellt auf Changelog. Der Sparringpartner
  liest jetzt dieses Changelog statt hardcodierter URLs. Trigger
  gestrafft auf "Werkbank updaten" / "Werkbank-Update".
- Kein TN/Werkstatt-Jargon. Die SYSTEM.md ist jetzt
  allgemeingültig formuliert — "Nutzer" statt "TN", keine
  KI-Werkstatt-Bezüge.

KONTEXT.md — empfohlene strukturelle Änderungen:

Diese Änderungen betreffen die KONTEXT.md der Werkbank, in der
Sparringpartner und werkbank.md liegen. Jede einzeln vorlegen und
nach Bestätigung umsetzen.

1. Sparringpartner-Trigger im Rollen-Index erweitern.

Im Rollen-Index der KONTEXT.md (Tabelle unter "## Rollen") den
Trigger-Eintrag des Sparringpartners um die expliziten Update-
Trigger ergänzen. Vorher:

| **Sparringpartner** (Default) | kein anderer Trigger matcht [...], oder Kontext: Werkbank-Mechanik-Frage, Use-Case-Sparring, strategische Frage zum eigenen Vorhaben |

Nachher:

| **Sparringpartner** (Default) | kein anderer Trigger matcht [...], "Werkbank updaten", "Werkbank-Update", oder Kontext: Werkbank-Mechanik-Frage, Use-Case-Sparring, strategische Frage zum eigenen Vorhaben |

2. Werkbank-Hierarchie-Abschnitt (nur bei Mehrebenen-Setup).

Prüfe selbst: Sind in der Session mehrere Werkbank-Verzeichnisse
eingebunden (jeweils mit eigener KONTEXT.md)? Wenn nein: diesen
Abschnitt still überspringen — nicht beim Nutzer nachfragen.

Wenn der Nutzer mehrere Werkbänke hat (z.B. eine geteilte
Unternehmenswerkbank und eine persönliche darüber), empfehle
folgenden Abschnitt in der KONTEXT.md der geteilten Werkbank —
zwischen "Always-Regeln" und "Rollenzwang":

## Werkbank-Hierarchie

Diese Werkbank ist die **Unternehmensebene** — geteilt mit [Scope
hier eintragen, z.B. "der Geschäftsleitung und den Key Execs der
Fachbereiche"]. Darüber können persönliche Werkbänke liegen, die
Einzelnes überschreiben oder ergänzen (z.B. eine wärmere Tonalität,
eigene Rollen, laufendes Controlling). Die Projektanweisung im
CoWork-Projekt definiert die Lesereihenfolge. Spezifischere
Werkbänke überschreiben allgemeinere — still, ohne Warnung. Das ist
kein Fehler, das ist das System.

Wenn der Nutzer nur eine einzelne Werkbank hat, ist dieser Abschnitt
nicht nötig.

3. Rollenzwang-Formulierung (nur bei Mehrebenen-Setup).

Prüfe wie bei Punkt 2: Nur relevant wenn mehrere Werkbänke
eingebunden sind. Wenn nein: still überspringen.

Im Rollenzwang-Block den Hinweis ergänzen, dass auch Rollen aus
überlagernden persönlichen Werkbänken geprüft werden:

Prüfe Trigger gegen den Rollen-Index unten (inklusive der Rollen
aus einer überlagernden persönlichen Werkbank).

Global Instructions — Empfehlung:

Die Global Instructions (Claude Desktop → Einstellungen) sind der
erste Text, den ein Agent sieht — noch vor jeder KONTEXT.md. Damit
die Werkbank zuverlässig funktioniert, empfehlen wir folgenden
Bootstrap-Block. Der Nutzer muss ihn selbst eintragen:

## PFLICHT: Session-Start-Sequenz

BEVOR du auf die erste Nachricht antwortest — egal ob "hallo",
eine Frage, oder ein Auftrag — führe diese Schritte aus. Keine
Ausnahmen. Auch nicht bei Smalltalk.

1. `KONTEXT.md` im Root jedes verbundenen Verzeichnisses lesen
   (Read-Tool aufrufen). Wenn eine Projektanweisung die
   Lesereihenfolge vorgibt, folge dieser.
2. Den dortigen Anweisungen vollständig folgen (Abschnitt
   "Für Agenten" — inklusive Rollen-Load, falls definiert).
3. `date '+%Y-%m-%d %H:%M'` im Terminal aufrufen.

Erst wenn ALLE Schritte abgeschlossen sind, antwortest du. Wenn
du einen Schritt übersprungen hast, ist die Session fehlerhaft
gestartet.

Das ist keine Empfehlung. Das ist eine Vorbedingung.

Hinweis für den Nutzer: "Die genaue Formulierung kannst du
anpassen — die drei Schritte (KONTEXT.md lesen, Anweisungen
folgen, Datum holen) sind das Wesentliche."

Projektanweisung — Empfehlung (nur bei Mehrebenen-Setup):

Prüfe wie oben: Nur relevant wenn mehrere Werkbänke eingebunden
sind. Wenn nein: still überspringen.

Wenn der Nutzer mehrere Werkbänke als getrennte Verzeichnisse in
einem CoWork-Projekt gemountet hat, braucht er eine
Projektanweisung, die die Lesereihenfolge definiert. Beispiel:

## PFLICHT: Lesereihenfolge

Lies die KONTEXT.md-Dateien in dieser Reihenfolge:

1. "[Ordnername Unternehmens-Werkbank]" — Unternehmensebene
2. "[Ordnername persönliche Werkbank]" — Persönliche Werkbank

Kaskade: Spezifischere Werkbänke überschreiben allgemeinere.
Eine Regel, Rolle oder Aufgabe aus Werkbank 2 hat Vorrang vor
derselben aus Werkbank 1.

Die Ordnernamen müssen exakt den Verzeichnisnamen entsprechen,
die im CoWork-Projekt gemountet sind.

Version danach:

Bootstrap-Block in der KONTEXT.md auf v2.0 hochziehen:

> Bootstrap-Info: Diese Werkbank wurde mit der
> Holderbaum-Werkbank-Bauanleitung v2.0 (16.06.2026) angelegt.
> Aktuelle Version und Updates:
> https://holderbaum.io/werkstatt/bauanleitung.txt
