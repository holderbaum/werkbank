<!-- HOLDERBAUM-WERKSTATT · format-plan-modus · v5.0 -->
# Workflow format — plan mode

Read when a run starts in plan mode. Supplements [[Workbench/Workflows/FORMAT.md]].

## What for

A workflow runs completely but changes no existing file of the workbench. What it would write into
source or data ends up as a plan. A human or the caller approves the plan; only then is it applied.
Meant for runs with nobody at the chat.

## When

A workflow can run in plan mode if its § Zones carries the sentence:

> Plan mode possible: data paths go to `scratch/plan/`.

Without it, the workflow does not run in plan mode. The orchestrator sets it at start and writes
`Plan mode: on` into `run.md`.

## What changes

Every write to a path outside the scratch goes to `scratch/plan/<path relative to the original's
workbench>`. If the original lives in a different workbench than the run folder, the path starts
with that workbench's folder name (`scratch/plan/<folder name>/<path>`).
Reading stays the same; if a later step reads a file an earlier one wrote in the same run, it reads
the plan copy. External effects that are reversible and part of the purpose (a mail draft) happen in
plan mode too; irreversible ones never.

**Halts in plan mode:** nobody is at the chat. A halt does not stop; its content goes into
`summary.md` under `## Proposals`, the run continues. A ⚠ step writes into the plan — approving the
plan is its halt.

This line goes verbatim into every subagent task (in addition to the line from § Changing files,
`<Scratch>` as an absolute path):

> Plan mode: write only to `<Scratch>/plan/<path relative to the workbench>` and into the scratch; only read the workbench's originals, never create, change or overwrite them — not even if the task names a workbench path as target.

**Acceptance (4):** after every step

```
TZ=<Zone> find "<Workbench>" -newermt "<start>" -type f -not -path "*/Workbench/logs/*"
```

returns nothing — for every connected workbench the workflow writes into. This catches every write
to an original, including a newly created file without a plan copy. A hit: acceptance
`✗ write access <path>`, the run halts (in plan mode: under `## Questions`), with path and change
time, whether the state stays or is reset. Parallel activity in the same workbench can produce hits
not caused by the run — report them anyway, don't guess.

## What exists at the end

- `scratch/plan/plan.md` — one row per affected file:
  `Path | Kind (new/extended/changed) | what changes (one sentence) | mtime of the original when read (or "new")`
- `scratch/plan/summary.md` — the final summary instead of the chat. There are no open points:
  what the workflow would otherwise report as an assumption or question stands under
  `## Proposals` as a finished proposal already applied in the plan (facts in everyday language,
  proposal, source). What is deliberately not in the plan: one sentence of reason. Only if no
  proposal is possible: `## Questions`, one concrete question each.

## Applying

Not the workflow applies, but the caller after approval: compare mtimes from `plan.md` with the
originals — for "new" the file must not exist yet; if everything matches, write the plan copies to
their paths (in place); otherwise recompute the plan.

**Correction:** start the workflow again in plan mode, with the correction instruction as
`scratch/input-correction.md` in the first step's `reads:`.
===== HOLDERBAUM WERKSTATT · FILE FULLY LOADED =====
