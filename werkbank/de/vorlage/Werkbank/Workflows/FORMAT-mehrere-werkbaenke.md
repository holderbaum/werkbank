<!-- HOLDERBAUM-WERKSTATT · format-mehrere · v5.0 -->
# Workflow-Format — mehrere Werkbänke

Gelesen nur, wenn beim Laufstart mehr als eine Werkbank verbunden ist. Ergänzt
[[Werkbank/Workflows/FORMAT.md]].

Ein Workflow liegt nicht zwingend in der Werkbank, für die er läuft — ein geteilter Workflow liegt in
der geteilten Werkbank, läuft aber für eine Person. Deshalb zwei Anker:

- **`<Quelle>`** — die Werkbank, in der der Workflow liegt. Vorlagen, Referenzen und der Workflow
  selbst werden relativ dazu aufgelöst. Nur lesen.
- **`<Heim>`** — die persönliche Werkbank der Person, die den Lauf startet. Dort liegt der
  Lauf-Ordner (`<Heim>/Werkbank/protokolle/…`).

**`<Heim>` bestimmen** — in dieser Reihenfolge, das erste eindeutige Ergebnis gilt. Kandidat ist
jeder verbundene Ordner mit einer KONTEXT.md im Root.

1. Genau ein Kandidat → der.
2. Kandidaten ohne Schreibrecht fallen raus (`test -w`). Bleibt genau einer → der.
3. Persönlich ist, wessen KONTEXT.md die Person selbst beschreibt (Name/Mail aus dem Nutzerkontext).
   Genau ein Treffer → der.
4. Mehrere persönliche und `<Quelle>` ist darunter → `<Quelle>`.
5. Sonst: den Menschen fragen, bevor irgendetwas geschrieben wird.

Welche Stufe entschieden hat, steht in `lauf.md`. Scheitert das Schreiben nach `<Heim>`, hält der
Lauf. Andere verbundene Ordner mit ähnlichem Namen sind nie Ort eines Laufs.

**Pfade:** Relative Pfade im Workflow ohne Platzhalter meinen `<Quelle>/…`; ist eine Werkbank
zugleich Quelle und Heim, fällt das zusammen.

**Ziel bei geteilten Workflows:** Ein Workflow kennt `<Heim>` nicht. Er nennt als Ziel entweder
`ergebnis/` im Lauf-Ordner oder ausdrücklich einen Bestand der eigenen Werkbank (`<Quelle>/…`; nicht
beschreibbar → Halt). Wohin ein Ergebnis in `<Heim>` endgültig gehört, regelt die Heim-Werkbank
oder der Mensch.
===== HOLDERBAUM-WERKSTATT · DATEI VOLLSTÄNDIG GELADEN =====
