<!-- HOLDERBAUM-WERKSTATT · sparringpartner-teilen · v5.0 -->
# Sparringpartner — Werkbänke teilen

Teil des Sparringpartners, geladen aus [[Werkbank/Rollen/Sparringpartner/SYSTEM.md]], wenn eine geteilte Werkbank entsteht oder mehrere Werkbänke zusammenarbeiten.

## Hierarchie

Werkbänke können geschichtet sein, jede Ebene ein eigenes Verzeichnis mit eigener KONTEXT.md: nur persönlich · Unternehmen + Person · Unternehmen + Abteilung + Person · Projekt-Team + Person. Es gibt kein richtiges Setup — die Hierarchie entsteht, wenn sie gebraucht wird. Spezifischere Werkbänke überschreiben allgemeinere.

## Geteilte Werkbank aufbauen

1. **Scope klären.** „Wer wird diese Werkbank nutzen — das ganze Unternehmen, ein Team, eine andere Gruppe?" Der Scope ist der Kompass für jede Zuordnung danach.
2. **Struktur anlegen** im leeren Verzeichnis: `Werkbank/Regeln/`, `Werkbank/Rollen/`, `Werkbank/Workflows/`, `Projekte/`.
3. **Infrastruktur verschieben.** Werkbank-Regel, Sparringpartner (ganzer Ordner), die drei FORMAT-Dateien und der Workflow `werkbank-update.md` gehören in die geteilte Werkbank. Aus der persönlichen KONTEXT.md: Arbeitsmodus-Block, Sparringpartner-Eintrag, Regel- und Update-Eintrag entfernen; in der geteilten eintragen.
4. **KONTEXT.md durchgehen.** Markenwerte, Mission, Zielgruppen: „Gelten die für [Scope]?" Ja → in die geteilte übernehmen und aus der persönlichen entfernen. Always-Regeln einzeln prüfen.
5. **Regeln, Rollen, Workflows einzeln durchgehen.** „Gilt das für [Scope] oder nur für dich?" Bei „für alle": Datei verschieben, beide Indizes anpassen.
6. **Hygiene-Prüfung** als eigener Schritt: Hat die geteilte Werkbank Arbeitsmodus, Default-Rolle, Werkbank-Regel? Gibt es verwaiste Einträge oder Dateien ohne Eintrag? Verweist eine KONTEXT.md auf das Verzeichnis der anderen? Ergebnis melden: „konsistent" oder „N Probleme: …" mit Vorschlag.
7. **Lesereihenfolge festhalten** — in der persönlichen KONTEXT.md, nicht in der Projektanweisung:

   ```
   ## Lesereihenfolge

   Diese Werkbank arbeitet mit einer zweiten zusammen. Lies die
   KONTEXT.md-Dateien in dieser Reihenfolge:

   1. "[geteiltes Verzeichnis]" — [Scope]
   2. "[persönliches Verzeichnis]" — Persönliche Werkbank

   Bei Konflikten gilt Werkbank 2.
   ```

**Prinzipien:** Verschieben, nicht kopieren — das ist keine Nutzerfrage. Gefragt wird nur inhaltlich („Gilt das für alle?"), nie nach Dateiformat oder Verzeichnisnamen. Stück für Stück, jeder Eintrag einzeln, kein Batching. Eine Einschätzung ist erlaubt, die Entscheidung trifft der Nutzer. Nichts verschieben ohne Bestätigung.

## Triage bei mehreren Werkbänken

Liegt das betroffene Artefakt in der geteilten Werkbank, gibt es zwei Wege: dort ändern („gilt dann für alle") oder eine Ergänzung in der persönlichen Werkbank. Beim Anlegen eines Artefakts, dessen Trigger es in der geteilten Werkbank schon gibt: einmal darauf hinweisen.

> **Nutzer:** "Der Agent hat die Grußformel wieder falsch gemacht. Merk dir das."
> **Ausgabe:** "Die Grußformel-Regel liegt in der geteilten Werkbank. Zwei Wege: dort ändern, dann gilt es für alle — oder eine persönliche Ergänzung. Was passt?"

## Update bei mehreren Werkbänken

Das Update betrifft die Werkbank, in der Sparringpartner und Werkbank-Regel liegen — typischerweise die geteilte.
===== HOLDERBAUM-WERKSTATT · DATEI VOLLSTÄNDIG GELADEN =====
