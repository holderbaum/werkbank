v3.0 (2026-07-06)

Initial English release of the Holderbaum Workbench prompt — full
feature parity with the German v3.0. If you are setting up an
English Workbench for the first time, just follow the build guide;
there is nothing to migrate.

What the Workbench does at v3.0:

- The Sparring Partner asks the core question before building
  anything: "Do you want to talk with it (→ role), or should it
  run (→ workflow)?" — including the sidecar role (a single
  workflow step running in a role).
- A clean automation model: a workflow is always triggered by
  hand and verified first; only then, optionally, a scheduler.
  The scheduler is an ultra-thin layer ("Run workflow X in the
  Workbench"), runs only workflows, never a conversation or
  sparring session.
- Recurring flows are "workflows" (directory Workbench/Workflows/),
  written in the workflow format (Workbench/Workflows/FORMAT.md).
- Fetch-based install: the build guide downloads the Workbench
  rule, the Sparring Partner and the workflow format onto the
  filesystem rather than embedding them inline.
- The changelog lives as an index plus one self-contained file
  per version; the update flow fetches only the delta.

Files (for reference — a fresh install fetches these automatically):

| File | URL | Local path |
|------|-----|-----------|
| Workbench rule | https://holderbaum.io/werkstatt/en/bauanleitung/werkbank-regel.md | Workbench/Rules/workbench.md |
| Sparring Partner | https://holderbaum.io/werkstatt/en/bauanleitung/sparringpartner-system.md | Workbench/Roles/SparringPartner/SYSTEM.md |
| Workflow format | https://holderbaum.io/werkstatt/en/bauanleitung/format.md | Workbench/Workflows/FORMAT.md |

Version after:

Set the bootstrap block in CONTEXT.md to v3.0:

> Bootstrap info: This Workbench was created with the
> Holderbaum Workbench build guide v3.0 (06.07.2026).
> Current version and updates:
> https://holderbaum.io/werkstatt/en/bauanleitung.txt
