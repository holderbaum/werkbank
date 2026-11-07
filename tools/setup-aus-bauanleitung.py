"""Erzeugt werkbank/de/SETUP.md aus der Bauanleitung v4.0.

Aufruf: python3 tools/setup-aus-bauanleitung.py <bauanleitung-v4.0.txt> <ziel/SETUP.md>

SCHRITT 1 und 2 der Bauanleitung erledigt das Paket; SETUP.md beginnt
deshalb mit dem Stand nach der Installation und übernimmt ab SCHRITT 3
den Wortlaut der Bauanleitung unverändert.
"""
import re
import sys

src = open(sys.argv[1], encoding="utf-8").read()
rest = src[src.index("================================================================\nSCHRITT 3 — QUELLEN EINSAMMELN"):]
ton = re.search(r"TONFALL DES AUFBAUS\n.*?(?=\n={10,}\nSCHRITT 1)", src, re.S).group(0)

KOPF = """================================================================
HOLDERBAUM WERKBANK — SETUP
Paket holderbaum-werkbank · Inhalt: Bauanleitung v4.0
================================================================

Diese Datei ist eine Anweisung an einen Cowork-Agenten. Der
Nutzer hat `npx holderbaum-werkbank@latest` ausführen lassen; das
Paket hat diese Datei in den Lauf-Ordner gelegt. Sie beschreibt,
wie aus dem angelegten Gerüst eine Starter-Werkbank wird — ein
strukturiertes Verzeichnis, in dem ein Mensch mit KI-Agenten
arbeitet.

Quelle, offen lesbar: https://github.com/holderbaum/werkbank

Nichts in dieser Anleitung verändert Konto- oder
Projektanweisungen — das macht der Nutzer von Hand.

================================================================
STAND NACH DER INSTALLATION
================================================================

Das Paket hat SCHRITT 1 und 2 bereits erledigt:

  KONTEXT.md                            (Schritt 6, fehlt noch)
  Werkbank/
    Regeln/werkbank.md                  Werkbank-Regel v4.0
    Rollen/Sparringpartner/SYSTEM.md    Sparringpartner v4.0
    Workflows/FORMAT.md                 Workflow-Format v4.0
    protokolle/
      werkbank-setup-<Zeitstempel>/
        lauf.md                         Schritt 1–2 eingetragen
        kladde/
        SETUP.md                        diese Datei
  Quellen/unterlagen/ · Quellen/website/
  Projekte/

Die drei Werkzeuge sind vollständig (Version in der ersten
Zeile, End-Marker in der letzten — vom Paket geprüft). Sie
werden für den Aufbau nicht gelesen.

================================================================
AN DEN BAUENDEN AGENTEN
================================================================

Reihenfolge ab hier:
  3. Quellen einsammeln — Website, Marken-Unterlagen,
     ChatGPT-/Claude-Gedächtnis (eine Nachricht)
  4. Quellen auswerten
  5. Profil vorlegen — eine Korrekturrunde plus Anrede
  6. KONTEXT.md erstellen
  7. Zwei Blöcke präsentieren — About Me in die Konto-
     Anweisungen, Projektanweisung in das Cowork-Projekt
  8. Self-Check
  9. Übergabe an die Werkbank

Erste Nachricht an den Nutzer, vor Schritt 3, wörtlich:

"Werkbank-Gerüst steht. Jetzt entsteht die KONTEXT.md — das
Schild an der Wand, das jeder Agent zuerst liest."

Die zwei Ebenen (für Schritt 7): Das About Me gehört zur Person
— es steht in den Konto-Anweisungen und gilt in jedem Chat. Die
Projektanweisung gehört zum Projekt — sie sagt, dass dieser
Ordner eine Werkbank ist. Zwei Blöcke, zwei Orte.

Sprache: Deutsch. Anrede an den Nutzer: Duzen.

Lauf-Ordner: der Ordner, in dem diese SETUP.md liegt. `lauf.md`
und `kladde/` dort weiterführen.

"""

out = KOPF + ton + "\n\n" + rest
out = out.replace(
    "> Bootstrap-Info: Diese Werkbank wurde mit der\n"
    "> Holderbaum-Werkbank-Bauanleitung v4.0 angelegt.\n"
    "> Aktuelle Version und Updates:\n"
    "> https://holderbaum.io/werkstatt/bauanleitung.txt",
    "> Bootstrap-Info: Diese Werkbank wurde mit der\n"
    "> Holderbaum-Werkbank-Bauanleitung v4.0 angelegt\n"
    "> (Paket holderbaum-werkbank).\n"
    "> Quelle und Updates: https://github.com/holderbaum/werkbank",
)
out = out.replace("ENDE DER BAUANLEITUNG", "ENDE DES SETUPS")
open(sys.argv[2], "w", encoding="utf-8").write(out)
