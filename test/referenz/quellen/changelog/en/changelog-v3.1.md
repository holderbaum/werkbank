v3.1 (2026-07-12)

The diagnosis logic of the Workbench rule closes a gap: behavior
changes concerning the Sparring Partner. The Sparring Partner is
immutable (Workbench updates overwrite him) — so a fix in his
SYSTEM.md is impossible, and a soft Always line in CONTEXT.md stays
ineffective because it is loaded before the role and gets overridden
by the role's behavior. The Workbench rule now routes such cases into
a standalone rule with explicit precedence over the active role.

Files to replace:

| File | URL | Local path |
|------|-----|-----------|
| Workbench rule | https://holderbaum.io/werkstatt/en/bauanleitung/werkbank-regel.md | Workbench/Rules/workbench.md |

What changed in the Workbench rule:

- New block "Exception — the Sparring Partner" under the role branch
  of the diagnosis logic: if a behavior change concerns the Sparring
  Partner (or generally has to cut through the behavior of an active
  role), it is created as a standalone rule with a trigger, an action,
  and explicit precedence — NOT in the Sparring Partner's SYSTEM.md,
  NOT as an Always rule.
- The role example now uses the copywriter instead of the Sparring
  Partner (the Sparring Partner no longer works as an example for
  role fixes).
- The Always-rules branch is sharpened: it only applies to preferences
  that have no active role working against them. The old example
  "Answer more briefly" was misleading — it is now documented as a
  common trap (a verbose active role overrides the soft Always line).
  New example: a file-naming convention.
- The order of checks (smallest Blastradius first) now carries the
  exception explicitly: if the active role is the Sparring Partner, a
  standalone rule with precedence is created instead of a role fix.

Version after:

Set the bootstrap block in CONTEXT.md to v3.1:

> Bootstrap info: This Workbench was created with the
> Holderbaum Workbench build guide v3.1 (12.07.2026).
> Current version and updates:
> https://holderbaum.io/werkstatt/en/bauanleitung.txt
