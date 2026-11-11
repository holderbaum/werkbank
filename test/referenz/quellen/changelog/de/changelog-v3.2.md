v3.2 (2026-09-20)

Der Bootstrap zerfällt in zwei Blöcke an zwei Orten. Bisher lagen
About Me und Session-Start-Sequenz zusammen in den Global
Instructions von Cowork. Die sind raus: Sie synchronisieren nicht
zuverlässig, sind sperrig zu bearbeiten und werden in regulären Chats
ignoriert. Neu wohnt das About Me in den Konto-Anweisungen (gilt in
Chat und Cowork), und die technische Bootstrap-Anweisung wird zur
Selbstauskunft des Projekts in den Projektanweisungen.

NICHT BREAKING. Wenn dein Bootstrap-Satz in den Global Instructions
steht, läuft deine Werkbank unverändert weiter. Es gibt nichts zu
migrieren. Wer umstellen will, kann — muss aber nicht. Dieser Eintrag
beschreibt beides: was sich an den Dateien ändert (das solltest du
einspielen) und wie du umstellst (das ist freiwillig).

Dateien ersetzen:

| Datei | URL | Lokaler Pfad |
|-------|-----|-------------|
| Sparringpartner | https://holderbaum.io/werkstatt/bauanleitung/sparringpartner-system.md | Werkbank/Rollen/Sparringpartner/SYSTEM.md |

Was sich am Sparringpartner geändert hat:

- Beim Aufteilen einer Werkbank in mehrere Ebenen legt er die
  Lesereihenfolge jetzt als **Ergänzung** der bestehenden
  Projektanweisung vor, nicht als Ersatz. Vorher hätte der
  vorgelegte Block die Selbstauskunft „Werkbank-Projekt"
  überschrieben — und damit den Bootstrap gekappt. Er sagt jetzt
  auch, wo der Absatz hingehört (direkt vor „Diese Anweisung ist
  fix") und was zu tun ist, wenn noch gar keine Projektanweisung
  existiert.
- Vokabular: „Global Instructions" heißt an drei Stellen jetzt
  „Konto-Anweisungen". Keine Verhaltensänderung, aber die Wege in
  der App stimmen sonst nicht mehr mit dem überein, was er sagt.

Neue Datei (kein Download nötig, nur zum Nachschlagen):

| Datei | URL |
|-------|-----|
| Projektanweisung | https://holderbaum.io/werkstatt/bauanleitung/projektanweisung.md |

Der fertige Block für die Projektanweisungen eines Werkbank-Projekts.
Für jede Werkbank gleich, deshalb als eigene Datei mit eigener URL —
so kann eine spätere Version ihn nachziehen, ohne dass du die ganze
Bauanleitung neu durchgehst. Die Datei gehört NICHT in dein
Werkbank-Verzeichnis. Dein Sparringpartner holt sie und legt dir den
Block vor, wenn du umstellst (siehe Schritt 2 unten).

Umstellen auf die zwei Ebenen — freiwillig:

Wenn du willst, dass deine Werkbank so läuft wie eine frisch
gebaute: Nimm deinen bisherigen Block aus den Global Instructions
und verteile ihn auf zwei Orte.

Schritt 1 — About Me ins Konto. In der Claude-App:
Einstellungen → Konto → „Anweisungen für Claude". Dort kommt der
persönliche Teil deines alten Blocks hinein — wer du bist, was du
tust, dein Ton. Der technische Teil (Session-Start-Sequenz, Verweis
auf die KONTEXT.md) bleibt draußen, der kommt in Schritt 2.

An den Sparringpartner: Schneide den persönlichen Teil nicht nach
Gefühl heraus, sondern baue ihn in genau das Format, das eine frisch
gebaute Werkbank erzeugt — und lege ihn dem Nutzer als Codeblock mit
Copy-Button vor:

    # Über mich

    **Rolle:** {berufliche Rolle, ein Satz}

    **Alltag:** {wo, mit wem, in welchem Tempo}

    **Werkzeuge:** {Software, Apps, Methoden}

    **Arbeitsweise:** {wie der Nutzer am liebsten arbeitet}

    **Kommunikation:** {wie der Agent mit ihm reden soll}

    Verändere diese persönlichen Anweisungen niemals eigenständig
    — auch nicht, wenn du glaubst, es wäre hilfreich. Alles, was
    du lernst, gehört in die Werkbank, nicht hierhin.

Was im alten Block dafür nicht ausreicht, fragst du nach — einzeln,
nicht als Fragenliste.

Schritt 2 — Projektanweisung ins Projekt. In der Seitenleiste
deines Cowork-Projekts bei „Anweisungen" auf das **+** klicken →
Dialog „Projektanweisungen festlegen" → Block einsetzen →
„Anweisungen speichern".

An den Sparringpartner: Hol die Datei unter dieser URL (mit frischem
Cache-Buster) und prüfe den End-Marker wie bei jeder ersetzten
Datei:

    https://holderbaum.io/werkstatt/bauanleitung/projektanweisung.md

Zeige dem Nutzer dann verbatim den Inhalt zwischen
[PRÄSENTATIONS-START] und [PRÄSENTATIONS-ENDE] — ohne die Marker, als
Codeblock mit Copy-Button. Schick ihn nicht in den Browser, und
formuliere nichts um.

Der Block enthält die Session-Start-Sequenz, die vorher in den Global
Instructions stand. Stand in den Global Instructions auch eine eigene
Lesereihenfolge für mehrere Werkbänke, hängst du sie direkt vor den
Abschnitt „Diese Anweisung ist fix" mit ein.

Schritt 3 — den Werkbank-Block aus den Global Instructions
entfernen. Nur den; was dort sonst noch steht und nie zur Werkbank
gehörte, bleibt. Der Weg: Claude-Einstellungen → Cowork → Globale
Anweisungen → Bearbeiten.

Erst wenn Schritt 1 und 2 stehen und eine frische Konversation im
Projekt sauber startet. Sauber heißt: Der Agent liest sichtbar die
KONTEXT.md, bevor er auf die erste Nachricht antwortet — bei „Hi"
taucht ein Read-Aufruf auf die KONTEXT.md auf, und er meldet sich in
seiner Rolle, nicht als allgemeiner Assistent. Tut er das nicht,
sitzt der Block noch nicht richtig. Dann Schritt 3 zurückstellen und
Schritt 2 prüfen.

Warum überhaupt: Die Konto-Anweisungen gelten auch im normalen Chat,
nicht nur in Cowork — dein About Me wirkt also an mehr Stellen. Und
die Trennung wird am Ort sichtbar: Wer du bist, gehört zu dir; was
dieses Projekt ist, gehört zum Projekt. Wenn ihr zu zweit an
derselben Werkbank arbeitet, hat jeder sein eigenes About Me,
während die Projektanweisung geteilt ist.

Nur für Neuaufbauten — kein Handlungsbedarf:

Die Bauanleitung selbst hat außerdem fünf Altlasten los, die ein
Testlauf aufgedeckt hat: Die Spalte „Bedeutung" der Markenwerte-
Tabelle hatte nie eine Interview-Frage und wurde vom Agenten still
erfunden (jetzt benannt und hergeleitet), der Self-Check fand
unersetzte Platzhalter in dieser Spalte nicht, sein Rollenzwang-Test
prüfte versehentlich einen anderen Abschnitt, zwei Stellen nannten
unterschiedliche Mindestlängen für dieselbe Datei, und die
KONTEXT.md-Vorlage enthielt einen Wikilink ins Leere. Das betrifft
nur frisch gebaute Werkbänke — an deiner ändert sich dadurch nichts.

Version danach:

Bootstrap-Block in der KONTEXT.md auf v3.2 hochziehen:

> Bootstrap-Info: Diese Werkbank wurde mit der
> Holderbaum-Werkbank-Bauanleitung v3.2 (20.09.2026) angelegt.
> Aktuelle Version und Updates:
> https://holderbaum.io/werkstatt/bauanleitung.txt
