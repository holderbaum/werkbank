# Referenz-Werkbänke

Jede Version der Werkbank, die je über die Bauanleitung ausgeliefert wurde, als Werkbank, wie sie im Feld steht. Gegen diese Werkbänke prüft `test/update.js` bei jedem Lauf, dass das Update aus jeder Version funktioniert.

| Ordner | Inhalt |
|---|---|
| `quellen/<version>/<de\|en>/` | Bauanleitung und Werkzeug-Dateien, wie sie zum Release-Commit im Content-Repo standen |
| `quellen/changelog/` | Changelog-Einträge v1.5–v4.0 (der alte Update-Weg) |
| `werkbaenke/<de\|en>-<version>/` | erzeugte Referenz-Werkbank: frische Einrichtung mit der Testperson DuWaT plus Nutzerbestand (eigene Regel, Rolle, Workflow, Projekt) |
| `bauen.py`, `duwat.json` | Generator und Antworten der Testperson |

**Versionen im Feld:** DE v1.5, v2.0, v2.1, v2.2, v2.3, v3.0, v3.1, v3.2, v3.3, v3.4, v4.0; EN v3.0–v4.0. v1.6 wurde nie veröffentlicht.

| Version | Release-Commit (Content-Repo) |
|---|---|
| v1.5 | `e07f54b8` (ältester erreichbarer Stand) |
| v2.0 | `2f155311` |
| v2.1 | `836b5678` |
| v2.2 | `75b7566a` |
| v2.3 | `04f4204d` |
| v3.0 | `0fcca171` |
| v3.1 | `dbfd58c5` |
| v3.2 | `7fd0a260` |
| v3.3 | `3eac877e` |
| v3.4 | `8bedaeae` |
| v4.0 | `5add4c97` |

**Befunde zur Erkennung:**
- v2.1 und v2.3 sind von ihrer Vorversion nicht zu unterscheiden — gleiche Werkzeug-Dateien, und ihre Bauanleitung schrieb die Vorversion in den Bootstrap-Block. Das Update meldet v2.0 bzw. v2.2; für den Zielzustand ist das gleich.
- EN v3.0 legte deutsche Pfade an (`KONTEXT.md`, `Werkbank/`). Das Update zieht sie auf `Workbench/` und `CONTEXT.md` um.
- v1.5 bis v2.3 haben `Werkbank/Aufgaben/` statt `Werkbank/Workflows/`.

**Regeln:** Referenz-Werkbänke nie von Hand ändern. Neu erzeugen: `werkbaenke/` entfernen, dann `python3 test/referenz/bauen.py` aus der Repo-Wurzel, danach `node tools/bekannt-erzeugen.js`. Für einen Test immer kopieren. Mit jedem Release kommt die gerade abgelöste Version als neue Referenz dazu — ab v5.0 aus dem Paket selbst (`npx holderbaum-werkbank@<version>` in einen leeren Ordner, KONTEXT.md aus der Vorlage mit `duwat.json`).

## Gewachsene Werkbank

`werkbaenke/de-gewachsen/` (Generator `gewachsen.py`) bildet eine über Monate gewachsene Werkbank nach — Bauplan von Holderbaum Studios, Inhalte erfunden: eigenes `regelsystem.md` statt `werkbank.md`, Sparringpartner mit wenigen eigenen Zeilen, FORMAT.md als „Aufgaben-Format" mit eigenen Abschnitten und Historie, KONTEXT.md über dem Richtwert mit eigener Gliederung, viele eigene Regeln, Rollen, Workflows (einer über dem Richtwert), `tools/`, `lib/`, eigene `.claude/CLAUDE.md`. Das Update muss sie im Modus ERGÄNZEN behandeln. Keine ausgelieferte Fassung — fließt nicht in `lib/bekannt.json` ein.
