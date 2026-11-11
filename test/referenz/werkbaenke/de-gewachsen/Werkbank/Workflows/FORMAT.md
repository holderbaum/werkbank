# Aufgaben-Format

Dies ist die **Grammatik**, in der jeder Workflow (SOP) geschrieben ist. Wer das Format einmal
gelesen hat, kann jeden Workflow lesen — der einzelne Workflow erklärt das Format nicht noch einmal.

Ein Workflow ist eine **menschenlesbare Markdown-Datei** und zugleich die Anweisung, nach der ein
Agent den Lauf fährt. Kein Compiler, kein YAML, keine zweite Schicht — der Agent liest die Datei
direkt.

---

## Wie ein Lauf funktioniert

Ein schlanker **Orchestrator** liest den Workflow und arbeitet die Schritte der Reihe nach ab. Jeden
Schritt führt er in einem **frischen Subagenten** aus — der sieht nur, was im `liest:` des Schritts
steht, und legt seine Ergebnisse als Dateien ab (`schreibt:`). Nichts leckt zwischen den Schritten
durch, was nicht ausdrücklich übergeben wird — `liest:` und `schreibt:` sind der **Vertrag**.

Der Orchestrator selbst macht keine Facharbeit; er sequenziert, fährt die Rücksprünge bei
Prüfschritten und legt dem Menschen die Halte vor. Den vollen Formattext braucht nur der
Orchestrator — die Subagenten der einzelnen Schritte kriegen ihre Anweisung plus ihre
Eingabedateien.

## Die drei Zonen

| Zone | Heißt | Wer darf reinschreiben |
|------|-------|------------------------|
| **Quelle** | Material, das nur gelesen wird (Engagement-Ordner, Vorlagen, Antragsdaten). | niemand |
| **Kladde** | Der Arbeitsbereich *dieses* Laufs. Zwischenergebnisse sind echte, lesbare Dateien — keine unsichtbaren Variablen. | jeder Schritt |
| **Ziel** | Das fertige Ergebnis (z. B. ein `Deliverables/`-Ordner). | nur die letzten Schritte, **erst nach menschlicher Freigabe** |

Die Kladde liegt in einem eigenen Lauf-Ordner mit sekundengenauem Zeitstempel, damit mehrere Läufe
am selben Tag sich nicht überschreiben:

```
Werkbank/tmp/runs/<lauf>-<YYYY-MM-DDThh-mm-ss>/   ← Heimat des Laufs
├── kladde/                                        ← der Schmierzettel (Zwischendateien)
└── (Platz für anderes Laufzeug, z. B. ein Lauf-Log)
```

In einem Workflow meint `kladde/…` eine Datei im `kladde/`-Ordner dieses Laufs.

## Anatomie eines Schritts

Jeder Schritt besteht aus einer **Überschrift** (Klartext-Name), einem **Intent-Satz** (was passiert
— für den Menschen) und einer *kursiven Zeile* (für die Ausführung):

> ### 1. Stammdaten sichten
> Zieht die Firmendaten aus den Quellen zusammen.
> *Anspruch: Handgriff · nutzt: Web (nur bei Lücken)*
> - **liest:** …
> - **schreibt:** `kladde/stammdaten.md` — *Form:* …
> - **Auftrag / Regeln / Achte auf:** … (nach Bedarf, in Klartext)

Bei `schreibt:` steht hinter der Datei kurz ihre **Form** (Tabelle mit Spalten X|Y|Z; Datenblatt
mit Feldern …), damit der nächste Schritt weiß, was er bekommt.

### Anspruch (was der Schritt verlangt → steuert die Modellstärke)

- **Handgriff** — einfache Aktion: ein Tool laufen lassen, eine Datei ablegen, Häkchen gegen eine feste Liste setzen.
- **Urteil** — echte Synthese: viel Kontext aufnehmen, abwägen, Qualitätstext erzeugen.
- **Fachurteil** — Experten-Urteil mit geringer Fehlertoleranz und hoher Konsequenz (z. B. Recht, Außenwirkung).

### nutzt (optional — was der Subagent in die Hand nimmt)

Ein Skript, einen Connector, das Web, oder **einen anderen Workflow** (auch mehrfach parallel, siehe
Fan-out). Steht nichts, arbeitet der Subagent nur mit seinen Eingaben.

### Rolle (optional)

Ein Schritt kann **in einer definierten Rolle** laufen — der Subagent lädt sie und arbeitet aus
ihrer Haltung heraus. Steht als eigene Angabe am Schritt (`Rolle: …`) oder, wenn der ganze Workflow
in einer Rolle läuft, im Frontmatter (`rolle: …`).

## Drei Arten von Schritten

- **Normaler Schritt** — erzeugt oder aktualisiert eine Datei.
- **PRÜFSCHRITT** — prüft ein Ergebnis, fällt ein Urteil und kann **zurückspringen** („bei Mängeln → zurück in die Korrekturschleife"). Siehe unten.
- **Halt — DU BIST DRAN** — ein Mensch entscheidet. Der Lauf hält und wartet. Mit **(kritisch)** markiert = wird nie übersprungen (z. B. vor Außenwirkung oder einem Behördendokument). **Ein Halt gibt seinen Inhalt zuerst im Chat aus** — bei kleinen Artefakten vollständig (die Tabelle, die Warnungen im Klartext), bei großen eine entscheidungsreife Zusammenfassung plus Verweis auf die Datei. *Dann* erst die Frage. `legt vor:` heißt „im Gespräch zeigen", nicht „den Dateinamen nennen" — der Mensch muss entscheiden können, ohne eine Datei zu öffnen. Der Ablauf ist **zwingend zweistufig und in dieser Reihenfolge**: (1) **eine** Chat-Nachricht mit dem vollständigen entscheidungsrelevanten Inhalt (bei großen Artefakten die entscheidungsreife Zusammenfassung) — *keine bloße Kurzfassung als Platzhalter*; (2) **erst danach** die Frage. Eine Frage oder ein Auswahl-Pop-up, bevor der volle Inhalt im Chat steht, ist ein Format-Bruch. Wird ein Pop-up genutzt, kommt es ausschließlich nach Stufe (1) — nie davor, nie statt des Inhalts.

## Korrekturschleife

Wenn ein oder mehrere Prüfschritte denselben Block korrigieren lassen, wird der Block als
**Korrekturschleife** deklariert — mit *einem gemeinsamen* Budget und einem festen Ausgang. Notation:
eine eigene Zeile direkt vor dem ersten Schritt des Blocks:

```
↻ Korrekturschleife: Schritte 4–7 · höchstens 2 Durchläufe · danach → Halt 2
```

Regeln:

- Jeder Prüfschritt im Block, der zurückspringt, verbraucht **einen** Durchlauf des gemeinsamen Budgets — egal welcher Prüfschritt. So multiplizieren sich verschachtelte Schleifen nicht.
- Ist das Budget erschöpft, springt nichts mehr zurück; alle offenen Befunde gehen an den genannten Halt.
- Schickt ein Mensch an einem Halt die Arbeit erneut in den Block, beginnt ein **frisches** Budget — der Mensch ist der Backstop.
- Prüfschritte tragen **keine** eigene Grenze; sie zeigen nur in den Loop: „bei Mängeln → zurück in die Korrekturschleife (Schritt N)."

## Parallele Ausführung (Fan-out)

Ein Schritt darf seine Arbeit auf mehrere Subagenten aufteilen, die **parallel** laufen — typisch
einer je Element (z. B. je Sitzung). Das steht in der `nutzt`-Zeile („mehrere Subagenten parallel,
einer je …"). Der Schritt beschreibt dann zweierlei: was *ein* Teil-Agent tut, und wie die
Teil-Ergebnisse zusammengeführt werden. **Jeder Teil-Agent schreibt in seine eigene Teildatei; der
Schritt führt sie am Ende zusammen** — nie schreiben mehrere gleichzeitig in dieselbe Datei.

## Außenwirkung

Alles, was **außerhalb der Dateien** wirkt — ein Fremdsystem beschreiben, eine Mail, ein Eintrag in
einem Tool — wird mit **⚠** markiert. So ist auf einen Blick klar, wo ein Schritt die Welt verändert
und nicht nur die Kladde.

## Self-contained

Ein Workflow steht für sich — alles, worauf er sich stützt, ist **sichtbar benannt**:

- **Erlaubt:** benannte Eingaben (Templates, Daten, Wissensquellen), Werkzeuge (Skripte, Connectoren), das Laufen *in einer Rolle*, und das Instanziieren anderer Workflows (auch parallel als Fan-out).
- **Verboten:** das Verlassen auf Werkbank-*Betriebsregeln* (das Ambient-Regelsystem, das im Hintergrund feuert). Solche Regeln leben auf einer anderen Ebene; Nötiges trägt der Workflow stattdessen inline.

FORMAT.md selbst ist die Grammatik, keine Abhängigkeit.

## Die menschliche Leseebene

Jeder Workflow trägt oben zwei kurze, **task-spezifische** Abschnitte für den Besitzer:

- **„Was dein Agent tut"** — der Lauf in Klartext, nennt die Halte und was ohne den Menschen nie passiert.
- **„Worauf es ankommt"** — die wenigen Dinge, an denen die Qualität hängt.

Alles **Generische** (dieser Text hier) gehört nicht in den einzelnen Workflow — es lebt hier, einmal.

## Skelett eines Workflows

```
---
name: …
version: …
status: …
rolle: …            (falls der ganze Workflow in einer Rolle läuft)
template: …          (falls der Workflow ein festes Template füllt)
---

# Titel
Ein-Satz-Zweck.

## Was dein Agent tut         (Klartext-Überblick, nennt die Halte)
## Worauf es ankommt          (die Qualitäts-Hebel)
## Trigger
## Bevor es losgeht           (Voraussetzungen)
## Zonen                      (die konkreten Quelle-/Kladde-/Ziel-Pfade dieses Workflows)

## Die Schritte
### 1. …                      (Intent-Satz · kursive Anspruch-Zeile · liest/schreibt/Auftrag)
### Halt 1 — … · DU BIST DRAN
↻ Korrekturschleife: …        (falls Prüfschritte zurückspringen)
### 2. …
…

## Referenz                   (task-spezifische Checklisten, Quellen)
```
===== HOLDERBAUM-WERKSTATT · DATEI VOLLSTÄNDIG GELADEN =====

## Plan-Modus (eigen)

Eine Aufgabe, die Datenbestand schreibt, kann im Plan-Modus laufen. Jedes Schreiben geht nach
`kladde/plan/<pfad>`. Sonderfall Buchhaltung: `kladde/plan/Buchhaltung/…` ist die Plan-Kopie von
`<Buchhaltungs-Werkbank>/Buchhaltung/…`. Am Ende `plan.md` und `schluss.md` mit `## Vorschläge`.

## Zeitzonen-Check (eigen)

Nach jedem Schritt: `python3 Werkbank/tools/zeitzonen-check.py <Lauf-Ordner>/kladde` endet mit Exit 0.
Zeitstempel immer mit `TZ=Europe/Vienna`.

## Änderungen

- 2026-10-01: Pflicht Nummer 1 nach einem Vorfall ergänzt (Lauf 1).
- 2026-10-02: Pflicht Nummer 2 nach einem Vorfall ergänzt (Lauf 2).
- 2026-10-03: Pflicht Nummer 3 nach einem Vorfall ergänzt (Lauf 3).
- 2026-10-04: Pflicht Nummer 4 nach einem Vorfall ergänzt (Lauf 4).
- 2026-10-05: Pflicht Nummer 5 nach einem Vorfall ergänzt (Lauf 5).
- 2026-10-06: Pflicht Nummer 6 nach einem Vorfall ergänzt (Lauf 6).
- 2026-10-07: Pflicht Nummer 7 nach einem Vorfall ergänzt (Lauf 7).
- 2026-10-08: Pflicht Nummer 8 nach einem Vorfall ergänzt (Lauf 8).
- 2026-10-09: Pflicht Nummer 9 nach einem Vorfall ergänzt (Lauf 9).
- 2026-10-10: Pflicht Nummer 10 nach einem Vorfall ergänzt (Lauf 10).
- 2026-10-11: Pflicht Nummer 11 nach einem Vorfall ergänzt (Lauf 11).
- 2026-10-12: Pflicht Nummer 12 nach einem Vorfall ergänzt (Lauf 12).
- 2026-10-13: Pflicht Nummer 13 nach einem Vorfall ergänzt (Lauf 13).
- 2026-10-14: Pflicht Nummer 14 nach einem Vorfall ergänzt (Lauf 14).
- 2026-10-15: Pflicht Nummer 15 nach einem Vorfall ergänzt (Lauf 15).
- 2026-10-16: Pflicht Nummer 16 nach einem Vorfall ergänzt (Lauf 16).
- 2026-10-17: Pflicht Nummer 17 nach einem Vorfall ergänzt (Lauf 17).
- 2026-10-18: Pflicht Nummer 18 nach einem Vorfall ergänzt (Lauf 18).
- 2026-10-19: Pflicht Nummer 19 nach einem Vorfall ergänzt (Lauf 19).
- 2026-10-20: Pflicht Nummer 20 nach einem Vorfall ergänzt (Lauf 20).
