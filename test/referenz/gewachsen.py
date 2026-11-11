#!/usr/bin/env python3
"""Baut die Referenz-Werkbank `de-gewachsen`: eine über Monate gewachsene Werkbank nach dem Bauplan
einer echten (Holderbaum Studios), mit erfundenen Inhalten (Mara Brandt, Brandt Beratung).

Merkmale, die das Update aushalten muss:
- eigenes Regelsystem `regelsystem.md` statt `werkbank.md` (überwiegend eigener Text)
- Sparringpartner v3.2 mit wenigen eigenen Zeilen
- FORMAT.md v3.2, umbenannt zu „Aufgaben-Format", mit eigenen Abschnitten (Plan-Modus mit
  Sonderziel, Zeitzonen-Check) und Änderungshistorie
- KONTEXT.md weit über dem Richtwert, eigene Gliederung (Anlaufstellen, Projekte, Engagements)
- viele eigene Regeln, Rollen, Workflows, einer davon über dem Richtwert; tools/, lib/
- eigene `.claude/CLAUDE.md`

Aufruf aus der Repo-Wurzel, nach bauen.py: python3 test/referenz/gewachsen.py
Ziel muss leer sein. Nie von Hand ändern.
"""
import shutil, sys
from pathlib import Path

HIER = Path(__file__).resolve().parent
BASIS = HIER / "werkbaenke" / "de-v3.2"
ZIEL = HIER / "werkbaenke" / "de-gewachsen"
if ZIEL.exists() and any(ZIEL.iterdir()):
    sys.exit(f"{ZIEL} existiert schon.")
shutil.copytree(BASIS, ZIEL, dirs_exist_ok=True,
                ignore=lambda d, namen: ["werkbank.md"] if d.endswith("Werkbank/Regeln") else [])
(ZIEL / ".referenz").write_text("de-gewachsen\n", encoding="utf-8")

def schreibe(rel, text):
    p = ZIEL / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")

def lies(rel):
    return (ZIEL / rel).read_text(encoding="utf-8")

# 1. Eigenes Regelsystem statt werkbank.md
schreibe("Werkbank/Regeln/regelsystem.md", "# Regelsystem\n\nMeta-Regel der Werkbank von Mara Brandt. Wird bei Session-Start geladen.\n\n" +
    "```regel\nname: regelsystem\ntrigger:\n  - \"Regel erstellen\", \"Merk dir das\", \"ab jetzt immer\", \"Rolle anlegen\"\n```\n\n" +
    "".join(f"- Grundsatz {i}: Learnings leben nur in der Werkbank, nie im Gedächtnis der App (eingeführt {i:02d}.09.2026).\n" for i in range(1, 26)) +
    "\n## Diagnose-Weiche\n\nWorkflow aktiv → Fix im Workflow. Rolle aktiv → Fix in der Rolle. Sonst Regel erweitern, erst dann neu.\n")

# 2. Sparringpartner mit wenigen eigenen Zeilen
sp = lies("Werkbank/Rollen/Sparringpartner/SYSTEM.md")
eigen = "\n## Eigene Ergänzungen (Mara)\n\n" + "".join(f"- Bei Angeboten immer Variante {c} mitdenken.\n" for c in "ABCDE") + \
    "- Nie Termine vor 10 Uhr vorschlagen.\n- Rückfragen höchstens zwei auf einmal.\n"
schreibe("Werkbank/Rollen/Sparringpartner/SYSTEM.md", sp.rstrip("\n") + "\n" + eigen)

# 3. FORMAT.md: umbenannt, eigene Abschnitte, Historie
fmt = lies("Werkbank/Workflows/FORMAT.md").replace("# Workflow-Format", "# Aufgaben-Format", 1)
fmt += """
## Plan-Modus (eigen)

Eine Aufgabe, die Datenbestand schreibt, kann im Plan-Modus laufen. Jedes Schreiben geht nach
`kladde/plan/<pfad>`. Sonderfall Buchhaltung: `kladde/plan/Buchhaltung/…` ist die Plan-Kopie von
`<Buchhaltungs-Werkbank>/Buchhaltung/…`. Am Ende `plan.md` und `schluss.md` mit `## Vorschläge`.

## Zeitzonen-Check (eigen)

Nach jedem Schritt: `python3 Werkbank/tools/zeitzonen-check.py <Lauf-Ordner>/kladde` endet mit Exit 0.
Zeitstempel immer mit `TZ=Europe/Vienna`.

## Änderungen

""" + "".join(f"- 2026-10-{i:02d}: Pflicht Nummer {i} nach einem Vorfall ergänzt (Lauf {i}).\n" for i in range(1, 21))
schreibe("Werkbank/Workflows/FORMAT.md", fmt)

# 4. Eigene Regeln, Rollen, Workflows, tools, lib
regeln = ["mail-entwuerfe", "freigabe-vor-aussenwirkung", "zahlen-pruefen", "dateinamen", "transkripte",
          "pdf-design", "stakeholder", "termine", "evidenz", "review-links"]
for r in regeln:
    schreibe(f"Werkbank/Regeln/{r}.md", f"# {r}\n\n```regel\nname: {r}\ntrigger:\n  - \"{r}\"\n```\n\n" +
             "".join(f"- Vorgabe {i} zu {r}.\n" for i in range(1, 12)))
rollen = ["Texter", "Controller", "TechLead", "Vertrieb", "Datenschutz", "Lektor"]
for r in rollen:
    schreibe(f"Werkbank/Rollen/{r}/SYSTEM.md", f"# {r}\n\nArbeitsmodus {r}.\n\n## Trigger\n\n\"{r}\"\n\n" +
             "".join(f"- Arbeitsweise {i} der Rolle {r}.\n" for i in range(1, 30)))
workflows = ["transkript-nachbereitung", "rechnung-stellen", "angebot-schreiben", "wiedervorlage",
             "newsletter", "mail-triage", "handout", "monatsabschluss"]
for w in workflows:
    groesse = 400 if w == "transkript-nachbereitung" else 25
    schreibe(f"Werkbank/Workflows/{w}.md", f"---\nname: {w}\nversion: 1.0\nformat: FORMAT.md\n---\n\n# {w}\n\n" +
             "".join(f"### {i}. Schritt {i}\n*Anspruch: Urteil*\n- liest: `kladde/{i - 1}.md`\n- schreibt: `kladde/{i}.md`\n\n" for i in range(1, groesse // 5 + 2)) +
             ("\n## Änderungen\n\n" + "".join(f"- 2026-09-{i % 28 + 1:02d}: Anpassung {i}.\n" for i in range(60)) if w == "transkript-nachbereitung" else ""))
schreibe("Werkbank/tools/zeitzonen-check.py", "#!/usr/bin/env python3\n# meldet naive Zeitstempel\nimport sys\nsys.exit(0)\n")
schreibe("Werkbank/lib/pdf/vorlage.html", "<html><body>Vorlage</body></html>\n")
schreibe(".claude/CLAUDE.md", "# Werkbank-Projekt (Claude Code)\n\n@../KONTEXT.md\n\nVor der ersten Antwort KONTEXT.md folgen; `TZ=Europe/Vienna date`.\n")

# 5. KONTEXT.md: gewachsen, eigene Gliederung, Index auf regelsystem.md
k = lies("KONTEXT.md")
k = k.replace("[[Werkbank/Regeln/werkbank.md]]", "[[Werkbank/Regeln/regelsystem.md]]")
k = k.replace("| Werkbank |", "| Regelsystem |", 1)
k += "\n## Anlaufstellen\n\n| Begriff | Gemeint ist | Ort |\n|---|---|---|\n" + \
    "".join(f"| „Begriff {i}\" | Thema {i} von Brandt Beratung | [[Projekte/Thema{i}/KONTEXT.md]] |\n" for i in range(1, 31))
k += "\n## Eigene Regeln\n\n| Regel | Trigger | Datei |\n|---|---|---|\n" + \
    "".join(f"| {r} | „{r}\" | [[Werkbank/Regeln/{r}.md]] |\n" for r in regeln)
k += "\n## Eigene Rollen\n\n| Rolle | Trigger | Laden |\n|---|---|---|\n" + \
    "".join(f"| {r} | „{r}\" | [[Werkbank/Rollen/{r}/SYSTEM.md]] |\n" for r in rollen)
k += "\n## Aufgaben\n\n| Aufgabe | Trigger | Datei |\n|---|---|---|\n" + \
    "".join(f"| {w} | „{w}\" | [[Werkbank/Workflows/{w}.md]] |\n" for w in workflows)
k += "\n## Engagements\n\n| Engagement | Klient | Einstieg |\n|---|---|---|\n" + \
    "".join(f"| Kunde{i} | Firma {i} GmbH, Ansprechpartnerin Frau {i} | [[Engagements/Kunde{i}/KONTEXT.md]] |\n" for i in range(1, 41))
k += "\n## Kontakt\n\nWebsite https://brandt-beratung.example, Mail mara@brandt-beratung.example. Zertifikate: https://holderbaum.io/zertifikat/beispiel\n"
schreibe("KONTEXT.md", k)

for d in ZIEL.rglob("*"):
    if d.is_dir() and not any(d.iterdir()):
        (d / ".gitkeep").write_text("", encoding="utf-8")
n = sum(1 for f in ZIEL.rglob("*") if f.is_file())
print(f"de-gewachsen: {n} Dateien, KONTEXT.md {len(k)} Zeichen")
