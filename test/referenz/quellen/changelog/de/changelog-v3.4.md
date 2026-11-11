v3.4 (2026-09-28)

Workflow-Läufe bekommen einen festen, eindeutigen Ort: einen eigenen
Lauf-Ordner unter `Werkbank/protokolle/` in der persönlichen Werkbank
der Person, die den Lauf startet. Er ersetzt `Werkbank/tmp/runs/`.
Dazu legt FORMAT.md fest, wie der Orchestrator diese Werkbank
bestimmt, wenn mehrere Ordner verbunden sind, dass Subagenten nur
absolute Pfade bekommen und dass nach jedem Schritt geprüft wird, ob
die angekündigten Dateien wirklich existieren.

Hintergrund: Der Kladde-Pfad stand bisher nur relativ als
`Werkbank/tmp/runs/…` in FORMAT.md. Subagenten haben ihn selbst zu
einem absoluten Pfad ergänzt — und dabei mehrfach einen anderen
verbundenen Ordner erwischt, der zufällig ebenfalls auf
`Werkbank/tmp` endet. Die Zwischenstände lagen dann außerhalb der
Werkbank, ohne dass es jemand bemerkt hat. Mit geteilten Werkbänken
kommt eine zweite Frage dazu: Ein Workflow liegt in der geteilten
Werkbank, der Lauf gehört aber in die persönliche.

Dateien ersetzen:

| Datei | URL | Lokaler Pfad |
|-------|-----|-------------|
| Workflow-Format | https://holderbaum.io/werkstatt/bauanleitung/format.md | Werkbank/Workflows/FORMAT.md |

Geändert in FORMAT.md:

1. **Schritt-Abnahme (Pflicht)** — neu im Abschnitt „Wie ein Lauf
   funktioniert". Nach jedem Schritt prüft der Orchestrator per `ls`
   auf dem absoluten Pfad, ob jede `schreibt:`-Datei existiert. Fehlt
   eine, geht der Lauf nicht weiter: Der Schritt wird wiederholt oder
   die Lücke am nächsten Halt gemeldet. Damit fällt ein falscher Ort
   sofort auf statt erst Wochen später.
2. **Quelle-Werkbank und Heim-Werkbank** — neuer Unterabschnitt „Wo
   ein Lauf liegt" in „Die drei Zonen". Zwei Anker: `<Quelle>` ist die
   Werkbank, in der der Workflow liegt (nur lesen); `<Heim>` ist die
   persönliche Werkbank der Person, die den Lauf startet (dort liegen
   die Protokolle). Arbeitest du nur mit einer Werkbank, fallen beide
   zusammen — für dich ändert sich an dieser Stelle nichts.
3. **Heim-Bestimmung in fünf Stufen.** Kandidat ist jeder verbundene
   Ordner mit einer `KONTEXT.md` im Root. (1) Genau ein Kandidat →
   `<Heim>`. (2) Kandidaten ohne Schreibrecht fallen raus (`test -w`).
   (3) Persönlich ist, wessen Root-KONTEXT.md die Person selbst
   beschreibt (Abgleich mit Name/Mail aus dem Nutzerkontext) — eine
   Heuristik. (4) Mehrere persönliche und `<Quelle>` ist darunter →
   `<Quelle>`. (5) Sonst Rückfrage, bevor irgendetwas geschrieben
   wird. Eine Kennzeichnung der KONTEXT.md ist dafür nicht nötig. Die
   entscheidende Stufe wird in `lauf.md` festgehalten.
4. **Neuer Lauf-Ordner.** Vorher:

   ```
   Werkbank/tmp/runs/<lauf>-<YYYY-MM-DDThh-mm-ss>/
   └── kladde/
   ```

   Nachher:

   ```
   <Heim>/Werkbank/protokolle/<lauf>-<YYYY-MM-DDThh-mm-ss>/
   ├── lauf.md      ← Heim-Bestimmung (Stufe), Start, Schritte
   ├── kladde/      ← Zwischendateien
   └── ergebnis/    ← Ergebnis, falls der Workflow kein eigenes Ziel deklariert
   ```

   Kein `tmp` mehr im Pfad — die Protokolle sind kein Wegwerfmaterial,
   sondern nachvollziehbare Spur eines Laufs.
5. **Pfad-Übergabe (Pflicht für den Orchestrator).** Zeitstempel
   immer aus `date '+%Y-%m-%dT%H-%M-%S'`, nie selbst gesetzt. Der
   Orchestrator legt den Lauf-Ordner an, bevor der erste Schritt
   startet. An Subagenten gehen ausschließlich absolute Pfade; ein
   relativer Pfad im Subagenten-Auftrag ist ein Formatfehler. Andere
   verbundene Ordner mit ähnlichem Namen sind nie Ort eines Laufs.
6. **Ziel bei geteilten Workflows.** Ein Workflow kennt `<Heim>`
   nicht. Er deklariert sein Ziel als `ergebnis/` im Lauf-Ordner oder
   ausdrücklich als Datenbestand der eigenen Werkbank (`<Quelle>/…`;
   nicht beschreibbar → Halt). Relative Pfade ohne Platzhalter meinen
   `<Quelle>/…`.

Werkbank-Regel und Sparringpartner sind unverändert. In der
Bauanleitung ist für Neuinstallationen nur der Ordner
`Werkbank/protokolle/` in SCHRITT 1 und in der
Verzeichnisstruktur der KONTEXT.md dazugekommen.

Verzeichnis-/KONTEXT.md-Änderungen:

**Bestehende Lauf-Ordner bleiben unangetastet, wo sie sind. Die neue
Regel gilt ab dem nächsten Lauf.**

Die Schritte in diesem Abschnitt sind **empfohlen, nicht zwingend**.
Deine bestehenden Workflows laufen ohne Umbau weiter: `kladde/…` meint
ab jetzt automatisch den neuen Lauf-Ordner. Nur Workflows, die
`Werkbank/tmp/runs/` wörtlich nennen, schreiben weiter an den alten
Ort, bis du sie umstellst.

1. **Ordner anlegen.** Lege `Werkbank/protokolle/` an. (Fehlt er,
   legt ihn der Orchestrator beim ersten Lauf selbst an.)

2. **Verweise in eigenen Workflows umstellen.** Suche in
   `Werkbank/Workflows/` und in `Projekte/*/Workflows/` nach
   `tmp/runs`. Wo ein Workflow damit seinen Kladde-Pfad festlegt —
   typisch im Abschnitt `## Zonen` —, ersetze `Werkbank/tmp/runs/`
   durch `Werkbank/protokolle/`. Damit landen neue Läufe am neuen Ort.

   **Wichtig für den Agenten, der das ausführt:** Dateien in der
   Werkbank mit den Edit-/Write-Werkzeugen ändern, nicht mit
   `perl -i` oder `sed -i` im Terminal. In gemounteten Ordnern ist
   Löschen gesperrt; In-Place-Ersetzen per Terminal hinterlässt dort
   `.fuse_hidden`-Reste, die sich nicht entfernen lassen.

3. **Geteilte Workflows prüfen.** Liegt ein Workflow in einer
   geteilten Werkbank, sollte sein Ziel entweder `ergebnis/` im
   Lauf-Ordner sein oder ausdrücklich `<Quelle>/…`. Ein Ziel, das
   stillschweigend die persönliche Werkbank voraussetzt, gehört
   umgestellt.

4. **Verzeichnisstruktur in der KONTEXT.md ergänzen.** Vorher:

   ```
   Werkbank/
     Regeln/              Leitplanken für das Verhalten von Agenten
     Rollen/              Spezialisten mit eigener Persönlichkeit
     Workflows/           Wiederverwendbare Abläufe (SOPs)
   ```

   Nachher:

   ```
   Werkbank/
     Regeln/              Leitplanken für das Verhalten von Agenten
     Rollen/              Spezialisten mit eigener Persönlichkeit
     Workflows/           Wiederverwendbare Abläufe (SOPs)
     protokolle/          Lauf-Ordner der Workflows (Kladde, Ergebnis)
   ```

Läufe, die vor dem Update begonnen haben, laufen am alten Ort zu Ende;
ab dem nächsten Lauf gilt der neue Ort. Nichts umziehen.

Version danach:

> Bootstrap-Info: Diese Werkbank wurde mit der
> Holderbaum-Werkbank-Bauanleitung v3.4 (28.09.2026) angelegt.
> Aktuelle Version und Updates:
> https://holderbaum.io/werkstatt/bauanleitung.txt

===== HOLDERBAUM-WERKSTATT · DATEI VOLLSTÄNDIG GELADEN =====
