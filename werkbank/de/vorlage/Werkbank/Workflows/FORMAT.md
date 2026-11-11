<!-- HOLDERBAUM-WERKSTATT · format · v5.0 -->
# Workflow-Format — Ausführen

Die Grammatik, nach der ein Agent einen Workflow fährt. Ein Workflow ist eine Markdown-Datei, die
der Agent direkt liest. Dazu bei Bedarf:
- Workflows **schreiben** oder ändern → [[Werkbank/Workflows/FORMAT-schreiben.md]]
- Lauf im **Plan-Modus** → [[Werkbank/Workflows/FORMAT-plan-modus.md]]
- **mehr als eine Werkbank** verbunden → [[Werkbank/Workflows/FORMAT-mehrere-werkbaenke.md]]
- Gibt es `Werkbank/Workflows/FORMAT-lokal.md`: immer zusätzlich lesen; bei Widerspruch gilt sie.

`<Zone>` ist die Zeitzone aus der KONTEXT.md (Always-Regeln). Jede Zeit, die ein Lauf schreibt oder
vergleicht, entsteht mit `TZ=<Zone>`.

## Wie ein Lauf funktioniert

Ein **Orchestrator** arbeitet die Schritte der Reihe nach ab. Jeden Schritt führt ein **frischer
Subagent** aus: Er sieht nur, was im `liest:` des Schritts steht, und legt seine Ergebnisse als
Dateien ab (`schreibt:`). `liest:` und `schreibt:` sind der Vertrag.

**Kein Schritt im Orchestrator.** Der Orchestrator legt den Lauf-Ordner an und schreibt `lauf.md`
fort, übergibt Eingaben, nimmt ab, legt Halte vor und reicht Chat-Ausgaben weiter. Sonst nichts —
auch keine Nachbesserung an einer `schreibt:`-Datei: Korrigieren ist ein neuer Durchlauf des
Schritts im frischen Subagenten, mit dem Befund in `liest:`. Ein Schritt, dessen Ergebnis eine
Chat-Nachricht ist, schreibt sie als Kladde-Datei; der Orchestrator gibt sie unverändert aus.

**Eingaben aus dem Chat.** Liegt eine Eingabe nur im Gespräch (eingefügter Text, Korrektur,
Änderungswunsch am Halt), legt der Orchestrator sie wörtlich als `kladde/eingabe-<name>.md` ab und
gibt den absoluten Pfad an den Schritt, der sie braucht.

**Kein Subagent startbar → Halt.** Beim Start prüfen, ob Subagenten mit Modellwahl startbar sind.
Nein — oder scheitert ein Start später: Der Lauf hält vor dem Schritt, Zeile in der Schritt-Tabelle
`nicht gestartet — kein Subagent startbar`, Meldung an den Menschen (im Plan-Modus unter `## Fragen`).
Kein Ersatz durch eigene Ausführung, kein Selbst-Review im Prüfschritt. Weiter nur in einer
Umgebung mit Subagenten oder auf ausdrückliche Anweisung des Menschen für genau diesen Lauf — die
Anweisung wörtlich in die Schritt-Tabelle.

**Rolle.** Nennt der Workflow eine (Frontmatter `rolle:` oder am Schritt), lädt der Subagent sie.
Nennt er keine, wird keine geladen — der Workflow ist der Arbeitsmodus.

**Anspruch → Modell.** Handgriff → schnelles Modell (z. B. haiku). Urteil → Standard (sonnet).
Fachurteil → stärkstes (opus). Abweichung nur auf Anweisung des Menschen, mit Zitat.

## Lauf-Ordner

```
Werkbank/protokolle/<workflow>-<JJJJ-MM-TTThh-mm-ss>-<6 Zeichen>/
├── lauf.md       Start, Plan-Modus an/aus, Schritt-Tabelle, Ergebnis
├── kladde/       Zwischendateien, Eingaben
└── ergebnis/     Ergebnis, falls der Workflow kein eigenes Ziel nennt
```

- Zeitstempel: `TZ=<Zone> date '+%Y-%m-%dT%H-%M-%S'`. Sechs Zeichen:
  `LC_ALL=C tr -dc 'a-z0-9' </dev/urandom | head -c 6`. Anlegen mit `mkdir` **ohne** `-p` — existiert
  der Ordner schon, neue Zeichen ziehen.
- Der Orchestrator legt ihn vor dem ersten Schritt an. Startzeit in `lauf.md` als
  `TZ=<Zone> date '+%Y-%m-%d %H:%M:%S'`. Am Ende eine Zeile `Ergebnis: <ein Satz>`.
- An Subagenten gehen **nur absolute Pfade**. `kladde/…` im Workflow meint die Kladde dieses Laufs.

**Schritt-Tabelle** in `lauf.md`, eine Zeile je gestartetem Schritt, direkt nach dessen Ende:

| Schritt | Anspruch | Modell | Subagent-ID | schreibt:-Dateien | Abnahme |
|---|---|---|---|---|---|

Subagent-ID ist die Kennung aus dem Start des Subagenten. Leer, „Orchestrator", „selbst" oder
dieselbe ID in zwei Zeilen sind Formatfehler. Fan-out: alle IDs in die Zeile. Wiederholungen
bekommen eine eigene Zeile (`2 (2)`).

## Dateien ändern

Nur in place: read-modify-write auf dieselbe Datei oder `sed -i`. Keine `*.tmp`-, `*.new`-,
`*.bak*`-Kopien, kein Tausch per `mv`. **Gelöscht wird nichts** (Löschen in einer Werkbank ist
endgültig): Braucht ein Schritt eine Löschung, meldet er sie als Frage. Diese Zeile geht wörtlich in
jeden Subagenten-Auftrag, der in die Werkbank schreibt:

> Dateien nur in place ändern (read-modify-write oder `sed -i`); keine `*.tmp`-/`*.new`-/`*.bak*`-Kopien, kein Tausch per `mv`, nichts löschen — Löschbedarf als Frage melden.

## Schritt-Abnahme

Nach jedem Schritt prüft der Orchestrator:
1. Jede `schreibt:`-Datei existiert (`ls` auf dem absoluten Pfad).
2. Die Zeile in der Schritt-Tabelle: vorhanden, Subagent-ID gültig, Modell passt zum Anspruch.
3. Keine Restdateien: je Ordner einer `schreibt:`-Datei liefert
   `TZ=<Zone> find "<Ordner>" -maxdepth 1 -newermt "<Start>" \( -name '*.tmp' -o -name '*.new' -o -name '*.bak*' \)`
   nichts.
4. Im Plan-Modus: kein Original berührt (Prüfung in [[Werkbank/Workflows/FORMAT-plan-modus.md]]).

Fällt (1) oder (2) durch: Schritt im frischen Subagenten wiederholen (verbraucht kein Budget einer
Korrekturschleife) oder die Lücke am nächsten Halt melden. Ein Treffer bei (3) oder (4) wird weder
gelöscht noch durch Wiederholung geheilt: Abnahme `✗ <Befund> <Pfad>`, der Lauf hält, Meldung als
Frage. Alles bestanden: `✓`.

## Zonen

| Zone | Heißt | Wer schreibt |
|------|-------|--------------|
| **Quelle** | Material, das nur gelesen wird | niemand |
| **Kladde** | Arbeitsbereich dieses Laufs | jeder Schritt |
| **Ziel** | das fertige Ergebnis | nur die letzten Schritte, erst nach Freigabe |

## Schrittarten

- **Normaler Schritt** — erzeugt oder aktualisiert eine Datei.
- **PRÜFSCHRITT** — urteilt und kann zurückspringen.
- **Halt — DU BIST DRAN** — ein Mensch entscheidet, der Lauf wartet. **(kritisch)** = nie
  übersprungen. Zweistufig: erst **eine** Nachricht mit dem ganzen entscheidungsrelevanten Inhalt
  (kleines vollständig, großes als entscheidungsreife Zusammenfassung plus Verweis), dann die Frage.
  `legt vor:` heißt im Chat zeigen. Eine Frage vor dem Inhalt ist ein Formatbruch.

**Korrekturschleife.** `↻ Korrekturschleife: Schritte 4–7 · höchstens 2 Durchläufe · danach →
Halt 2`. Jeder Rücksprung eines Prüfschritts im Block verbraucht einen Durchlauf des gemeinsamen
Budgets; erschöpft → alle offenen Befunde an den genannten Halt. Schickt der Mensch die Arbeit
zurück, beginnt ein frisches Budget.

**Außenwirkung und Ziel (⚠).** Ein Schritt mit ⚠ wirkt außerhalb der Kladde — ins Ziel, in eine
Mail, in ein Fremdsystem — und läuft nur nach dem Halt, der ihn freigibt. Fehlt der Ziel-Ordner,
legt der Schritt ihn an.

## Aufgerufener Workflow

Ruft ein Schritt einen anderen Workflow auf (`nutzt:` …), steuert der Orchestrator des Aufrufers
dessen Schritte selbst: jeder in einem frischen Subagenten, eigener Lauf-Ordner, eigene
Schritt-Tabelle. Die Zeile des aufrufenden Schritts ist die Klammer: Subagent-ID
`Klammer → <Lauf-Ordner des aufgerufenen Workflows>`; abgenommen, wenn dessen `lauf.md` je Schritt
`✓` oder einen Halt führt. Was der Schritt vor oder nach dem Aufruf selbst tut, läuft je in einem
eigenen Subagenten (`2 (vor)`, `2 (nach)`). Läuft der Aufrufer im Plan-Modus, läuft der
aufgerufene Workflow auch darin. Ein Subagent startet nie einen Workflow.
===== HOLDERBAUM-WERKSTATT · DATEI VOLLSTÄNDIG GELADEN =====
