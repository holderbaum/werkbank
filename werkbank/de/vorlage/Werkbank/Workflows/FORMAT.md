<!-- HOLDERBAUM-WERKSTATT · format · v5.0 -->
# Workflow-Format — Ausführen

Die Grammatik, nach der ein Agent einen Workflow fährt. Ein Workflow ist eine Markdown-Datei, die
der Agent direkt liest. Workflows **schreiben** oder ändern: zusätzlich
[[Werkbank/Workflows/FORMAT-schreiben.md]].

## Wie ein Lauf funktioniert

Ein schlanker **Orchestrator** arbeitet die Schritte der Reihe nach ab. Jeden Schritt führt ein
**frischer Subagent** aus: Er sieht nur, was im `liest:` des Schritts steht, und legt seine
Ergebnisse als Dateien ab (`schreibt:`). `liest:` und `schreibt:` sind der Vertrag — nichts sonst
geht von Schritt zu Schritt. Der Orchestrator macht keine Facharbeit: Er sequenziert, fährt
Rücksprünge und legt die Halte vor. Subagenten bekommen ihre Anweisung und ihre Eingabedateien,
nicht diesen Text.

**Ohne Subagenten-Werkzeug** führt der Orchestrator die Schritte selbst aus — je Schritt nur mit den
`liest:`-Dateien als Grundlage, nicht aus dem Gedächtnis früherer Schritte. Ein Prüfschritt rechnet
dann gegen die Quelle nach. In `lauf.md` vermerken.

**Rolle:** Nennt der Workflow eine (Frontmatter `rolle:`), wird sie geladen; nennt er keine, wird
keine geladen — der Workflow ist der Arbeitsmodus.

**Schritt-Abnahme (Pflicht):** Nach jedem Schritt per `ls` auf dem absoluten Pfad prüfen, ob jede
`schreibt:`-Datei existiert. Fehlt eine: Schritt wiederholen oder die Lücke am nächsten Halt melden.

## Zonen und Lauf-Ordner

| Zone | Heißt | Wer schreibt |
|------|-------|--------------|
| **Quelle** | Material, das nur gelesen wird | niemand |
| **Kladde** | Arbeitsbereich dieses Laufs, Zwischenergebnisse als echte Dateien | jeder Schritt |
| **Ziel** | das fertige Ergebnis | nur die letzten Schritte, erst nach menschlicher Freigabe |

Jeder Lauf bekommt einen eigenen Ordner in der Werkbank:

```
Werkbank/protokolle/<workflow>-<JJJJ-MM-TTThh-mm-ss>/
├── lauf.md       Start, Schritte, Abnahmen
├── kladde/       Zwischendateien
└── ergebnis/     Ergebnis, falls der Workflow kein eigenes Ziel nennt
```

- Zeitstempel aus `date '+%Y-%m-%dT%H-%M-%S'`, nie selbst setzen. Den Ordner legt der Orchestrator
  vor dem ersten Schritt an.
- An Subagenten gehen **nur absolute Pfade**. `kladde/…` im Workflow meint die Kladde dieses Laufs.
- Ist mehr als eine Werkbank verbunden: vor dem Anlegen
  [[Werkbank/Workflows/FORMAT-mehrere-werkbaenke.md]] lesen — dort steht, in welche Werkbank der
  Lauf-Ordner gehört.

## Einen Schritt lesen

```
### 1. Stammdaten sichten
Zieht die Firmendaten aus den Quellen zusammen.
*Anspruch: Handgriff · nutzt: Web (nur bei Lücken) · Rolle: …*
- liest: …
- schreibt: `kladde/stammdaten.md` — Form: …
- Auftrag / Regeln / Achte auf: …
```

- **Anspruch** steuert die Modellstärke des Subagenten: **Handgriff** (einfache Aktion) → schnelles
  Modell. **Urteil** (Synthese, Qualitätstext) → Standard. **Fachurteil** (Experte, hohe
  Konsequenz, z. B. Recht oder Außenwirkung) → stärkstes Modell.
- **nutzt:** Skript, Konnektor, Web oder ein anderer Workflow. Steht dort „mehrere Subagenten
  parallel, einer je …", schreibt jeder Teil-Agent in eine eigene Teildatei; der Schritt führt sie
  zusammen.
- **Rolle:** Der Subagent lädt diese Rolle. `rolle:` im Frontmatter gilt für den ganzen Workflow.

## Schrittarten

- **Normaler Schritt** — erzeugt oder aktualisiert eine Datei.
- **PRÜFSCHRITT** — urteilt und kann zurückspringen.
- **Halt — DU BIST DRAN** — ein Mensch entscheidet, der Lauf wartet. **(kritisch)** = wird nie
  übersprungen. Ablauf zwingend zweistufig: erst **eine** Nachricht mit dem ganzen
  entscheidungsrelevanten Inhalt (kleine Ergebnisse vollständig, große als entscheidungsreife
  Zusammenfassung plus Verweis), dann die Frage. `legt vor:` heißt im Chat zeigen, nicht den
  Dateinamen nennen. Eine Frage oder ein Auswahl-Pop-up vor dem Inhalt ist ein Formatbruch.
  Änderungswünsche am Halt schreibt der Orchestrator wörtlich nach `kladde/halt-<N>.md`; der Schritt,
  der sie umsetzt, liest diese Datei.

**Korrekturschleife.** `↻ Korrekturschleife: Schritte 4–7 · höchstens 2 Durchläufe · danach →
Halt 2`. Jeder Rücksprung eines Prüfschritts im Block verbraucht einen Durchlauf des gemeinsamen
Budgets. Ist es erschöpft, gehen alle offenen Befunde an den genannten Halt. Schickt der Mensch die
Arbeit zurück in den Block, beginnt ein frisches Budget.

**Außenwirkung und Ziel (⚠).** Ein Schritt mit ⚠ wirkt außerhalb der Kladde — ins Ziel, in eine
Mail, in ein Fremdsystem — und läuft nur nach dem Halt, der ihn freigibt. Fehlt der Ziel-Ordner,
legt der Schritt ihn an.
===== HOLDERBAUM-WERKSTATT · DATEI VOLLSTÄNDIG GELADEN =====
