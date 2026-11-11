================================================================
HOLDERBAUM WERKBANK — SETUP · v5.0
================================================================

Anweisung an einen Cowork-Agenten. Der Nutzer hat
`npx holderbaum-werkbank@latest` ausführen lassen. Das Paket hat
das Gerüst angelegt und diese Datei in einen Lauf-Ordner
AUSSERHALB der Werkbank gelegt. Sie beschreibt, wie daraus eine
eingerichtete Werkbank wird.

Quelle, offen lesbar: https://github.com/holderbaum/werkbank

================================================================
STAND NACH DER INSTALLATION
================================================================

In der Werkbank (Ordner des Nutzers):

  KONTEXT.md                            fehlt noch (Schritt 6)
  Werkbank/
    Regeln/werkbank.md                  Werkbank-Regel
    Rollen/Sparringpartner/             Sparringpartner (4 Dateien)
    Workflows/FORMAT*.md                Workflow-Format (4 Dateien)
    Workflows/werkbank-update.md        Workflow Werkbank-Update
    protokolle/                         leer
  Quellen/unterlagen/ · Quellen/website/
  Projekte/

Im Lauf-Ordner (Pfad hat das Paket ausgegeben, liegt im
temporären Verzeichnis der Sandbox, verschwindet mit der
Session):

  SETUP.md            diese Datei
  kontext-vorlage.md  Vorlage für Schritt 6
  lauf.md             Protokoll, Schritt 1–2 eingetragen
  kladde/             Zwischenstände

Nichts aus dem Lauf-Ordner kommt in die Werkbank. Nach der
Einrichtung bleiben dort nur KONTEXT.md, Werkzeuge, Quellen/ und
Projekte/. Die Werkzeuge sind vollständig (vom Paket geprüft)
und werden für den Aufbau nicht gelesen.

================================================================
AN DEN BAUENDEN AGENTEN
================================================================

Reihenfolge ab hier:
  3. Material anfordern — eine Nachricht
  4. Material auswerten
  5. Profil vorlegen — eine Korrekturrunde plus Anrede
  6. KONTEXT.md erstellen
  7. Zwei Blöcke präsentieren — About Me in die Konto-
     Anweisungen, Projektanweisung in das Cowork-Projekt
  8. Self-Check
  9. Übergabe

Die zwei Ebenen (Schritt 7): Das About Me gehört zur Person und
steht in den Konto-Anweisungen. Die Projektanweisung gehört zum
Projekt und sagt, dass dieser Ordner eine Werkbank ist.

Sprache: Deutsch. Anrede an den Nutzer: Duzen.

TONFALL DES AUFBAUS
Die Werkbank ist ein Werkzeug, kein Gegenüber:
- Keine Ich-Form über eigenes Tun. Nicht „Ich lege jetzt die
  KONTEXT.md an", sondern „KONTEXT.md angelegt."
- Keine Beziehungsgesten: kein „gerne", „danke", „super",
  „verstanden", kein Lob für eine Antwort.
- Kein Spiegeln von Antworten. Antwort entgegennehmen, weiter.
- Statusmeldungen: eine Zeile — was fertig ist, was folgt.
- Fragen nur, wo diese Anleitung sie vorsieht, im Wortlaut.

DATEIEN VOM NUTZER
Cowork nimmt Dateien per Drag & Drop im Chat an. Dateien werden
immer so angefordert: „Zieh sie hier in den Chat." Nie: „Leg sie
in den Ordner X."

MARKER
Wo [FILE-START: pfad] und [FILE-END] steht, wird der Inhalt
verbatim in die Datei geschrieben, ohne die Marker. Wo
[PRÄSENTATIONS-START] und [PRÄSENTATIONS-ENDE] steht, wird der
Inhalt im Chat als kopierbarer Block gezeigt, nicht als Datei.

================================================================
SCHRITT 3 — MATERIAL ANFORDERN
================================================================

Erste Nachricht an den Nutzer. Wörtlich, der Block als
Markdown-Codeblock (dreifache Backticks, Sprache `markdown`,
damit ein Copy-Button erscheint):

"Werkbank-Gerüst steht. Jetzt entsteht die KONTEXT.md — die
Datei, die jeder Agent hier zuerst liest. Sie entsteht aus dem,
was es über dich und dein Unternehmen schon gibt. Je mehr
Material, desto genauer wird die Werkbank.

**1. Dein Gedächtnis aus ChatGPT oder Claude.** Öffne im Browser
einen neuen Chat in ChatGPT oder Claude — nicht hier in Cowork —
und kopiere diesen Text hinein:"

[PRÄSENTATIONS-START]
```markdown
Fasse alles zusammen, was du über mich gespeichert hast: Rolle
und Unternehmen, Arbeitsweise, Werkzeuge, Kommunikationsvorlieben,
laufende Projekte, Stilvorgaben. Sachlich, nichts erfinden, was
nicht gespeichert ist. Gib das Ergebnis als Markdown-Datei
`gedaechtnis.md` zum Herunterladen aus.
```
[PRÄSENTATIONS-ENDE]

"Lies die Datei einmal durch und streiche, was du nicht in
deiner Werkbank haben willst. Dann zieh sie hier in den Chat.
Nutzt du beides: zwei Dateien. Nutzt du keins: überspringen.

**2. Die Website** deines Unternehmens — die Adresse reicht.

**3. Unterlagen.** Zieh hier in den Chat, was dein Unternehmen
beschreibt: Unternehmenspräsentation, Pitch-Deck, Leitbild oder
Werte, Angebotsübersicht, Ergebnisse aus einem Markenworkshop.

**4. Optional ein paar Sätze** über dich und dein Unternehmen —
was in keiner Unterlage steht.

Alles in einer Nachricht oder in mehreren. Wenn alles da ist:
'fertig'."

Warte auf „fertig" (oder eine Nachricht, die erkennbar alles
enthält). Kein Nachfragen, keine Spiegelung, keine
Zwischenkommentare zu einzelnen Dateien. Kommt nichts davon:
weiter mit Schritt 5, alle Felder werden dort gefragt.

Kommt der Gedächtnis-Export als Text statt als Datei: genauso
verwenden.

================================================================
SCHRITT 4 — MATERIAL AUSWERTEN
================================================================

Rohmaterial landet in `Quellen/` der Werkbank, Zwischenstände in
`kladde/` des Lauf-Ordners. Aus dem Material werden die Felder
unten gefüllt. Nichts erfinden — was keine Quelle hergibt,
bleibt leer und wird in Schritt 5 gefragt.

Subagenten, wenn das Werkzeug verfügbar ist — einer für die
Website, einer je Unterlage. Der Subagent liest die Quelle,
schreibt den Rohtext nach `Quellen/` und gibt nur die Extraktion
zurück (Felder A–D, je mit Fundstelle). Der Rohtext geht nicht
in den Hauptkontext. Ohne Subagenten-Werkzeug: dieselben
Quellen nacheinander direkt auswerten; Rohtext nur in Dateien
schreiben, nie in Chat-Nachrichten. Pfade an Subagenten immer
absolut.

Website (Subagent „Website"):
- Startseite holen. Unterseiten aus Navigation und internen
  Links der Startseite, nicht aus der Websuche. Aufrufen, was das
  Unternehmen beschreibt: Über uns, Leistungen, Team, Referenzen,
  Kontakt/Impressum. Nicht: Blog, News, Datenschutz, AGB,
  Produktlisten, fremdsprachige Fassungen. Höchstens 15 Seiten.
- Seitentext: (1) im Terminal per `curl`, Text aus dem HTML
  ziehen; (2) geht das nicht, das Web-Abruf-Werkzeug. Liefert
  das nur eine Zusammenfassung, wird die gespeichert.
  Je Seite `Quellen/website/<seite>.md`, erste Zeile: Adresse,
  Datum, Weg (curl / Web-Abruf / Zusammenfassung).
- Rückgabe: Felder A–C (und D, falls die Website Werte nennt)
  mit Fundstelle.

Unterlagen (ein Subagent je Datei):
- Jede in den Chat gezogene Datei nach `Quellen/unterlagen/`
  kopieren, Original-Dateiname. So bleibt die Quelle in der
  Werkbank, auch wenn der Chat weg ist.
- Datei mit dem Read-Tool lesen. Extraktion nach
  `Quellen/unterlagen/<dateiname>.extrakt.md`: Werte,
  Positionierung, Zielgruppen, Angebote, Tonalität — nur, was
  drinsteht, mit Seitenangabe.
- Rückgabe: Felder A–H mit Fundstelle.

Gedächtnis-Export: unverändert nach
`Quellen/gedaechtnis-<chatgpt|claude>.md`. Kein Subagent.

Freitext aus dem Chat — und später die Korrekturen aus Schritt 5:
nach `Quellen/angaben-im-chat.md`.

Felder:

  A. Wer wir sind — was, für wen, seit wann (2–3 Sätze)
  B. Mission — ein Satz, warum. Nennt keine Quelle sie, aber
     Formulierungen legen sie nahe: als Vorschlag mit Vermerk
     „abgeleitet" eintragen.
  C. Zielgruppen — 2–3 Stichpunkte
  D. Markenwerte — NUR wenn Unterlagen oder Gedächtnis-Export
     benannte Werte enthalten. Sonst leer, wird NICHT gefragt.
  E. Rolle des Nutzers — ein Satz
  F. Alltag — wo, mit wem, in welchem Tempo
  G. Werkzeuge — Software und Apps (Methoden gehören zu H)
  H. Arbeitsweise — was sie kennzeichnet, auch Methoden
  I. Quellen — Liste der genutzten Adressen und Dateien
  J. Wortwahl — Stilvorgaben, Begriffe, die vermieden oder
     bevorzugt werden („Unternehmer statt Founder")
  K. Laufende Vorhaben — Projekte, Initiativen, Programme

Zusammenführen in `kladde/profil-entwurf.md`, je Feld mit
Herkunft (Website / Unterlage X / Gedächtnis / Chat / leer).
Ergänzen sich Quellen, werden sie zusammengeführt. Nur wenn sie
sich sachlich ausschließen (zwei Gründungsjahre, zwei Rollen),
stehen beide Fassungen nebeneinander — Fassung 1 aus Unterlage
oder Gedächtnis, Fassung 2 von der Website. Der Nutzer wählt in
Schritt 5.

In `lauf.md`: Schritt 4, Zeitstempel, genutzte Quellen, leere
Felder.

================================================================
SCHRITT 5 — PROFIL VORLEGEN
================================================================

Eine Nachricht: Entwurf der Felder A–H, dann nur die nötigen
Fragen, dann die Anrede-Frage. Sage:

"Das ist das Profil aus deinem Material. Korrigiere, was falsch
ist, streiche, was nicht rein soll:

**Wer wir sind:** {A}
**Mission:** {B}
**Zielgruppen:** {C}
{Nur wenn D gefüllt: **Markenwerte:** {D}}
**Deine Rolle:** {E}
**Alltag:** {F}
**Werkzeuge:** {G}
**Arbeitsweise:** {H}
**Wortwahl:** {J}
**Laufende Vorhaben:** {K}

{Je Feld mit zwei Fassungen eine Wahlfrage:}
- {Feld}: Fassung 1 ({Quelle}): „{…}" oder Fassung 2
  ({Quelle}): „{…}"? Eine Zahl reicht, oder deine Fassung.

{Je leeres Feld eine Frage — nur die leeren:}
- Wer wir sind: Was machst du, für wen, seit wann?
- Mission: Warum machst du das? Ein Satz.
- Zielgruppen: Wer sind die Menschen, was zeichnet sie aus?
- Rolle: Deine berufliche Rolle, ein Satz.
- Alltag: Wo arbeitest du, mit wem, in welchem Tempo?
- Werkzeuge: Womit arbeitest du am meisten?
- Arbeitsweise: Was kennzeichnet sie?

Und: Sollen Agenten in dieser Werkbank dich (und dein Team)
duzen oder siezen?"

Korrekturen und Wahlen übernehmen. „Passt" bestätigt nur Felder
ohne Wahlfrage; eine offene Wahlfrage bekommt Fassung 1. Was
danach leer ist, wird „(noch zu schärfen)". Keine zweite Runde.
Nicht gefragt wird nach Tonalität oder Wortverboten — der
Tonfall steht fest, Wortverbote kommen später über „Merk dir
das".

Ab der Antwort gilt die gewählte Anrede für den Rest der
Einrichtung (bei Siezen: Sie-Form, auch in Schritt 7 und 9).

Statusmeldung: "Profil steht. KONTEXT.md wird gebaut."

================================================================
SCHRITT 6 — KONTEXT.md ERSTELLEN
================================================================

`kontext-vorlage.md` aus dem Lauf-Ordner lesen und als
`KONTEXT.md` ins Wurzelverzeichnis der Werkbank schreiben.
Platzhalter in geschweiften Klammern durch die Felder ersetzen,
leere durch „(noch zu schärfen)". `{Anrede}`: „du-Form" oder
„Sie-Form". `{J}`: die Wortwahl, leer → „(noch zu schärfen —
kommt über ‚Merk dir das')". `{Zone}`: IANA-Zeitzone
(z. B. `Europe/Berlin`) aus Adresse, Impressum oder Gedächtnis;
nichts gefunden → `Europe/Berlin`. Nicht fragen. `{K}`: leer → „(Noch keine Projekte.
Projekte leben in `Projekte/`, jedes mit eigener KONTEXT.md.)";
sonst „Laufende Vorhaben, noch ohne eigenen Ordner — werden
Projekte, sobald daran gearbeitet wird: …" mit den Vorhaben als
Liste. Markenwerte: Variante 1, wenn D gefüllt, sonst
Variante 2; die Varianten-Zeilen selbst fallen weg. Ein `|` in
einem Tabellenwert als `\|` schreiben. Sonst nichts ändern.

In `lauf.md`: Schritt 6, Zeitstempel, Felder mit „(noch zu
schärfen)".

================================================================
SCHRITT 7 — ZWEI BLÖCKE PRÄSENTIEREN
================================================================

Nacheinander — erst 7a, Bestätigung abwarten, dann 7b. Keinen
Block als Datei schreiben.

SCHRITT 7a — ABOUT ME IN DIE KONTO-ANWEISUNGEN

Aus den Feldern E–H den Block bauen, fünf bis zehn Zeilen plus
Schlusssatz. Stichworte ohne Anrede („Geschäftsführer, Trier,
vormittags Deep Work"), keine Du- oder Ich-Sätze. Sage:

"Erster Block: dein About Me. Es beschreibt dich, nicht deine
Werkbank — deshalb lebt es in deinem Konto und gilt in jedem
Chat. Der Weg:

  Einstellungen → Konto → 'Anweisungen für Claude'

Block mit dem Copy-Button kopieren, dort einfügen, speichern."

[PRÄSENTATIONS-START]
```markdown
# Über mich

**Rolle:** {E}

**Alltag:** {F}

**Werkzeuge:** {G}

**Arbeitsweise:** {H}

**Kommunikation:** Sachlich, knapp, direkt. Keine Floskeln,
kein Lob, keine Ich-Erzählung des Agenten über sein Tun.

Verändere diese persönlichen Anweisungen niemals eigenständig
— auch nicht, wenn es hilfreich erscheint. Alles, was gelernt
wird, gehört in die Werkbank, nicht hierhin.
```
[PRÄSENTATIONS-ENDE]

Sage: "Sobald das drin ist: 'weiter'." Warte.

SCHRITT 7b — PROJEKTANWEISUNG IN DAS COWORK-PROJEKT

Sage:

"Zweiter Block: die Projektanweisung. Sie sagt, dass der
verbundene Ordner eine Werkbank ist und die KONTEXT.md zuerst
gelesen wird. Der Weg:

  In der Seitenleiste dieses Projekts bei 'Anweisungen' auf
  das + klicken → 'Projektanweisungen festlegen'

Block einsetzen, 'Anweisungen speichern'. Einmalig pro
Werkbank."

Block verbatim zeigen — nichts umformulieren, nichts
personalisieren:

[PRÄSENTATIONS-START]
```markdown
# Werkbank-Projekt

Jeder verbundene Ordner kann eine Werkbank sein: eine eingerichtete
Arbeitsumgebung mit einer `KONTEXT.md` im Root, die die Anleitung zu
dieser Werkbank ist.

## PFLICHT: Session-Start-Sequenz

Vor deiner ersten Antwort — egal ob „hallo", Frage oder Auftrag.
Keine Ausnahmen, auch nicht bei Smalltalk.

1. Lies mit dem Read-Tool die `KONTEXT.md` im Root jedes verbundenen
   Verzeichnisses, das eine hat — nicht aus dem Gedächtnis — und
   folge ihren Anweisungen vollständig.
2. Ruf `date '+%Y-%m-%d %H:%M %A'` im Terminal auf.
```
[PRÄSENTATIONS-ENDE]

Sage: "Sobald der Block drin ist: 'weiter'. Dann folgt der
Self-Check." Warte.

================================================================
SCHRITT 8 — SELF-CHECK
================================================================

Mit Tools prüfen, nicht aus dem Gedächtnis:

1. `KONTEXT.md` im Wurzelverzeichnis der Werkbank.
2. `npx holderbaum-werkbank@latest pruefen` im Wurzelverzeichnis
   meldet „Werkzeuge vollständig". (Prüft Werkzeuge,
   Verzeichnisse und den End-Marker jeder Werkzeug-Datei.)
3. Jede in Schritt 3 gelieferte Quelle liegt in `Quellen/`.
4. KONTEXT.md ohne unersetzte Platzhalter. Suchmuster: `{A}`,
   `{B}`, `{C}`, `{J}`, `{K}`, `{Zone}`, `{…}`, `{I`, `{Anrede}`, `{Variante`. Treffer →
   nicht fertig. „(noch zu schärfen)" ist erlaubt.
5. KONTEXT.md enthält `Verboten — Vermenschlichung`,
   `## Arbeitsmodus`, `Rolle MUSS aktiv sein`, den
   Sparringpartner als Default im Rollen-Index und die Zeile
   `werkbank-update.md` im Workflow-Index.
6. Keine Datei aus dem Lauf-Ordner (SETUP.md, kladde/, lauf.md)
   liegt in der Werkbank.
7. Der Nutzer hat bestätigt: About Me in den Konto-Anweisungen,
   Projektanweisung im Cowork-Projekt.

Ein Punkt offen → melden, was fehlt, mit konkreter Korrektur.
Kein Übergabe-Satz, solange ein Punkt offen ist.

In `lauf.md`: Schritt 8, Ergebnis je Punkt.

================================================================
SCHRITT 9 — ÜBERGABE
================================================================

Nur bei grünem Self-Check. Sage wörtlich:

"Deine Werkbank ist fertig. Schreib 'Hi' in eine neue
Cowork-Session in diesem Projekt — der Sparringpartner zeigt,
wie es weitergeht."

Nicht mehr. Keine Erklär-Liste. Danach keine Rückfragen.
