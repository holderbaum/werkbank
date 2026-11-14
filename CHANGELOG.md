# Changelog

## 5.0.0

Erste Version, die über npm ausgeliefert wird und als Update auf alle Werkbänke im Feld funktioniert (Bauanleitung v1.5 bis v4.0, deutsch und englisch).

- **Update per Paket.** `npx holderbaum-werkbank@latest update` erkennt die installierte Version an den Prüfsummen der Werkzeug-Dateien, ersetzt die Werkzeuge, sichert die alten, zieht alte Strukturen um (`Werkbank/Aufgaben/` → `Werkbank/Workflows/`; englische v3.0-Werkbänke → `Workbench/`) und legt eine Anleitung für die KONTEXT.md-Änderungen in den Lauf-Ordner. `--pruefen` zeigt vorher, was passiert. Jede Werkbank hat dafür den Workflow `werkbank-update`.
- **Keine Domain mehr.** Werkzeuge, Einrichtung und Update kommen ohne holderbaum.io aus; keine Domain-Zulassungsliste nötig.
- **Einrichtung ohne Rückstände.** Anleitung und Zwischenstände liegen außerhalb der Werkbank. Danach bleiben nur KONTEXT.md, Werkzeuge, `Quellen/` und `Projekte/`.
- **Material statt Fragen.** Die erste Nachricht der Einrichtung bittet um alles auf einmal: Gedächtnis-Export als Markdown-Datei, Website, Unterlagen, optional Freitext — per Drag & Drop in den Chat. Danach nur gezielte Fragen zu Lücken.
- **Drag & Drop als Regel.** Sparringpartner und KONTEXT.md fordern Dateien immer im Chat an, nie über einen Ordner.
- **Sparringpartner schlank.** Kern von 35 auf 9 KB; Workflows und Automatisierung, Rollenbau, geteilte Werkbänke liegen in eigenen Dateien, die nur bei Bedarf geladen werden.
- **Automatisierung.** Weg In-the-Loop → On-the-Loop → geplante Aufgabe, sobald der Nutzer mit dem Ergebnis zufrieden ist. Erster Vorschlag immer Workflow plus geplante Aufgabe, keine externe Plattform (n8n, Make, Zapier).
- **Update ohne Technik-Fragen.** Eine einzige Rückfrage („Einspielen?"), danach erledigt der Agent alles selbst: KONTEXT.md auf die neue Struktur, eigene Anpassungen an Werkzeug-Dateien als eigene Regel übernommen, im Zweifel bleibt das Eigene des Nutzers. Vorher sichert das Paket den vollständigen Stand; „Update rückgängig machen" (`update --rueckgaengig`) holt ihn zurück. Eigene Zeilen in angepassten Werkzeug-Dateien findet das Paket selbst (`lib/zeilen.json`).
- **Kontext-Budget als Richtwert.** Richtwerte je Dateiart (KONTEXT.md 10.000 Zeichen, Projekt-KONTEXT 6.000, Regel 6.000, Rolle 12.000, Workflow 15.000) gelten fürs Neuschreiben: auslagern statt anhängen. Bestand wird nicht angemahnt, auch nicht vom Update; verkleinert wird nur auf „Werkbank aufräumen". Die KONTEXT-Vorlage ist von 8,4 auf 5,7 KB geschrumpft.
- **Workflow-Format aufgeteilt.** `FORMAT.md` (Ausführen, bei jedem Lauf), `FORMAT-schreiben.md` (nur beim Bauen), `FORMAT-plan-modus.md` (Läufe ohne Chat: Änderungen als Plan, Übernahme nach Freigabe), `FORMAT-mehrere-werkbaenke.md`. Werkbank-Eigenes in `FORMAT-lokal.md`, die das Update nie anfasst.
- **Lauf-Pflichten aus dem Betrieb:** kein Schritt im Orchestrator, Chat-Eingaben als Datei, ohne Subagenten kein Ersatz-Lauf (Halt), Schritt-Tabelle in `lauf.md`, nur in place ändern und nichts löschen, Abnahme mit Restdatei-Prüfung, Lauf-Ordner mit Zufallssuffix, aufgerufene Workflows steuert der Aufrufer. Zeiten immer mit der Zeitzone aus der KONTEXT.md.
- **Gewachsene Werkbänke.** Werkzeug-Dateien, die überwiegend selbst geschrieben sind, bleiben (eigene Fassung). Bei großer KONTEXT.md, eigener Fassung oder eigenem Regelsystem wird die KONTEXT.md nur ergänzt, nicht umgebaut. Die Sicherung umfasst nur, was das Update anfasst, plus eine Liste aller Dateien für „Rückgängig". Neue Referenz `de-gewachsen`.
- **CLAUDE.md.** Die Werkbank bekommt eine `CLAUDE.md` im Wurzelverzeichnis, die die KONTEXT.md importiert — damit funktioniert sie in Claude Code ohne Zusatzschritt.
- **Update mit einem Satz.** `update` und `pruefen` finden die Werkbank unter den verbundenen Ordnern selbst; kein `cd` nötig. Für Werkbänke ohne `werkbank-update`-Workflow reicht: „Aktualisiere meine Werkbank mit `npx holderbaum-werkbank@latest update` und folge der Anleitung, die der Befehl ausgibt."
- **Prüfbefehl.** `npx holderbaum-werkbank@latest pruefen` prüft die Werkzeug-Dateien und meldet Dateien über dem Kontext-Budget.
- **Englisch im Gleichschritt.** `--en` richtet eine englische Werkbank ein.

## 0.1.x

Vorabfassungen des Pakets mit den Werkzeugen der Bauanleitung v4.0. Nicht im Feld.
