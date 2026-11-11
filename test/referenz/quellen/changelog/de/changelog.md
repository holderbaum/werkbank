# Werkbank — Changelog-Index

Dies ist der Index aller versionierten Änderungen an den
Werkbank-Artefakten (Sparringpartner, Werkbank-Regel,
Workflow-Format und begleitende Empfehlungen für KONTEXT.md /
Konto-Anweisungen / Projektanweisungen).

**Für den Sparringpartner (Update-Flow):** Lies die aktuelle
Version aus dem Bootstrap-Block der KONTEXT.md. Bestimme aus der
Tabelle unten das Delta zwischen deiner Version und der neuesten.
Hole **nur** die dazwischenliegenden Einträge — einen nach dem
anderen — und arbeite sie **aufsteigend** ab (älteste zuerst).
Jeder Eintrag ist self-contained und beschreibt exakt, was zu tun
ist. Lade nie das ganze Changelog auf einmal.

Die neueste Version steht oben.

| Version | Datum | Was | Eintrag |
|---------|-------|-----|---------|
| **v4.0** | 2026-09-28 | Entpersonifizierung: Sparringpartner und Regel ohne Ich-Form, Rollen sind Arbeitsmodi, prüfbarer Regelblock in der KONTEXT.md. Versionierte, unveränderliche Werkzeug-Dateien; Downloads per Terminal, keine Cache-Buster. Neuinstallation aus Quellen (Website, Unterlagen, ChatGPT-/Claude-Gedächtnis) statt Interview, Markenwerte nur noch aus Unterlagen, `Quellen/` neben der KONTEXT.md. Voraussetzung: holderbaum.io in der Domain-Zulassungsliste. **Nicht breaking.** | [changelog-v4.0.md](https://holderbaum.io/werkstatt/bauanleitung/changelog-v4.0.md) |
| v3.4 | 2026-09-28 | Workflow-Läufe bekommen einen festen Ort in der persönlichen Werkbank: `Werkbank/protokolle/<lauf>-<Zeitstempel>/` mit `lauf.md`, `kladde/` und `ergebnis/` — ersetzt `Werkbank/tmp/runs/`. FORMAT.md unterscheidet Quelle- und Heim-Werkbank, bestimmt die Heim-Werkbank in fünf Stufen, verlangt absolute Pfade an Subagenten und prüft nach jedem Schritt per `ls`, ob die Dateien da sind. **Nicht breaking** — bestehende Lauf-Ordner bleiben, wo sie sind; der neue Ort gilt ab dem nächsten Lauf. | [changelog-v3.4.md](https://holderbaum.io/werkstatt/bauanleitung/changelog-v3.4.md) |
| v3.3 | 2026-09-20 | Die Projektanweisung ist auf das Nötigste gekürzt und steht wieder direkt in der Bauanleitung (SCHRITT 5b) statt in einer eigenen Datei. Sie liest jetzt die `KONTEXT.md` **jedes** verbundenen Verzeichnisses und ruft `date` inklusive Uhrzeit und Wochentag auf. **Nicht breaking** — nur der Block in deinen Projektanweisungen wird ersetzt. | [changelog-v3.3.md](https://holderbaum.io/werkstatt/bauanleitung/changelog-v3.3.md) |
| v3.2 | 2026-09-20 | Bootstrap in zwei Blöcke an zwei Orten: About Me in die Konto-Anweisungen (gilt auch im normalen Chat), Session-Start-Sequenz als Selbstauskunft in die Projektanweisungen. Die Global Instructions von Cowork sind nicht mehr der vorgesehene Ort. Projektanweisung als eigene Datei mit URL. Sparringpartner legt die Lesereihenfolge jetzt als Ergänzung statt als Ersatz vor. **Nicht breaking** — bestehende Werkbänke laufen unverändert weiter, Umstellen ist freiwillig. | [changelog-v3.2.md](https://holderbaum.io/werkstatt/bauanleitung/changelog-v3.2.md) |
| v3.1 | 2026-07-12 | Sparringpartner-Ausnahme in der Diagnose-Weiche: Verhaltensänderungen am (unveränderlichen) Sparringpartner werden als eigenständige Regel mit ausdrücklichem Vorrang angelegt — nicht in seiner SYSTEM.md, nicht als Always-Regel. Always-Regeln-Zweig geschärft („Kürzer antworten"-Falle). | [changelog-v3.1.md](https://holderbaum.io/werkstatt/bauanleitung/changelog-v3.1.md) |
| v3.0 | 2026-07-06 | „Aufgabe" → „Workflow" (inkl. Verzeichnis); Diagnose-Weiche Rolle/Workflow + Sidecar; Automatisierungs-Modell (Scheduler als Thin-Layer); Fetch-basierter Install; Changelog-Index. **BREAKING** (Verzeichnis-Rename). | [changelog-v3.0.md](https://holderbaum.io/werkstatt/bauanleitung/changelog-v3.0.md) |
| v2.3 | 2026-06-24 | Workflow-Format als ausführbare Spec, rückwärts vom Ergebnis komponiert; FORMAT.md eingeführt. | [changelog-v2.3.md](https://holderbaum.io/werkstatt/bauanleitung/changelog-v2.3.md) |
| v2.2 | 2026-06-21 | Formale Projekt-Definition, Projekt-Erkennungs-Reflex, Operative Ressourcen als Registrierungsmuster. | [changelog-v2.2.md](https://holderbaum.io/werkstatt/bauanleitung/changelog-v2.2.md) |
| v2.1 | 2026-06-17 | Zwei Verbesserungen am Migrations- und Update-Ablauf. | [changelog-v2.1.md](https://holderbaum.io/werkstatt/bauanleitung/changelog-v2.1.md) |
| v2.0 | 2026-06-16 | Geteilte Werkbänke + Mehrebenen-Migration; Blastradius-Prüfreihenfolge; Update auf Changelog umgestellt. | [changelog-v2.0.md](https://holderbaum.io/werkstatt/bauanleitung/changelog-v2.0.md) |
| v1.5 | 2026-05-07 | Initiale Version der Bauanleitung. | [changelog-v1.5.md](https://holderbaum.io/werkstatt/bauanleitung/changelog-v1.5.md) |
