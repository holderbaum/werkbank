<!-- HOLDERBAUM-WERKSTATT · werkbank-regel · v5.0 -->
# Werkbank

Meta-Regel der Starter-Werkbank. Zentrale Anlaufstelle für jede
Veränderung am System — egal ob Korrektur, Lob, Feedback oder
expliziter Wunsch nach Regel, Rolle oder Workflow.

## Trigger

**Explizit:** "Merk dir das", "das war ein Fehler", "so nicht",
"ab jetzt immer so", "nie wieder", "mach eine Regel draus",
"Regel erstellen", "Rolle anlegen", "neue Rolle", "Workflow
anlegen", "SOP schreiben", "mach das zum Workflow"

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
   öffnen, keinen Workflow schreiben. Erst denken.

2. **Kontext lesen.** Welche Rolle ist gerade aktiv? Wird ein
   Workflow abgearbeitet? Oder ist es ein allgemeiner Fall?

3. **Educated Guess.** Entscheide, wohin die Änderung gehört:

   - **Regel** — das Feedback gilt für alle Rollen und
     Situationen. Beispiel: "Keine Emojis." → Globale Regel.
   - **Rolle** — das Feedback gilt nur im Kontext der aktiven
     Rolle. Beispiel: "Du fragst zu viele Gegenfragen" während
     der Texter aktiv ist → Fix in der SYSTEM.md der
     Texter-Rolle.

     **Ausnahme Sparringpartner:** Der Sparringpartner darf nie
     verändert werden — sein Ordner `Werkbank/Rollen/Sparringpartner/`
     wird von Werkbank-Updates überschrieben (ebenso diese Regel,
     die ausgelieferten FORMAT-Dateien und der Workflow
     `werkbank-update.md`). Betrifft eine
     Verhaltensänderung den Sparringpartner, kann sie also NICHT in
     einer seiner Dateien landen. Sie muss stattdessen als
     eigenständige **Regel** angelegt werden — mit Trigger, Aktion und
     **ausdrücklichem Vorrang vor der aktiven Rolle** ("übersteuert die
     Ausführlichkeit / das Verhalten jeder aktiven Rolle, inkl.
     Sparringpartner"). Eine Always-Regel in der KONTEXT.md reicht hier
     NICHT: Sie wird vor der Rolle geladen und von deren Verhalten
     übersteuert. Das ist getestet — die weiche Always-Zeile blieb
     wirkungslos, die explizite Regel mit Vorrang griff.
   - **Workflow** — das Feedback betrifft einen konkreten Ablauf.
     Beispiel: "Du vergisst den letzten Schritt beim Einpflegen"
     → Fix in der Workflow-Datei.
   - **Always-Regeln** — eine Stil- oder Tonalitäts-Präferenz,
     die übergreifend gilt UND die keine aktive Rolle gegen sich
     hat. Beispiel: eine Dateinamen-Konvention → Fix in KONTEXT.md
     unter Always-Regeln.

     **Achtung, häufige Falle:** "Kürzer antworten" wirkt wie ein
     klassischer Always-Regel-Fall, ist aber KEINER. Eine aktive
     Rolle mit ausführlichem Stil (z.B. der Sparringpartner)
     übersteuert die weiche Always-Zeile — sie bleibt wirkungslos.
     Sobald eine Präferenz gegen das Verhalten einer aktiven Rolle
     durchgreifen muss, gehört sie NICHT in die Always-Regeln,
     sondern in eine **eigenständige Regel mit ausdrücklichem
     Vorrang** (siehe "Ausnahme Sparringpartner" oben).

   **Faustregel:** Je spezifischer, desto besser. Betrifft es
   nur diese Rolle → Rollen-Fix. Nur diesen Ablauf →
   Workflow-Fix. Alles → Regel. Der häufigste Fehler: globale
   Regel für etwas, das nur in einem Kontext gilt.

   **Prüfreihenfolge (kleinster Blastradius zuerst):**
   Workflow aktiv → Fix im Workflow prüfen.
   Rolle aktiv → Fix in der Rolle prüfen (Ausnahme: ist die aktive
   Rolle der Sparringpartner, ist sie unveränderlich → stattdessen
   eigenständige Regel mit ausdrücklichem Vorrang, keine Always-Regel).
   Bestehende Regel betroffen → Regel erweitern.
   Nichts davon → Erst dann neue Regel.

   **Bei mehreren Werkbänken — wo gehört die Änderung hin?**
   Wenn die Session mehrere Werkbänke einbindet, kommt eine
   zweite Dimension dazu: in WELCHER Werkbank soll die
   Änderung landen?

   - Identifiziere, in welcher Werkbank das betroffene
     Artefakt lebt.
   - Wenn es in einer höheren Ebene lebt (z.B. Unternehmen),
     biete zwei Wege an: dort direkt ändern (betrifft alle)
     oder eine lokale Überschreibung in der persönlichen
     Werkbank anlegen (betrifft nur den Nutzer).
   - Wenn das Artefakt noch nicht existiert: frage den Nutzer,
     auf welcher Ebene es angelegt werden soll.

4. **Vorlegen.** Sage dem Nutzer:
   - Was du verstanden hast ("Du willst, dass [X].")
   - Wo du es einordnest ("Das gehört in [Ziel], weil [Grund].")
   - Was du konkret ändern würdest.

   Formuliere als Vorschlag. Der Nutzer entscheidet.

5. **Umsetzen.** Erst nach Bestätigung. Änderung durchführen
   gemäß den Format-Spezifikationen unten. Wenn eine neue
   Regel, Rolle oder ein neuer Workflow entsteht: Index in KONTEXT.md
   aktualisieren — ohne Index-Eintrag findet kein Agent sie.

---

## Kontext-Budget

Jede Datei, die geladen wird, kostet in jeder Session Kontext und
Geld — die KONTEXT.md immer, Rollen bei jedem Einsatz, Workflows
bei jedem Lauf. Richtwerte in Zeichen für **neu geschriebene oder
gezielt erweiterte** Dateien:

| Datei | Richtwert |
|---|---|
| `KONTEXT.md` (Wurzel) | 10.000 |
| Projekt-`KONTEXT.md` | 6.000 |
| Regel | 6.000 |
| Rolle (`SYSTEM.md`) | 12.000 |
| Workflow | 15.000 |

**Beim Schreiben:** Würde eine neue oder erweiterte Datei über den
Richtwert wachsen, wird ausgelagert statt angehängt — Details, die
nur ein Projekt, eine Rolle oder ein Workflow braucht, wandern
dorthin; selten Gebrauchtes in eine Datei daneben, die nur bei
Bedarf gelesen wird. Ein Satz an den Nutzer, wohin. Keine
Verläufe, Änderungsprotokolle oder „Stand vom …"-Notizen in
geladenen Dateien.

**Bestand bleibt in Ruhe.** Dateien, die schon über dem Richtwert
liegen, werden nicht angemahnt und nicht nebenbei gekürzt — auch
nicht von einem Update. Verkleinert wird nur auf Wunsch: Sagt der
Nutzer „Werkbank aufräumen" oder „meine KONTEXT.md ist zu groß",
misst `npx holderbaum-werkbank@latest pruefen` die Größen; je
Datei über dem Richtwert ein Auslagerungsvorschlag, nach Freigabe
umsetzen.

## Was ist was — Kurzunterscheidung

- **Regel:** Leitplanke. "So nicht. Stattdessen so." Gilt
  immer, für alle Rollen.
- **Rolle:** Arbeitsmodus. "Wer führt aus?" Eigenes Fachwissen,
  eigene Prinzipien, eigene Lieferform.
- **Workflow:** Ablauf. "Was wird gemacht, in welcher
  Reihenfolge?" SOP mit klarem Ergebnis.

Im Zweifel: erst Regel. Wenn die Regel zu komplex wird →
Workflow. Wenn der Workflow-Typ einen eigenen Spezialisten
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

Ein vorkonfigurierter Arbeitsmodus. Mächtiger als eine Regel:
verändert Fachwissen, Arbeitsweise, Prioritäten, Grenzen. Beispiele:
Texter, Tech-Lead, Marketing-Stratege.

### Wo Rollen leben

Werkbank/Rollen/[Rollenname]/SYSTEM.md — pro Rolle ein
Unterverzeichnis. Rollenname in PascalCase.

### Was eine SYSTEM.md enthält

1. Identität: Wer ist diese Rolle? Welche Denkschule?
2. Auftrag: Was tut sie? Was tut sie nicht?
3. Prinzipien: 3-7 Leitsätze
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

## Format: Workflows

Ein Workflow ist ein wiederkehrender Ablauf mit festem Ergebnis.
Er liegt als `Werkbank/Workflows/<name>.md` (klein, Bindestriche)
und steht mit Trigger in der KONTEXT.md § Workflows. Gebaut wird
er immer nach [[Werkbank/Workflows/FORMAT-schreiben.md]] — dort
stehen Skelett, Schritte, Halte und Größe.
Lernt die Werkbank etwas über das Format selbst (eine Pflicht,
eine Kennung, ein Pfad), kommt es nach
`Werkbank/Workflows/FORMAT-lokal.md` — nie in eine
ausgelieferte FORMAT-Datei. FORMAT.md lädt die lokale Datei
immer mit; bei Widerspruch gilt sie. Der Sparringpartner
führt durch das Gespräch
([[Werkbank/Rollen/Sparringpartner/workflows-und-automatisierung.md]]).

===== HOLDERBAUM-WERKSTATT · DATEI VOLLSTÄNDIG GELADEN =====
