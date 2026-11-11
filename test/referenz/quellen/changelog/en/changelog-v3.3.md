v3.3 (2026-09-20)

The project instruction shrinks to the essentials and moves back
into the build guide. Since v3.2 it lived as its own file with its
own URL — for a handful of lines that are identical for every
Workbench, that was one fetch, one failure mode and one version slot
too many. It now sits directly in STEP 5b of the build guide.
Everything the Workbench says better itself is gone.

On your filesystem only the Sparring Partner changes. Apart from
that, only the block in your Cowork project's instructions gets
replaced.

Files to replace:

| File | URL | Local path |
|------|-----|-----------|
| Sparring Partner | https://holderbaum.io/werkstatt/en/bauanleitung/sparringpartner-system.md | Werkbank/Rollen/Sparringpartner/SYSTEM.md |

The only change there is step 9 of the "split the Workbench"
procedure: the reading order is no longer appended to the project
instruction, it goes into the personal CONTEXT.md. The project
instruction stays the same for every Workbench — whatever concerns
your Workbenches belongs in the Workbench.

Workbench rule and FORMAT.md are unchanged.

Project instruction — recommendation:

Replace the block in your Cowork project (sidebar → Instructions →
"Set project instructions") entirely with the block below. What
changes:

1. **Shorter.** The explanatory preamble is gone, and so is the
   "This instruction is fixed" section — the system can't change the
   project instruction on its own anyway.
2. **Several Workbenches.** It reads the `CONTEXT.md` of every
   connected directory that has one. Which one wins on conflicts
   isn't stated here but in your CONTEXT.md — only that one knows
   your directories.
3. **Date.** The call is now `date '+%Y-%m-%d %H:%M %A'` — with time
   and weekday. The weekday from `date` is the only reliable source;
   otherwise agents guess it wrong.

If you had your own reading order in the old block, move it into the
"For agents" section of your CONTEXT.md.

```markdown
# Workbench project

Any connected folder can be a Workbench: a set-up working
environment with a `CONTEXT.md` in its root that is the manual for
that Workbench.

## MANDATORY: Session start sequence

Before your first response — whether it's "hi", a question or a
task. No exceptions, not even for small talk.

1. Use the Read tool to read the `CONTEXT.md` in the root of every
   connected directory that has one — not from memory — and follow
   its instructions in full.
2. Run `date '+%Y-%m-%d %H:%M %A'` in the terminal.
```

Version after:

> Bootstrap info: This Workbench was created with the
> Holderbaum Workbench build guide v3.3 (2026-09-20).
> Current version and updates:
> https://holderbaum.io/werkstatt/en/bauanleitung.txt

===== HOLDERBAUM WERKSTATT · FILE FULLY LOADED =====
