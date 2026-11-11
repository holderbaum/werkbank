v2.3 (2026-06-24)

Der Sparringpartner kann jetzt Aufgaben (SOPs) im neuen
Aufgaben-Format bauen — einer deklarativen Spec, die ein Agent
direkt ausfuehrt. Bisher hat er Aufgaben nur grob als "Trigger,
Schritte, Ergebnis" angelegt. Neu fuehrt er den Nutzer rueckwaerts
vom Ergebnis durch die Komposition und erzeugt eine vollstaendige,
ausfuehrbare Spec — ohne ihn mit Notation zu belasten.

Neues Artefakt: FORMAT.md (die Grammatik der Aufgaben). Liegt
kuenftig in jeder Werkbank unter Werkbank/Aufgaben/FORMAT.md und
wird vom Sparringpartner als Bezug genutzt.

Dateien ersetzen / hinzufuegen:

| Datei | URL | Lokaler Pfad |
|-------|-----|-------------|
| Sparringpartner | https://holderbaum.io/werkstatt/bauanleitung/sparringpartner-system.md | Werkbank/Rollen/Sparringpartner/SYSTEM.md |
| Aufgaben-Format (neu) | https://holderbaum.io/werkstatt/bauanleitung/format.md | Werkbank/Aufgaben/FORMAT.md |

Was sich am Sparringpartner geaendert hat:

- Neue Sektion "Eine Aufgabe komponieren": Rueckwaerts-Interview
  vom Deliverable, die drei sonst durchrutschenden Punkte
  (Mensch-Halte, Uebergaben zwischen Schritten, Anspruch/Modell-
  staerke) werden in Klartext erzwungen; zwei Ausgabe-Ebenen
  (Spec + "Was dein Agent tut"-Klartext); iteratives Schaerfen
  per Testlauf.
- Beispiel "Controlling-Sheet" auf das neue Verfahren umgestellt.

KONTEXT.md — empfohlene Aenderung:

- Falls noch nicht vorhanden: Verzeichnis Werkbank/Aufgaben/ anlegen
  und FORMAT.md dort ablegen. Kein neuer Index-Block noetig — der
  Sparringpartner traegt gebaute Aufgaben selbst in den Aufgaben-
  Index der KONTEXT.md ein.
