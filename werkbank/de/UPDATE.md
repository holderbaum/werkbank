================================================================
HOLDERBAUM WERKBANK — UPDATE AUF v5.0
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
  Fachbegriffe im Chat — außer der Nutzer fragt danach.
- Alles ist umkehrbar: `alt/` enthält den vollständigen Stand vor dem
  Update; „Update rückgängig machen" holt ihn zurück.
- Diese Anleitung geht der gerade geladenen Rolle und der alten
  Werkbank-Regel vor. Die Freigabe des Nutzers liegt mit „Einspielen"
  vor — auch für die Änderungen an der KONTEXT.md.

================================================================
BEFUND DES PAKETS (für den Agenten, nicht für den Chat)
================================================================

{BEFUND}

================================================================
SCHRITT A — EIGENE ÄNDERUNGEN AN WERKZEUG-DATEIEN
================================================================

{GEAENDERT}

Ausnahme FORMAT.md: Eigene Zeilen aus einer alten FORMAT.md kommen nicht
in eine Regel, sondern nach `Werkbank/Workflows/FORMAT-lokal.md` (anlegen
mit Überschrift „# Workflow-Format — lokale Ergänzungen"). Was v5 schon
abdeckt, fällt weg.

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
    bisherigen Zeilen des Nutzers (Tonalität, Vermeiden, eigene)
    kommen unter „Weitere"; doppelte Anrede-Zeile entfällt.
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
11. Regel-Index: die Zeile der Werkbank-Regel wie in der Vorlage;
    eigene Trigger, die dort zusätzlich standen, bleiben. Alte
    Begriffe („Aufgabe", „SOP") werden zu „Workflow".
12. Steht ein Thema in Vorlage und Bestand (z. B. Dateinamen,
    Verweise), gilt die Fassung der Vorlage; was der Nutzer darin
    selbst ergänzt hatte, bleibt als eigener Satz.
13. Fehlende Zeilen der Vorlage unter „Weitere" (z. B. „Projekte")
    ergänzen. Den Abschnitt „## Quellen" nur, wenn es den Ordner
    `Quellen/` gibt.
14. Sprache: Die Sprach-Zeile nennt die Sprache, in der der Nutzer
    seine Inhalte schreibt — nicht automatisch die der Vorlage.
    Überschriften der Vorlage in der Sprache der Vorlage; eigene
    Abschnitte und Begriffe des Nutzers (z. B. „Operative
    Ressourcen") bleiben, wie sie sind.
15. Verweise auf Dateien, die es nicht gibt: entfernen und im
    Bericht nicht erwähnen, außer es war eine eigene Datei des
    Nutzers (dann: Hinweis in einem Satz).
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

Wenn hier etwas steht: in Alltagssprache erklären, Block zeigen,
auf „erledigt" warten. Sonst nichts erwähnen.

================================================================
SCHRITT D — ABSCHLUSS
================================================================

In `lauf.md` dieses Ordners: was in Schritt A–C passiert ist.

Bericht an den Nutzer, drei bis fünf Zeilen, Alltagssprache:
- „Werkbank ist auf v5.0." und in einem Satz, was neu ist:
  schlankere Rollen, Dateien per Drag & Drop in den Chat, Updates
  künftig mit „Werkbank updaten".
- Dass eigene Regeln, Rollen, Workflows, Projekte und Inhalte der
  KONTEXT.md erhalten sind — und falls in Schritt A eigene
  Ergänzungen übernommen wurden, wo sie jetzt stehen.
- „Rückgängig machen geht jederzeit: 'Update rückgängig
  machen'." (Dann: `npx holderbaum-werkbank@latest update
  --rueckgaengig`.)

In `lauf.md` außerdem eintragen, welche Dateien in Schritt A–B
neu angelegt wurden (z. B. eine eigene Regel).
