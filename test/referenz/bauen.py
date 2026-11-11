#!/usr/bin/env python3
"""Baut die Referenz-Werkbänke aus den archivierten Bauanleitungen.

Jede Referenz-Werkbank ist der Zustand, den eine Bauanleitung bei einer
frischen Einrichtung erzeugt (Testperson DuWaT), plus ein fester
Nutzerbestand (eigene Regel, Rolle, Workflow, Projekt) — so wie eine
Werkbank aussieht, die eine Weile benutzt wurde.

Aufruf: python3 test/referenz/bauen.py      (aus der Repo-Wurzel)
Quelle: test/referenz/quellen/<version>/<sprache>/
Ziel:   test/referenz/werkbaenke/<sprache>-<version>/   (muss leer sein)

Referenz-Werkbänke werden nie von Hand geändert. Für einen Test kopieren.
"""
import json, re, shutil, sys
from pathlib import Path

HIER = Path(__file__).resolve().parent
QUELLEN = HIER / "quellen"
ZIEL = HIER / "werkbaenke"
WERTE = json.loads((HIER / "duwat.json").read_text(encoding="utf-8"))
MARKER = "===== HOLDERBAUM-WERKSTATT · DATEI VOLLSTÄNDIG GELADEN ====="


def vkey(v):
    return tuple(int(x) for x in v.lstrip("v").split("."))


def bloecke(text):
    """[FILE-START: pfad] … [FILE-END] → {pfad: inhalt}"""
    return {m.group(1).strip(): m.group(2)
            for m in re.finditer(r"^\[FILE-START: ([^\]]+)\]\n(.*?)^\[FILE-END\]", text, re.S | re.M)
            if m.group(1).strip() != "pfad" and m.group(1).strip() != "path"}


def werkzeug_ziele(text):
    """Download-Tabelle (v3.0–v3.4) oder curl -o (v4.0) → {quelldatei: lokaler pfad}"""
    ziele = {}
    for url, pfad in re.findall(r"\|\s*https://holderbaum\.io/\S*/([a-z-]+\.md)\s*\|\s*(\S+)\s*\|", text):
        ziele.setdefault(url, pfad)
    for datei, pfad in re.findall(r'"\$B/([a-z-]+)-v[0-9.]+\.md"\s+-o\s+(\S+)', text):
        ziele.setdefault(datei + ".md", pfad)
    return ziele


def fuellen(kontext, w):
    k = kontext
    # v4.0: Variante 1 (Markenwerte aus Unterlage) — Variante 2 entfällt
    k = re.sub(r"\{(?:Variante|Variant) 2[^}]*\}.*?(?=\n## )", "", k, flags=re.S)
    k = re.sub(r"\{(?:Variante|Variant) 1[^}]*\}\n\n", "", k)
    tab = iter(w["werte_tabelle"])
    k = re.sub(r"\{…\}", lambda m: next(tab), k)
    k = re.sub(r"\{I — .*?\}", w["quellen_liste"], k, flags=re.S)
    for platzhalter, wert in w["platzhalter"].items():
        k = k.replace(platzhalter, wert)
    rest = re.findall(r"\{[^{}\n]{1,80}\}", k)
    rest = [r for r in rest if not r.startswith("{{")]
    if rest:
        sys.exit(f"Unersetzte Platzhalter: {sorted(set(rest))}")
    return k


def zeile_einfuegen(kontext, ueberschriften, zeile, ersatz_tabelle):
    """Hängt eine Tabellenzeile an die Tabelle des Abschnitts an oder ersetzt
    den Leer-Hinweis „(Noch keine …)" durch eine Tabelle."""
    for u in ueberschriften:
        m = re.search(rf"^## {re.escape(u)}\n(.*?)(?=^## |\Z)", kontext, re.S | re.M)
        if not m:
            continue
        abschnitt = m.group(1)
        if re.search(r"^\(", abschnitt, re.M) and not re.search(r"^\|", abschnitt, re.M):
            neu = re.sub(r"^\(.*?\)\n", ersatz_tabelle + "\n", abschnitt, count=1, flags=re.S | re.M)
        else:
            zeilen = abschnitt.split("\n")
            letzte = max(i for i, z in enumerate(zeilen) if z.startswith("|"))
            zeilen.insert(letzte + 1, zeile)
            neu = "\n".join(zeilen)
        return kontext[:m.start(1)] + neu + kontext[m.end(1):]
    sys.exit(f"Abschnitt nicht gefunden: {ueberschriften}")


def bauen(version, sprache):
    q = QUELLEN / version / sprache
    text = (q / "bauanleitung.txt").read_text(encoding="utf-8")
    ziel = ZIEL / f"{sprache}-{version}"
    if ziel.exists() and any(ziel.iterdir()):
        sys.exit(f"{ziel} existiert schon — vor dem Neubau den Ordner werkbaenke/ entfernen.")
    ziel.mkdir(parents=True, exist_ok=True)

    dateien = bloecke(text)
    kname = "CONTEXT.md" if "CONTEXT.md" in dateien else "KONTEXT.md"
    englisch = sprache == "en" and kname == "CONTEXT.md"   # en-v3.0 nutzt noch das deutsche Gerüst
    w = WERTE["en" if englisch else "de"]
    kontext = fuellen(dateien.pop(kname), w)
    for pfad, inhalt in dateien.items():           # v1.5–v2.3: Werkzeuge eingebettet
        p = ziel / pfad
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(inhalt, encoding="utf-8")
    for datei, pfad in (werkzeug_ziele(text).items() if vkey(version) >= (3, 0) else []):  # ab v3.0: Download
        src = q / datei
        if not src.exists():
            continue                               # z. B. projektanweisung.md (kein Werkbank-Pfad)
        p = ziel / pfad
        p.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy(src, p)

    s = w["struktur"]
    wb = ziel / s["werkbank"]
    alt = vkey(version) < (3, 0)
    ablauf = s["aufgaben"] if alt else s["workflows"]
    for d in [s["regeln"], s["rollen"], ablauf, s["projekte"]]:
        (ziel / d).mkdir(parents=True, exist_ok=True)
    if vkey(version) >= (3, 4):
        (ziel / s["protokolle"]).mkdir(parents=True, exist_ok=True)
    if vkey(version) >= (4, 0):
        lauf = ziel / s["protokolle"] / w["setup_lauf"]
        (lauf / s["kladde"]).mkdir(parents=True, exist_ok=True)
        (lauf / s["lauf_md"]).write_text(w["setup_lauf_text"], encoding="utf-8")
        for pfad, inhalt in w["quellen_dateien"].items():
            p = ziel / pfad
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_text(inhalt, encoding="utf-8")

    # Nutzerbestand: eigene Regel, Rolle, Workflow, Projekt — Dateien plus Index-Zeilen
    nb = w["nutzerbestand"]
    for eintrag in nb:
        rel = eintrag["pfad"].format(**s, ablauf=ablauf)
        p = ziel / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(eintrag["inhalt"].format(ablauf=ablauf), encoding="utf-8")
        kontext = zeile_einfuegen(kontext, eintrag["abschnitt"],
                                  eintrag["zeile"].format(ablauf=ablauf),
                                  eintrag["tabelle"].format(ablauf=ablauf))
    (ziel / kname).write_text(kontext, encoding="utf-8")
    (ziel / ".referenz").write_text(f"{sprache}-{version}\n", encoding="utf-8")
    for d in ziel.rglob("*"):
        if d.is_dir() and not any(d.iterdir()):
            (d / ".gitkeep").write_text("", encoding="utf-8")
    return ziel


if __name__ == "__main__":
    ZIEL.mkdir(exist_ok=True)
    for vdir in sorted((p for p in QUELLEN.iterdir() if p.name.startswith("v")), key=lambda p: vkey(p.name)):
        for sprache in ("de", "en"):
            if (vdir / sprache / "bauanleitung.txt").exists():
                z = bauen(vdir.name, sprache)
                n = sum(1 for f in z.rglob("*") if f.is_file() and f.name != ".gitkeep")
                print(f"{z.name:10} {n:3} Dateien")
