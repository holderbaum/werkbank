<!-- HOLDERBAUM-WERKSTATT · format-plan-modus · v5.0 -->
# Workflow-Format — Plan-Modus

Gelesen, wenn ein Lauf im Plan-Modus startet. Ergänzt [[Werkbank/Workflows/FORMAT.md]].

## Wozu

Ein Workflow läuft vollständig durch, ändert aber keine bestehende Datei der Werkbank. Was er in
Quelle oder Datenbestand schreiben würde, liegt am Ende als Plan vor. Ein Mensch oder der Aufrufer
gibt den Plan frei; erst dann wird er übernommen. Gedacht für Läufe, bei denen niemand am Chat
sitzt.

## Wann

Ein Workflow kann im Plan-Modus laufen, wenn seine § Zonen den Satz tragen:

> Plan-Modus möglich: Datenbestand-Pfade gehen nach `kladde/plan/`.

Fehlt er, läuft der Workflow nicht im Plan-Modus. Der Orchestrator setzt ihn beim Start und trägt
`Plan-Modus: an` in `lauf.md` ein.

## Was sich ändert

Jedes Schreiben in einen Pfad außerhalb der Kladde geht nach
`kladde/plan/<pfad relativ zur Werkbank>`. Lesen bleibt gleich; liest ein späterer Schritt eine
Datei, die ein früherer im selben Lauf geschrieben hat, liest er die Plan-Kopie. Außenwirkung, die
umkehrbar und Teil des Zwecks ist (ein Mail-Entwurf), passiert auch im Plan-Modus; Unumkehrbares nie.

Diese Zeile geht wörtlich in jeden Subagenten-Auftrag (zusätzlich zur Zeile aus § Dateien ändern,
`<Kladde>` als absoluter Pfad):

> Plan-Modus: Schreiben nur nach `<Kladde>/plan/<pfad relativ zur Werkbank>` und in die Kladde; Originale der Werkbank nur lesen, nie anlegen, ändern oder überschreiben — auch nicht, wenn der Auftrag einen Werkbank-Pfad als Ziel nennt.

**Abnahme (4):** Nach jedem Schritt liefert

```
cd "<Kladde>/plan" && find . -type f ! -name plan.md ! -name schluss.md | while read -r p; do
  TZ=<Zone> find "<Werkbank>/${p#./}" -maxdepth 0 -newermt "<Start>" 2>/dev/null; done
```

nichts. Ein Treffer: Abnahme `✗ Schreibzugriff <Pfad>`, der Lauf hält, Frage mit Pfad und
Änderungszeit, ob der Stand bleibt oder zurückgesetzt wird.

## Was am Ende vorliegt

- `kladde/plan/plan.md` — je betroffener Datei eine Zeile:
  `Pfad | Art (neu/ergänzt/geändert) | was sich ändert (ein Satz) | mtime des Originals beim Lesen (oder „neu")`
- `kladde/plan/schluss.md` — die Schlusszusammenfassung statt im Chat. Offene Punkte gibt es
  nicht: Was der Workflow sonst als Annahme oder Frage melden würde, steht unter `## Vorschläge`
  als fertiger, im Plan schon umgesetzter Vorschlag (Sachverhalt in Alltagssprache, Vorschlag,
  Quelle). Was bewusst nicht im Plan steht: ein Satz Begründung. Nur wenn kein Vorschlag möglich ist:
  `## Fragen`, je eine konkrete Frage.

## Übernehmen

Übernimmt nicht der Workflow, sondern der Aufrufer nach Freigabe: mtimes aus `plan.md` mit den
Originalen vergleichen; sind alle unverändert, die Plan-Kopien an ihre Pfade schreiben (in place);
sonst den Plan neu rechnen.

**Korrektur:** den Workflow erneut im Plan-Modus starten, mit der Korrekturanweisung als
`kladde/eingabe-korrektur.md` in `liest:` des ersten Schritts.
===== HOLDERBAUM-WERKSTATT · DATEI VOLLSTÄNDIG GELADEN =====
