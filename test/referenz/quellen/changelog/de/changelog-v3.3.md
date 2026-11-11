v3.3 (2026-09-20)

Die Projektanweisung schrumpft auf das Nötigste und zieht zurück in
die Bauanleitung. Seit v3.2 lebte sie als eigene Datei mit eigener
URL — für ein paar Zeilen, die für jede Werkbank identisch sind, war
das ein Fetch, ein Fehlerfall und eine Versions-Stelle zu viel. Sie
steht jetzt direkt in SCHRITT 5b der Bauanleitung. Raus geflogen ist
alles, was die Werkbank besser selbst sagt.

Auf deinem Filesystem ändert sich nur der Sparringpartner. Ersetzt
wird sonst nur der Block in den Projektanweisungen deines
Cowork-Projekts.

Dateien ersetzen:

| Datei | URL | Lokaler Pfad |
|-------|-----|-------------|
| Sparringpartner | https://holderbaum.io/werkstatt/bauanleitung/sparringpartner-system.md | Werkbank/Rollen/Sparringpartner/SYSTEM.md |

Geändert ist dort nur Schritt 9 im Ablauf „Werkbank aufteilen": Die
Lesereihenfolge wird nicht mehr in die Projektanweisung nachgetragen,
sondern in die persönliche KONTEXT.md geschrieben. Die
Projektanweisung bleibt für jede Werkbank gleich — was deine
Werkbänke betrifft, gehört in die Werkbank.

Werkbank-Regel und FORMAT.md sind unverändert.

Projektanweisung — Empfehlung:

Ersetze den Block in deinem Cowork-Projekt (Seitenleiste →
Anweisungen → „Projektanweisungen festlegen") vollständig durch den
Block unten. Was sich ändert:

1. **Kürzer.** Der erklärende Vorspann ist raus, und der Abschnitt
   „Diese Anweisung ist fix" auch — das System kann die
   Projektanweisung ohnehin nicht selbst verändern.
2. **Mehrere Werkbänke.** Gelesen wird die `KONTEXT.md` jedes
   verbundenen Verzeichnisses, das eine hat. Welche bei Konflikten
   sticht, steht nicht hier, sondern in deiner KONTEXT.md — nur die
   kennt deine Verzeichnisse.
3. **Datum.** Der Aufruf ist jetzt `date '+%Y-%m-%d %H:%M %A'` — mit
   Uhrzeit und Wochentag. Der Wochentag aus `date` ist die einzige
   verlässliche Quelle; Agenten raten ihn sonst falsch.

Hattest du im alten Block eine eigene Lesereihenfolge stehen,
verschiebe sie in den Abschnitt „Für Agenten" deiner KONTEXT.md.

```markdown
# Werkbank-Projekt

Jeder verbundene Ordner kann eine Werkbank sein: eine eingerichtete
Arbeitsumgebung mit einer `KONTEXT.md` im Root, die die Anleitung zu
dieser Werkbank ist.

## PFLICHT: Session-Start-Sequenz

Vor deiner ersten Antwort — egal ob „hallo", Frage oder Auftrag.
Keine Ausnahmen, auch nicht bei Smalltalk.

1. Lies mit dem Read-Tool die `KONTEXT.md` im Root jedes verbundenen
   Verzeichnisses, das eine hat — nicht aus dem Gedächtnis — und
   folge ihren Anweisungen vollständig.
2. Ruf `date '+%Y-%m-%d %H:%M %A'` im Terminal auf.
```

Version danach:

> Bootstrap-Info: Diese Werkbank wurde mit der
> Holderbaum-Werkbank-Bauanleitung v3.3 (20.09.2026) angelegt.
> Aktuelle Version und Updates:
> https://holderbaum.io/werkstatt/bauanleitung.txt

===== HOLDERBAUM-WERKSTATT · DATEI VOLLSTÄNDIG GELADEN =====
