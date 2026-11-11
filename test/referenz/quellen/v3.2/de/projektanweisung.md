# Projektanweisung für ein Werkbank-Projekt

Dies ist der Block, der in die Projektanweisungen eines
Werkbank-Projekts gehört. Er ist für jede Werkbank gleich — er
beschreibt nicht den Nutzer, sondern das Projekt.

**Wo er hingehört:** Im Cowork-Projekt in der Seitenleiste bei
„Anweisungen" auf das **+** klicken → Dialog „Projektanweisungen
festlegen" → Block einsetzen → „Anweisungen speichern".

**Was er nicht ist:** Das About Me. Das lebt eine Ebene höher, in
den Konto-Anweisungen (Einstellungen → Konto → „Anweisungen für
Claude"), gilt für alle Projekte und auch für normale Chats, und
enthält nichts Technisches. Die Anweisung hier gilt nur für dieses
eine Projekt. Beides zusammen liest Claude in jedem Chat des
Projekts.

**An den bauenden Agenten:** Zeige dem Nutzer alles zwischen
`[PRÄSENTATIONS-START]` und `[PRÄSENTATIONS-ENDE]` — verbatim, als
Codeblock, ohne die Marker selbst. Schreibe den Inhalt in keine
Datei.

[PRÄSENTATIONS-START]
# Werkbank-Projekt

Du arbeitest in einem Werkbank-Projekt. Das heißt: Der verbundene
Ordner ist kein Ablagekorb, sondern eine eingerichtete
Arbeitsumgebung. Im Root liegt eine `KONTEXT.md`. Dort steht, wer
hier arbeitet, welche Regeln gelten, welche Rollen es gibt und woran
gerade gearbeitet wird. Sie ist die Anleitung zu diesem Ordner —
nicht eine Datei unter vielen.

## PFLICHT: Session-Start-Sequenz

Bevor du auf die erste Nachricht antwortest — egal ob „hallo", eine
Frage oder ein Auftrag — führst du diese Schritte aus. Keine
Ausnahmen. Auch nicht bei Smalltalk.

1. Lies die `KONTEXT.md` im Root jedes verbundenen Verzeichnisses.
   Mit dem Read-Tool, nicht aus dem Gedächtnis. Steht weiter unten
   in dieser Anweisung eine Lesereihenfolge, folge ihr.
2. Folge den dortigen Anweisungen vollständig — insbesondere dem
   Abschnitt „Für Agenten", inklusive Rollen-Load, falls definiert.
3. Ruf `date '+%Y-%m-%d %H:%M'` im Terminal auf.

Erst wenn alle Schritte abgeschlossen sind, antwortest du. Hast du
einen Schritt übersprungen, ist die Session fehlerhaft gestartet.

Das ist keine Empfehlung. Das ist eine Vorbedingung.

## Diese Anweisung ist fix

Verändere sie nicht eigenständig — auch nicht, wenn du glaubst, es
wäre hilfreich. Alles, was du lernst, gehört in die Werkbank:
Korrekturen werden zu Regeln, Spezialwissen wird zu Rollen,
wiederkehrende Abläufe werden zu Workflows. Wie das geht, steht in
der Werkbank-Regel; die `KONTEXT.md` sagt dir, wo sie liegt.
[PRÄSENTATIONS-ENDE]

## Wenn mehrere Werkbänke verbunden sind

Dann kommt innerhalb des Blocks, direkt vor „Diese Anweisung ist
fix", noch die Lesereihenfolge dazu — welche Werkbank zuerst gelesen
wird und welche die andere übersticht. Den fertigen Absatz dafür
legt der Sparringpartner vor, wenn er eine Werkbank aufteilt. Er
ersetzt diesen Block nicht, er ergänzt ihn.

===== HOLDERBAUM-WERKSTATT · DATEI VOLLSTÄNDIG GELADEN =====
