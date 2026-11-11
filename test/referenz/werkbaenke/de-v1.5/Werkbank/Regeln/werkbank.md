# Werkbank

Meta-Regel der Starter-Werkbank. Zentrale Anlaufstelle für jede
Veränderung am System — egal ob Korrektur, Lob, Feedback oder
expliziter Wunsch nach Regel, Rolle oder Aufgabe.

## Trigger

**Explizit:** "Merk dir das", "das war ein Fehler", "so nicht",
"ab jetzt immer so", "nie wieder", "mach eine Regel draus",
"Regel erstellen", "Rolle anlegen", "neue Rolle", "Aufgabe
anlegen", "SOP schreiben", "mach das zur Aufgabe"

**Korrektur:** "Das gehört nicht hierhin", "das ist zu viel",
"du machst zu viel X", "das war nicht was ich wollte",
"hör auf damit"

**Lob:** "Genau so", "perfekt, merk dir das", "so will ich das
immer", oder Kontext: Nutzer bestätigt ein Verhalten
ausdrücklich als dauerhaft gewünscht

**Implizit:** Nutzer korrigiert Agentenverhalten, Nutzer
wiederholt eine Anweisung die der Agent ignoriert hat, Nutzer
formuliert nach einer Korrektur eine Verallgemeinerung
("grundsätzlich", "immer", "zukünftig")

**Meta-Feedback:** "Das System overreacht", "du machst zu
viel X", Nutzer gibt Feedback über das Verhalten des Agenten
oder des Systems selbst

## Ablauf

Wenn ein Trigger feuert:

1. **Pausieren.** Nicht sofort eine Regel anlegen, keine Rolle
   öffnen, keine Aufgabe schreiben. Erst denken.

2. **Kontext lesen.** Welche Rolle ist gerade aktiv? Wird eine
   Aufgabe abgearbeitet? Oder ist es ein allgemeiner Fall?

3. **Educated Guess.** Entscheide, wohin die Änderung gehört:

   - **Regel** — das Feedback gilt für alle Rollen und
     Situationen. Beispiel: "Keine Emojis." → Globale Regel.
   - **Rolle** — das Feedback gilt nur im Kontext der aktiven
     Rolle. Beispiel: "Du fragst zu viele Gegenfragen" während
     der Sparringpartner aktiv ist → Fix in der SYSTEM.md der
     Sparringpartner-Rolle.
   - **Aufgabe** — das Feedback betrifft einen konkreten Ablauf.
     Beispiel: "Du vergisst den letzten Schritt beim Einpflegen"
     → Fix in der Aufgaben-Datei.
   - **Always-Regeln** — eine Stil- oder Tonalitäts-Präferenz,
     die übergreifend gilt. Beispiel: "Kürzer antworten."
     → Fix in KONTEXT.md unter Always-Regeln.

   **Faustregel:** Je spezifischer, desto besser. Betrifft es
   nur diese Rolle → Rollen-Fix. Nur diesen Ablauf →
   Aufgaben-Fix. Alles → Regel. Der häufigste Fehler: globale
   Regel für etwas, das nur in einem Kontext gilt.

4. **Vorlegen.** Sage dem Nutzer:
   - Was du verstanden hast ("Du willst, dass [X].")
   - Wo du es einordnest ("Das gehört in [Ziel], weil [Grund].")
   - Was du konkret ändern würdest.

   Formuliere als Vorschlag. Der Nutzer entscheidet.

5. **Umsetzen.** Erst nach Bestätigung. Änderung durchführen
   gemäß den Format-Spezifikationen unten. Wenn eine neue
   Regel, Rolle oder Aufgabe entsteht: Index in KONTEXT.md
   aktualisieren — ohne Index-Eintrag findet kein Agent sie.

---

## Was ist was — Kurzunterscheidung

- **Regel:** Leitplanke. "So nicht. Stattdessen so." Gilt
  immer, für alle Rollen.
- **Rolle:** Spezialist. "Wer führt aus?" Eigene Persönlichkeit,
  eigene Prinzipien, eigene Stimme.
- **Aufgabe:** Ablauf. "Was wird gemacht, in welcher
  Reihenfolge?" SOP mit klarem Ergebnis.

Im Zweifel: erst Regel. Wenn die Regel zu komplex wird →
Aufgabe. Wenn der Aufgabentyp einen eigenen Spezialisten
braucht → Rolle.

---

## Format: Regeln

### Wo Regeln leben

Werkbank/Regeln/[name].md — eine Datei pro Regel, Dateiname
in Kleinbuchstaben mit Bindestrichen, ohne Umlaute.

### Was eine Regel-Datei enthält

1. Überschrift mit Regelname
2. Eine Zeile Kurzbeschreibung
3. Trigger: wann die Regel greift (Schlüsselwörter und
   Kontextbeschreibungen, vollständig)
4. Aktion: was die Regel bewirkt — ablehnen, vorschlagen
   oder ausführen
5. Mindestens ein Beispiel

### Nach dem Anlegen

1. Regel-Datei in Werkbank/Regeln/ schreiben.
2. Index in KONTEXT.md aktualisieren — Regel mit allen Triggern
   in die Tabelle eintragen. Ohne Index-Eintrag ist die Regel
   nicht aktiv.

### Beispiel

Eingabe: "Der Agent sagt immer 'ganzheitlich'. Nie wieder."

Ausgabe:
- Neue Datei: Werkbank/Regeln/kein-corporate-deutsch.md
- Trigger: "Text erstellen", "Newsletter", oder Kontext:
  Agent schreibt Texte für externe Kommunikation
- Aktion: "ganzheitlich" ablehnen, Alternativen vorschlagen
- Index-Eintrag in KONTEXT.md

---

## Format: Rollen

### Was eine Rolle ist

Eine vorkonfigurierte Persönlichkeit. Mächtiger als eine Regel:
verändert Stimme, Arbeitsweise, Prioritäten, Grenzen. Beispiele:
Texter, Tech-Lead, Marketing-Stratege.

### Wo Rollen leben

Werkbank/Rollen/[Rollenname]/SYSTEM.md — pro Rolle ein
Unterverzeichnis. Rollenname in PascalCase.

### Was eine SYSTEM.md enthält

1. Identität: Wer ist diese Rolle? Welche Denkschule?
2. Auftrag: Was tut sie? Was tut sie nicht?
3. Prinzipien: 3–7 Leitsätze
4. Stimme: Wie klingt sie?
5. Trigger: Wann wird sie aktiviert?
6. Pflichtlektüre: Welche Dateien liest sie zuerst?

Optional: Unterordner Werkbank/Rollen/[Rollenname]/Referenz/
mit Stilbeispielen oder Vorlagen.

### Nach dem Anlegen

1. Verzeichnis anlegen.
2. SYSTEM.md schreiben.
3. Index in KONTEXT.md aktualisieren — Rolle mit allen Triggern
   eintragen. Ohne Index-Eintrag findet der Agent sie nicht.

### Beispiel

Eingabe: "Leg mir eine Texter-Rolle an für meine Newsletter."

Ausgabe:
- Neues Verzeichnis: Werkbank/Rollen/Texter/
- SYSTEM.md mit Identität, Stimme, Newsletter-Prinzipien
- Trigger: "Newsletter schreiben", "Text in meinem Stil"
- Index-Eintrag in KONTEXT.md

---

## Format: Aufgaben

### Was eine Aufgabe ist

Ein definierter Ablauf mit klarem Ergebnis — eine SOP.
Beispiele: Meeting-Transkript einpflegen, Newsletter aus
Notizen entwerfen, Report aus Zahlen aufbauen.

### Wo Aufgaben leben

Werkbank/Aufgaben/[name].md — eine Datei pro Aufgabe,
Kleinbuchstaben mit Bindestrichen.

### Wann eine Aufgabe entsteht

Wenn ein Ablauf zum dritten Mal gleich abläuft. Vorher:
einfach machen.

### Was eine Aufgaben-Datei enthält

1. Überschrift
2. Trigger: wann wird sie ausgelöst?
3. Rolle: welche Rolle führt aus? (optional)
4. Eingabe: was braucht der Agent zum Start?
5. Ablauf: nummerierte Schritte
6. Ergebnis: was liegt am Ende vor?

### Nach dem Anlegen

1. Aufgaben-Datei in Werkbank/Aufgaben/ schreiben.
2. Index in KONTEXT.md aktualisieren.

### Beispiel

Eingabe: "Ich pflege Transkripte regelmäßig ein. Mach eine
Aufgabe daraus."

Ausgabe:
- Neue Datei: Werkbank/Aufgaben/transkript-einpflegen.md
- Trigger: "Transkript einpflegen", oder Kontext: Nachricht
  im Transkript-Format
- Ablauf: Transkript lesen → Stakeholder → Verlauf →
  KONTEXT aktualisieren
- Index-Eintrag in KONTEXT.md
