v3.1 (2026-07-12)

Die Diagnose-Weiche der Werkbank-Regel hat eine Lücke geschlossen:
Verhaltensänderungen am Sparringpartner. Der Sparringpartner ist
unveränderlich (wird von Werkbank-Updates überschrieben) — ein Fix in
seiner SYSTEM.md geht also nicht, und eine weiche Always-Zeile in der
KONTEXT.md bleibt wirkungslos, weil sie vor der Rolle geladen und von
deren Verhalten übersteuert wird. Neu routet die Werkbank-Regel solche
Fälle in eine eigenständige Regel mit ausdrücklichem Vorrang vor der
aktiven Rolle.

Dateien ersetzen:

| Datei | URL | Lokaler Pfad |
|-------|-----|-------------|
| Werkbank-Regel | https://holderbaum.io/werkstatt/bauanleitung/werkbank-regel.md | Werkbank/Regeln/werkbank.md |

Was sich an der Werkbank-Regel geändert hat:

- Neuer Block "Ausnahme Sparringpartner" unter dem Rollen-Zweig der
  Diagnose-Weiche: Betrifft eine Verhaltensänderung den Sparringpartner
  (oder muss sie generell gegen das Verhalten einer aktiven Rolle
  durchgreifen), wird sie als eigenständige Regel mit Trigger, Aktion
  und ausdrücklichem Vorrang angelegt — NICHT in der SYSTEM.md des
  Sparringpartners, NICHT als Always-Regel.
- Das Rollen-Beispiel nutzt jetzt den Texter statt den Sparringpartner
  (der Sparringpartner taugt nicht mehr als Beispiel für Rollen-Fixes).
- Der Always-Regeln-Zweig ist geschärft: Er gilt nur für Präferenzen,
  die keine aktive Rolle gegen sich haben. Das alte Beispiel "Kürzer
  antworten" war irreführend — es ist jetzt als häufige Falle
  dokumentiert (eine ausführliche aktive Rolle übersteuert die weiche
  Always-Zeile). Neues Beispiel: Dateinamen-Konvention.
- Die Prüfreihenfolge (kleinster Blastradius zuerst) trägt die
  Ausnahme jetzt explizit: Ist die aktive Rolle der Sparringpartner,
  wird statt des Rollen-Fixes eine eigenständige Regel mit Vorrang
  angelegt.

Version danach:

Bootstrap-Block in der KONTEXT.md auf v3.1 hochziehen:

> Bootstrap-Info: Diese Werkbank wurde mit der
> Holderbaum-Werkbank-Bauanleitung v3.1 (12.07.2026) angelegt.
> Aktuelle Version und Updates:
> https://holderbaum.io/werkstatt/bauanleitung.txt
