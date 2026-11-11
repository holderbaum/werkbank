# Werkbank — KONTEXT

Diese Datei ist das Schild an der Wand. Jeder Agent liest sie
beim Einstieg in diese Werkbank.

> Bootstrap-Info: Diese Werkbank wurde mit der
> Holderbaum-Werkbank-Bauanleitung v3.2 (20.09.2026) angelegt.
> Aktuelle Version und Updates:
> https://holderbaum.io/werkstatt/bauanleitung.txt

## Wer wir sind

Die Duisburger Wassertechnik GmbH ist ein Familienunternehmen mit rund 55 Mitarbeitenden in Duisburg. Wir bauen und warten Wasseraufbereitungsanlagen für Industriekunden aus Chemie, Lebensmittel und Papier — seit 1987, Geschäftsführung seit 2019 in zweiter Generation.

**Mission:** Industriebetriebe haben sauberes Prozesswasser, ohne sich darum kümmern zu müssen.

## Markenwerte

| Dimension | Wert | Bedeutung |
|-----------|------|-----------|
| WHY | Verlässlichkeit | Anlagen laufen, Zusagen gelten — über Jahrzehnte. |
| HOW | Gründlichkeit | Erst messen, dann bauen; jedes Detail geprüft, bevor es zum Kunden geht. |
| WHAT | Ruhe | Der Kunde denkt nicht mehr an sein Wasser. |

Schnittmengen — die Markenpersönlichkeit:
- WHY ∩ HOW: beständig
- HOW ∩ WHAT: sorgfältig
- WHAT ∩ WHY: entlastend

## Zielgruppen

- Produktionsleiter und Instandhaltungsleiter in Chemie, Lebensmittel und Papier
- Betriebe mit 100 bis 2.000 Mitarbeitenden
- NRW und Benelux

## Always-Regeln

- **Anrede:** Duzen
- **Tonalität:** knapp, direkt, ohne Einleitung
- **Vermeiden:** keine Anglizismen in Kundentexten, keine Emojis
- **Dateinamen:** Kleinbuchstaben, Bindestriche statt
  Leerzeichen, keine Umlaute. Datum-Prefix für zeitgebundene
  Inhalte: `2026-04-30-titel.md`.
- **Dateireferenzen:** Interne Verweise innerhalb dieser
  Werkbank werden als Obsidian-Wikilinks mit vollem Pfad ab
  Werkbank-Root geschrieben — Markdown-Dateien mit
  `.md`-Endung. Beispiele: `[[KONTEXT.md]]`,
  `[[Werkbank/Regeln/regelsystem.md]]`,
  `[[Werkbank/Rollen/Sparringpartner/SYSTEM.md]]`. Mit
  Display-Text wenn der Pfad den Lesefluss bricht:
  `[[Werkbank/Rollen/Sparringpartner/SYSTEM.md|Sparringpartner]]`.
  Nicht angefasst: Code-Blöcke, Bash-Kommandos, URLs,
  Frontmatter, System-Pfade.
- **Projekt-Erkennung:** Wenn in einer Session operativer
  Kontext auftaucht, der keinem bestehenden Projekt zugeordnet
  werden kann und über die aktuelle Session hinaus relevant ist:
  Prüfe die Projekttabelle unten — gibt es ein Match? Wenn nein:
  frage den Nutzer, ob ein Projekt angelegt werden soll. Kein
  Automatismus, eine Frage. Bei Ja: Minimale KONTEXT.md anlegen
  (`Projekte/[Name]/KONTEXT.md`), Eintrag in die Projekttabelle.
  Ein Projekt ist alles, was persistenten Kontext über mehr als
  eine Session braucht — unabhängig von Größe oder strategischer
  Bedeutung.
- **Operative Ressourcen:** Wenn eine Session eine externe
  Ressource erstellt oder zum ersten Mal nutzt (Google Sheet,
  Repo, Draft, URL): (1) Vor Erstellung prüfen ob die Ressource
  in der `## Operative Ressourcen`-Sektion der zugehörigen
  Projekt-KONTEXT.md bereits existiert. (2) Nach Erstellung dort
  eintragen — eine Zeile: Name, Pfad/URL, Zweck.

## Rollenzwang

Bei jeder Anfrage gilt: eine Rolle MUSS aktiv sein, bevor
inhaltlich geantwortet wird. Prüfe Trigger gegen den
Rollen-Index unten. Bei Match → lade die `SYSTEM.md` der
zugehörigen Rolle aus `Werkbank/Rollen/`. Bei
keinem Match → Default ist
[[Werkbank/Rollen/Sparringpartner/SYSTEM.md|Sparringpartner]].
Kein "freier Claude" in dieser Werkbank — das System lebt von
der Rolle, nicht trotz ihr.

## Regelsystem

| Regel | Trigger | Datei |
|-------|---------|-------|
| Regelsystem | "Merk dir das", "das war ein Fehler", "so nicht", "ab jetzt immer so", "nie wieder", "mach eine Regel draus", "Regel erstellen", "Rolle anlegen", "neue Rolle", "Workflow anlegen", "SOP schreiben", "mach das zum Workflow", "genau so", "perfekt, merk dir das", oder Kontext: Nutzer korrigiert Agentenverhalten, gibt Feedback, bestätigt ein Verhalten als dauerhaft gewünscht, oder formuliert nach einer Korrektur eine Verallgemeinerung | [[Werkbank/Regeln/regelsystem.md]] |
| Kundentexte | "Kundentext", "Angebotstext", "Mail an Kunden" | [[Werkbank/Regeln/kundentexte.md]] |

## Rollen

| Rolle | Trigger | Laden |
|-------|---------|-------|
| **Sparringpartner** (Default) | kein anderer Trigger matcht (Default gemäß Rollenzwang oben), "Werkbank updaten", "Werkbank-Update", oder Kontext: Werkbank-Mechanik-Frage, Use-Case-Sparring, strategische Frage zum eigenen Vorhaben | [[Werkbank/Rollen/Sparringpartner/SYSTEM.md]] |
| Vertrieb | "Angebot", "Nachfass", "Kunde X anschreiben" | [[Werkbank/Rollen/Vertrieb/SYSTEM.md]] |

(Weitere Rollen, sobald du sie baust — siehe
[[Werkbank/Regeln/regelsystem.md]].)

## Workflows

| Name | Trigger | Datei |
|------|---------|-------|
| Wochenbericht | "Wochenbericht" | [[Werkbank/Workflows/wochenbericht.md]] |

## Projekte

| Projekt | Status | Einstieg |
|---------|--------|----------|
| Servicefälle | aktiv | [[Projekte/Servicefaelle/KONTEXT.md]] |

## Verzeichnisstruktur

    KONTEXT.md             ← du bist hier
    Werkbank/
      Regeln/              Leitplanken für das Verhalten von Agenten
      Rollen/              Spezialisten mit eigener Persönlichkeit
      Workflows/           Wiederverwendbare Abläufe (SOPs)
    Projekte/              Projekte — woran gearbeitet wird

## Für Agenten

1. Diese KONTEXT.md zuerst lesen. Wenn eine persönliche Werkbank
   darüber liegt, deren KONTEXT.md ebenfalls — sie hat Vorrang.
2. **PFLICHT — Rolle laden.** Lies die SYSTEM.md der aktiven
   Rolle mit dem Read-Tool. Bei Trigger-Match: die SYSTEM.md
   der spezifischen Rolle lesen (auch aus einer überlagernden
   persönlichen Werkbank). Bei keinem Match:
   `Werkbank/Rollen/Sparringpartner/SYSTEM.md` lesen.
   Eine Rolle MUSS geladen sein bevor du antwortest.
   Nicht aus dem Gedächtnis arbeiten — die Datei lesen.
3. Always-Regeln beachten.
4. Wenn der Nutzer eine Regel auslöst (siehe Trigger oben):
   die zugehörige Regeldatei laden und befolgen.
5. Wenn an einem Projekt gearbeitet wird: die KONTEXT.md
   des Projekts lesen.

## Anlaufstellen

| Begriff | Gemeint ist | Ort |
|---|---|---|
| „Begriff 1" | Thema 1 von Brandt Beratung | [[Projekte/Thema1/KONTEXT.md]] |
| „Begriff 2" | Thema 2 von Brandt Beratung | [[Projekte/Thema2/KONTEXT.md]] |
| „Begriff 3" | Thema 3 von Brandt Beratung | [[Projekte/Thema3/KONTEXT.md]] |
| „Begriff 4" | Thema 4 von Brandt Beratung | [[Projekte/Thema4/KONTEXT.md]] |
| „Begriff 5" | Thema 5 von Brandt Beratung | [[Projekte/Thema5/KONTEXT.md]] |
| „Begriff 6" | Thema 6 von Brandt Beratung | [[Projekte/Thema6/KONTEXT.md]] |
| „Begriff 7" | Thema 7 von Brandt Beratung | [[Projekte/Thema7/KONTEXT.md]] |
| „Begriff 8" | Thema 8 von Brandt Beratung | [[Projekte/Thema8/KONTEXT.md]] |
| „Begriff 9" | Thema 9 von Brandt Beratung | [[Projekte/Thema9/KONTEXT.md]] |
| „Begriff 10" | Thema 10 von Brandt Beratung | [[Projekte/Thema10/KONTEXT.md]] |
| „Begriff 11" | Thema 11 von Brandt Beratung | [[Projekte/Thema11/KONTEXT.md]] |
| „Begriff 12" | Thema 12 von Brandt Beratung | [[Projekte/Thema12/KONTEXT.md]] |
| „Begriff 13" | Thema 13 von Brandt Beratung | [[Projekte/Thema13/KONTEXT.md]] |
| „Begriff 14" | Thema 14 von Brandt Beratung | [[Projekte/Thema14/KONTEXT.md]] |
| „Begriff 15" | Thema 15 von Brandt Beratung | [[Projekte/Thema15/KONTEXT.md]] |
| „Begriff 16" | Thema 16 von Brandt Beratung | [[Projekte/Thema16/KONTEXT.md]] |
| „Begriff 17" | Thema 17 von Brandt Beratung | [[Projekte/Thema17/KONTEXT.md]] |
| „Begriff 18" | Thema 18 von Brandt Beratung | [[Projekte/Thema18/KONTEXT.md]] |
| „Begriff 19" | Thema 19 von Brandt Beratung | [[Projekte/Thema19/KONTEXT.md]] |
| „Begriff 20" | Thema 20 von Brandt Beratung | [[Projekte/Thema20/KONTEXT.md]] |
| „Begriff 21" | Thema 21 von Brandt Beratung | [[Projekte/Thema21/KONTEXT.md]] |
| „Begriff 22" | Thema 22 von Brandt Beratung | [[Projekte/Thema22/KONTEXT.md]] |
| „Begriff 23" | Thema 23 von Brandt Beratung | [[Projekte/Thema23/KONTEXT.md]] |
| „Begriff 24" | Thema 24 von Brandt Beratung | [[Projekte/Thema24/KONTEXT.md]] |
| „Begriff 25" | Thema 25 von Brandt Beratung | [[Projekte/Thema25/KONTEXT.md]] |
| „Begriff 26" | Thema 26 von Brandt Beratung | [[Projekte/Thema26/KONTEXT.md]] |
| „Begriff 27" | Thema 27 von Brandt Beratung | [[Projekte/Thema27/KONTEXT.md]] |
| „Begriff 28" | Thema 28 von Brandt Beratung | [[Projekte/Thema28/KONTEXT.md]] |
| „Begriff 29" | Thema 29 von Brandt Beratung | [[Projekte/Thema29/KONTEXT.md]] |
| „Begriff 30" | Thema 30 von Brandt Beratung | [[Projekte/Thema30/KONTEXT.md]] |

## Eigene Regeln

| Regel | Trigger | Datei |
|---|---|---|
| mail-entwuerfe | „mail-entwuerfe" | [[Werkbank/Regeln/mail-entwuerfe.md]] |
| freigabe-vor-aussenwirkung | „freigabe-vor-aussenwirkung" | [[Werkbank/Regeln/freigabe-vor-aussenwirkung.md]] |
| zahlen-pruefen | „zahlen-pruefen" | [[Werkbank/Regeln/zahlen-pruefen.md]] |
| dateinamen | „dateinamen" | [[Werkbank/Regeln/dateinamen.md]] |
| transkripte | „transkripte" | [[Werkbank/Regeln/transkripte.md]] |
| pdf-design | „pdf-design" | [[Werkbank/Regeln/pdf-design.md]] |
| stakeholder | „stakeholder" | [[Werkbank/Regeln/stakeholder.md]] |
| termine | „termine" | [[Werkbank/Regeln/termine.md]] |
| evidenz | „evidenz" | [[Werkbank/Regeln/evidenz.md]] |
| review-links | „review-links" | [[Werkbank/Regeln/review-links.md]] |

## Eigene Rollen

| Rolle | Trigger | Laden |
|---|---|---|
| Texter | „Texter" | [[Werkbank/Rollen/Texter/SYSTEM.md]] |
| Controller | „Controller" | [[Werkbank/Rollen/Controller/SYSTEM.md]] |
| TechLead | „TechLead" | [[Werkbank/Rollen/TechLead/SYSTEM.md]] |
| Vertrieb | „Vertrieb" | [[Werkbank/Rollen/Vertrieb/SYSTEM.md]] |
| Datenschutz | „Datenschutz" | [[Werkbank/Rollen/Datenschutz/SYSTEM.md]] |
| Lektor | „Lektor" | [[Werkbank/Rollen/Lektor/SYSTEM.md]] |

## Aufgaben

| Aufgabe | Trigger | Datei |
|---|---|---|
| transkript-nachbereitung | „transkript-nachbereitung" | [[Werkbank/Workflows/transkript-nachbereitung.md]] |
| rechnung-stellen | „rechnung-stellen" | [[Werkbank/Workflows/rechnung-stellen.md]] |
| angebot-schreiben | „angebot-schreiben" | [[Werkbank/Workflows/angebot-schreiben.md]] |
| wiedervorlage | „wiedervorlage" | [[Werkbank/Workflows/wiedervorlage.md]] |
| newsletter | „newsletter" | [[Werkbank/Workflows/newsletter.md]] |
| mail-triage | „mail-triage" | [[Werkbank/Workflows/mail-triage.md]] |
| handout | „handout" | [[Werkbank/Workflows/handout.md]] |
| monatsabschluss | „monatsabschluss" | [[Werkbank/Workflows/monatsabschluss.md]] |

## Engagements

| Engagement | Klient | Einstieg |
|---|---|---|
| Kunde1 | Firma 1 GmbH, Ansprechpartnerin Frau 1 | [[Engagements/Kunde1/KONTEXT.md]] |
| Kunde2 | Firma 2 GmbH, Ansprechpartnerin Frau 2 | [[Engagements/Kunde2/KONTEXT.md]] |
| Kunde3 | Firma 3 GmbH, Ansprechpartnerin Frau 3 | [[Engagements/Kunde3/KONTEXT.md]] |
| Kunde4 | Firma 4 GmbH, Ansprechpartnerin Frau 4 | [[Engagements/Kunde4/KONTEXT.md]] |
| Kunde5 | Firma 5 GmbH, Ansprechpartnerin Frau 5 | [[Engagements/Kunde5/KONTEXT.md]] |
| Kunde6 | Firma 6 GmbH, Ansprechpartnerin Frau 6 | [[Engagements/Kunde6/KONTEXT.md]] |
| Kunde7 | Firma 7 GmbH, Ansprechpartnerin Frau 7 | [[Engagements/Kunde7/KONTEXT.md]] |
| Kunde8 | Firma 8 GmbH, Ansprechpartnerin Frau 8 | [[Engagements/Kunde8/KONTEXT.md]] |
| Kunde9 | Firma 9 GmbH, Ansprechpartnerin Frau 9 | [[Engagements/Kunde9/KONTEXT.md]] |
| Kunde10 | Firma 10 GmbH, Ansprechpartnerin Frau 10 | [[Engagements/Kunde10/KONTEXT.md]] |
| Kunde11 | Firma 11 GmbH, Ansprechpartnerin Frau 11 | [[Engagements/Kunde11/KONTEXT.md]] |
| Kunde12 | Firma 12 GmbH, Ansprechpartnerin Frau 12 | [[Engagements/Kunde12/KONTEXT.md]] |
| Kunde13 | Firma 13 GmbH, Ansprechpartnerin Frau 13 | [[Engagements/Kunde13/KONTEXT.md]] |
| Kunde14 | Firma 14 GmbH, Ansprechpartnerin Frau 14 | [[Engagements/Kunde14/KONTEXT.md]] |
| Kunde15 | Firma 15 GmbH, Ansprechpartnerin Frau 15 | [[Engagements/Kunde15/KONTEXT.md]] |
| Kunde16 | Firma 16 GmbH, Ansprechpartnerin Frau 16 | [[Engagements/Kunde16/KONTEXT.md]] |
| Kunde17 | Firma 17 GmbH, Ansprechpartnerin Frau 17 | [[Engagements/Kunde17/KONTEXT.md]] |
| Kunde18 | Firma 18 GmbH, Ansprechpartnerin Frau 18 | [[Engagements/Kunde18/KONTEXT.md]] |
| Kunde19 | Firma 19 GmbH, Ansprechpartnerin Frau 19 | [[Engagements/Kunde19/KONTEXT.md]] |
| Kunde20 | Firma 20 GmbH, Ansprechpartnerin Frau 20 | [[Engagements/Kunde20/KONTEXT.md]] |
| Kunde21 | Firma 21 GmbH, Ansprechpartnerin Frau 21 | [[Engagements/Kunde21/KONTEXT.md]] |
| Kunde22 | Firma 22 GmbH, Ansprechpartnerin Frau 22 | [[Engagements/Kunde22/KONTEXT.md]] |
| Kunde23 | Firma 23 GmbH, Ansprechpartnerin Frau 23 | [[Engagements/Kunde23/KONTEXT.md]] |
| Kunde24 | Firma 24 GmbH, Ansprechpartnerin Frau 24 | [[Engagements/Kunde24/KONTEXT.md]] |
| Kunde25 | Firma 25 GmbH, Ansprechpartnerin Frau 25 | [[Engagements/Kunde25/KONTEXT.md]] |
| Kunde26 | Firma 26 GmbH, Ansprechpartnerin Frau 26 | [[Engagements/Kunde26/KONTEXT.md]] |
| Kunde27 | Firma 27 GmbH, Ansprechpartnerin Frau 27 | [[Engagements/Kunde27/KONTEXT.md]] |
| Kunde28 | Firma 28 GmbH, Ansprechpartnerin Frau 28 | [[Engagements/Kunde28/KONTEXT.md]] |
| Kunde29 | Firma 29 GmbH, Ansprechpartnerin Frau 29 | [[Engagements/Kunde29/KONTEXT.md]] |
| Kunde30 | Firma 30 GmbH, Ansprechpartnerin Frau 30 | [[Engagements/Kunde30/KONTEXT.md]] |
| Kunde31 | Firma 31 GmbH, Ansprechpartnerin Frau 31 | [[Engagements/Kunde31/KONTEXT.md]] |
| Kunde32 | Firma 32 GmbH, Ansprechpartnerin Frau 32 | [[Engagements/Kunde32/KONTEXT.md]] |
| Kunde33 | Firma 33 GmbH, Ansprechpartnerin Frau 33 | [[Engagements/Kunde33/KONTEXT.md]] |
| Kunde34 | Firma 34 GmbH, Ansprechpartnerin Frau 34 | [[Engagements/Kunde34/KONTEXT.md]] |
| Kunde35 | Firma 35 GmbH, Ansprechpartnerin Frau 35 | [[Engagements/Kunde35/KONTEXT.md]] |
| Kunde36 | Firma 36 GmbH, Ansprechpartnerin Frau 36 | [[Engagements/Kunde36/KONTEXT.md]] |
| Kunde37 | Firma 37 GmbH, Ansprechpartnerin Frau 37 | [[Engagements/Kunde37/KONTEXT.md]] |
| Kunde38 | Firma 38 GmbH, Ansprechpartnerin Frau 38 | [[Engagements/Kunde38/KONTEXT.md]] |
| Kunde39 | Firma 39 GmbH, Ansprechpartnerin Frau 39 | [[Engagements/Kunde39/KONTEXT.md]] |
| Kunde40 | Firma 40 GmbH, Ansprechpartnerin Frau 40 | [[Engagements/Kunde40/KONTEXT.md]] |

## Kontakt

Website https://brandt-beratung.example, Mail mara@brandt-beratung.example. Zertifikate: https://holderbaum.io/zertifikat/beispiel
