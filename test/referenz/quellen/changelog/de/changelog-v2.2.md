v2.2 (2026-06-21)

Sessions vergessen was andere Sessions getan haben — erstellte
Google Sheets, GitLab-Repos, Design-Drafts verschwinden wenn die
Session endet. Drei neue Konzepte beheben das: eine klare
Projekt-Definition, ein Erkennungs-Reflex der proaktiv fragt wenn
Kontext unzugeordnet ist, und Operative Ressourcen als
Registrierungsmechanismus fuer externe Artefakte.

Dateien ersetzen:

Folgende Datei herunterladen und die lokale Version damit ersetzen:

| Datei | URL | Lokaler Pfad |
|-------|-----|-------------|
| Sparringpartner | https://holderbaum.io/werkstatt/bauanleitung/sparringpartner-system.md | Werkbank/Rollen/Sparringpartner/SYSTEM.md |

Was sich am Sparringpartner geaendert hat:

- Strukturberatung erweitert: Formale Projekt-Definition
  ("braucht persistenten Kontext ueber Sessions → Projekt"),
  Leichtgewicht-Projekte als explizites Konzept, und Operative
  Ressourcen als Registrierungsmuster fuer externe Artefakte.
- Zwei neue Beratungs-Szenarien: "Wann ist etwas ein Projekt?"
  und "Das kommt immer wieder, aber es gibt kein Projekt dafuer."

KONTEXT.md — empfohlene strukturelle Aenderungen:

1. Zwei neue Always-Regeln eintragen (zwischen Dateireferenzen
   und Rollenzwang):

   - **Projekt-Erkennung:** Wenn in einer Session operativer
     Kontext auftaucht, der keinem bestehenden Projekt zugeordnet
     werden kann und ueber die aktuelle Session hinaus relevant
     ist: Pruefe die Projekttabelle unten — gibt es ein Match?
     Wenn nein: frage den Nutzer, ob ein Projekt angelegt werden
     soll. Kein Automatismus, eine Frage. Bei Ja: Minimale
     KONTEXT.md anlegen (`Projekte/[Name]/KONTEXT.md`), Eintrag
     in die Projekttabelle. Ein Projekt ist alles, was persistenten
     Kontext ueber mehr als eine Session braucht — unabhaengig von
     Groesse oder strategischer Bedeutung.
   - **Operative Ressourcen:** Wenn eine Session eine externe
     Ressource erstellt oder zum ersten Mal nutzt (Google Sheet,
     Repo, Draft, URL): (1) Vor Erstellung pruefen ob die Ressource
     in der `## Operative Ressourcen`-Sektion der zugehoerigen
     Projekt-KONTEXT.md bereits existiert. (2) Nach Erstellung dort
     eintragen — eine Zeile: Name, Pfad/URL, Zweck.

2. In bestehenden Projekt-KONTEXT.md-Dateien bei Gelegenheit
   eine Sektion `## Operative Ressourcen` ergaenzen (leere Tabelle).
   Kein Bulk-Update noetig — organisch beim naechsten Beruehren.

Version danach:

Bootstrap-Block in der KONTEXT.md auf v2.2 hochziehen:

> Bootstrap-Info: Diese Werkbank wurde mit der
> Holderbaum-Werkbank-Bauanleitung v2.2 (21.06.2026) angelegt.
> Aktuelle Version und Updates:
> https://holderbaum.io/werkstatt/bauanleitung.txt
