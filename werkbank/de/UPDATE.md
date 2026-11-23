================================================================
HOLDERBAUM WERKBANK — UPDATE
================================================================

Anweisung an den Agenten nach `npx holderbaum-werkbank@latest
update`. Das Paket hat die Werkzeug-Dateien schon ersetzt und
die alten Fassungen samt KONTEXT.md in `alt/` dieses Lauf-
Ordners gesichert.

DER NUTZER WILL ZWEI DINGE: eine aktuelle Werkbank, und nichts
verlieren, was er angepasst hat. Technik interessiert ihn nicht.
Deshalb:
- Keine technischen Rückfragen. Wo eine Entscheidung nötig ist:
  die naheliegende treffen (im Zweifel: das Eigene des Nutzers
  behalten) und im Bericht in einem Satz nennen.
- Keine Prüflisten, Dateipfade, Versionsdetails oder
  Fachbegriffe im Chat — außer der Nutzer fragt danach. Einzige
  Ausnahme: der Versionssatz im Bericht (Schritt D).
- Alles ist umkehrbar: `alt/` hält die Dateien, die das Update
  anfasst, `vorher.txt` die Liste aller Dateien davor; „Update
  rückgängig machen" stellt damit den Stand vor dem Update her.
- `CLAUDE.md` im Wurzelverzeichnis ist eine Werkzeug-Datei für
  Claude Code (lädt die KONTEXT.md). Nichts tun, im Chat nicht
  erwähnen.
- Diese Anleitung geht der gerade geladenen Rolle und der alten
  Werkbank-Regel vor. Die Freigabe des Nutzers liegt mit dem Update-Auftrag
  vor — auch für die Änderungen an der KONTEXT.md.

================================================================
BEFUND DES PAKETS (für den Agenten, nicht für den Chat)
================================================================

{BEFUND}

================================================================
SCHRITT A — EIGENE ÄNDERUNGEN AN WERKZEUG-DATEIEN
================================================================

{GEAENDERT}

Steht in der Liste der angepassten Dateien oben eine FORMAT.md — Ausnahme: Eigene Zeilen aus einer alten FORMAT.md kommen nicht
in eine Regel, sondern nach `Werkbank/Workflows/FORMAT-lokal.md` (anlegen
mit Überschrift „# Workflow-Format — lokale Ergänzungen"). Was v5 schon
abdeckt, fällt weg. Steht dort keine FORMAT.md (oder gibt es keine
Liste): diesen Absatz überspringen.

================================================================
SCHRITT B — KONTEXT.md AUF DIE NEUE STRUKTUR BRINGEN
================================================================

{KONTEXT_MODUS}

Ohne Rückfrage. KONTEXT.md und `kontext-vorlage.md` (in diesem
Lauf-Ordner) mit dem Read-Tool lesen. Ziel: die Struktur der
Vorlage mit dem Inhalt des Nutzers.

Bleibt, wie es ist: Wer wir sind, Mission, Zielgruppen,
Markenwerte, Quellen, alle eigenen Always-Regeln, alle Einträge
zu eigenen Regeln, Rollen, Workflows und Projekten, eine
Lesereihenfolge, alles, was die Vorlage nicht kennt.

Wird angeglichen (nur, was abweicht):
 1. Bootstrap-Block (Zeilen mit „> Bootstrap-Info") wie in der
    Vorlage. Alte Fassungen nennen eine Bauanleitung oder
    holderbaum.io — beides fällt weg.
 2. Der Absatz „Diese Werkbank ist ein agentisches System …"
    direkt danach.
 3. § Always-Regeln: Block „Sprache" und „Verboten —
    Vermenschlichung" aus der Vorlage; `{Anrede}` aus der
    bisherigen Anrede (Duzen → du-Form, Siezen → Sie-Form). Die
    bisherigen Zeilen (etwa „Tonalität", „Vermeiden", eigene —
    soweit vorhanden) kommen unter „Weitere"; eine alte Zeile zur
    Anrede (Duzen/Siezen) entfällt, weil `{Anrede}` sie ersetzt.
 4. Unter „Weitere" die Zeilen „Dateien vom Nutzer" und
    „Knapp halten" der Vorlage, falls sie fehlen. Die Größe der
    KONTEXT.md spielt beim Update keine Rolle — nicht kürzen, nicht
    erwähnen.
 5. „## Arbeitsmodus" aus der Vorlage; ein Abschnitt
    „## Rollenzwang" wird dadurch ersetzt.
 6. Rollen-Index: Sparringpartner-Zeile wie in der Vorlage.
 7. „## Workflows" (früher „## Aufgaben") mit der Zeile
    „Werkbank-Update"; ein Leer-Hinweis „(Noch keine …)" wird zur
    Tabelle.
 8. „## Verzeichnisstruktur" passend zu den Ordnern, die es gibt.
 9. „## Für Agenten" wie in der Vorlage; eigene Ergänzungen dort
    bleiben.
10. Kein Verweis auf holderbaum.io als Quelle für Updates oder
    Bauanleitung. Andere Erwähnungen (Website, Mail, Links) bleiben.
11. Regel-Index: die Zeile der Werkbank-Regel wie in der Vorlage.
    Keine eigenen Trigger, weil aus alten Vorlagen: „Aufgabe
    anlegen", „mach das zur Aufgabe", „SOP schreiben", „genau so",
    „perfekt, merk dir das", „gibt Feedback". Jeder andere Trigger,
    der dort zusätzlich stand, ist eigener und bleibt; alte Begriffe
    darin („Aufgabe", „SOP") werden zu „Workflow".
12. Steht ein Thema in Vorlage und Bestand (z. B. Dateinamen,
    Verweise), gilt die Fassung der Vorlage; was der Nutzer darin
    selbst ergänzt hatte, bleibt als eigener Satz.
13. Fehlende Zeilen der Vorlage unter „Weitere" (z. B. „Projekte")
    ergänzen. Den Abschnitt „## Quellen" nur, wenn es den Ordner
    `Quellen/` gibt.
14. Sprache: Die Sprach-Zeile nennt die Sprache, in der der Nutzer
    seine Inhalte schreibt — nicht automatisch die der Vorlage;
    gemischt: die Sprache der meisten eigenen Inhalte.
    Überschriften der Vorlage in der Sprache der Vorlage; eigene
    Abschnitte und Begriffe des Nutzers (z. B. „Operative
    Ressourcen") bleiben, wie sie sind.
15. Verweise auf Dateien, die es nicht gibt: entfernen und im
    Bericht nicht erwähnen, außer es war eine eigene Datei des
    Nutzers (dann: Hinweis in einem Satz). Verweise in den Ordner
    `Quellen/` bleiben immer stehen.
16. Zeile „Zeitzone" unter „Weitere": Zone aus dem Inhalt der
    Werkbank ableiten (Firmensitz, Adresse); nichts zu finden →
    `Europe/Berlin`. Nicht fragen.

Danach die KONTEXT.md erneut lesen: Ist jeder Inhalt des Nutzers
aus `alt/` noch da? Fehlt etwas → wieder einfügen.

{UMZUG_HINWEIS}

================================================================
SCHRITT C — WAS DER NUTZER SELBST TUN MUSS
================================================================

{ANWEISUNGEN}

Ist oben etwas zu tun: in einem Satz Alltagssprache erklären, die
Zeile oder den Block zeigen, den Weg nennen, auf die Antwort des Nutzers warten — „erledigt",
„ja" oder „ok" zählen gleich. Ist nichts zu tun: nichts erwähnen.

================================================================
SCHRITT D — ABSCHLUSS
================================================================

In `lauf.md` dieses Ordners: was in Schritt A–C passiert ist und
welche Dateien in Schritt A–B neu angelegt wurden (z. B. eine
eigene Regel).

Bericht an den Nutzer, drei bis fünf Zeilen, Alltagssprache, keine
Dateinamen und Pfade:
- Kam die Werkbank aus einer Version vor v5.0 (Befund: Installierte
  Version): „Werkbank ist auf v5.0." und in einem Satz, was neu ist:
  schlankere Rollen, Dateien per Drag & Drop in den Chat, Updates
  künftig mit „Werkbank updaten". War sie schon auf v5.0:
  „Werkbank ist aktualisiert." und, falls Schritt C etwas verlangt
  hat und der Nutzer es bestätigt hat, was es bringt (z. B. „Die
  Uhrzeit stimmt jetzt überall.").
- Dass eigene Regeln, Rollen, Workflows, Projekte und alles, was
  über dich und dein Unternehmen in der Werkbank steht, erhalten
  sind — und falls in Schritt A eigene Ergänzungen übernommen
  wurden, in einem Satz, was daraus geworden ist.
- „Rückgängig machen geht jederzeit: 'Update rückgängig
  machen'."

Sagt der Nutzer später „Update rückgängig machen": der Workflow
`werkbank-update`, Referenz.
