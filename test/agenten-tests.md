# Tests mit Agenten

`npm test` prüft die Mechanik des Pakets. Ob ein Agent mit den Texten richtig arbeitet, prüfen Testläufe mit Agenten — vor jedem Release, Befunde im Lauf-Ordner des Release-Workflows.

## Paket ohne npm

`npx -y github:holderbaum/werkbank#<commit> <befehl>` — oder aus einer Arbeitskopie `node <repo>/bin/holderbaum-werkbank.js <befehl>`.

## Drei Arten

| Art | Wie | Prüft |
|---|---|---|
| **Inhalt** | Ein Agent spielt Einrichtung, Update oder Workflow-Lauf; der Nutzer kommt aus einer Persona (`Projekte/Werkbank/Testpersonen/`). Kann der Test-Agent keine Subagenten starten, enthält der Auftrag wörtlich die Anweisung des Menschen: **„Testlauf: Schritte ohne Subagenten ausführen."** | Texte, Abläufe, Tonfall, Ergebnisse. Prüfpunkt: Die Anweisung steht zitiert in der Schritt-Tabelle. |
| **Sperre** | Ein Workflow-Lauf ohne diese Anweisung, in einer Umgebung ohne Subagenten. | Der Lauf hält vor dem ersten Schritt mit `nicht gestartet — kein Subagent startbar` und meldet es; kein Schritt ausgeführt. |
| **Echt** | Einmal je Release in einer Umgebung mit Subagenten: Cowork-Session oder Claude Code (`claude -p`, z. B. über Stanze). | Schritt-Tabelle mit echten Subagent-IDs, Modell nach Anspruch, Abnahme (1)–(3), bei Plan-Modus (4), `plan.md`/`schluss.md`. |

## Mindestumfang je Release

- Einrichtung: drei Personas (DE), eine EN.
- Update: älteste Version (de-v1.5), englische Sonderstruktur (en-v3.0), letzte Version mit eigenen Änderungen (de-v4.0 + Ergänzung im Sparringpartner).
- Workflow bauen (Sparringpartner + FORMAT-schreiben) und fahren (zwei Werkbänke, Prüfschritt, Halt, ⚠).
- Sperre: ein Lauf.
- Echt: ein Lauf, auch im Plan-Modus.
