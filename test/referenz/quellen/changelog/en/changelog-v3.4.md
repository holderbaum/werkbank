v3.4 (2026-09-28)

Workflow runs get a fixed, unambiguous place: a run folder of their
own under `Workbench/logs/` in the personal Workbench of the person
who starts the run. It replaces `Workbench/tmp/runs/`. On top of
that, FORMAT.md now specifies how the orchestrator determines that
Workbench when several folders are connected, that subagents only
get absolute paths, and that after every step it checks whether the
announced files really exist.

Background: so far, the Scratch path stood in FORMAT.md only as the
relative `Workbench/tmp/runs/…`. Subagents completed it into an
absolute path on their own — and several times picked a different
connected folder that happened to end in `Workbench/tmp` as well.
The intermediate files then sat outside the Workbench without anyone
noticing. Shared Workbenches add a second question: a workflow lives
in the shared Workbench, but the run belongs in the personal one.

Files to replace:

| File | URL | Local path |
|------|-----|-----------|
| Workflow format | https://holderbaum.io/werkstatt/en/bauanleitung/format.md | Workbench/Workflows/FORMAT.md |

Changed in FORMAT.md:

1. **Step acceptance (mandatory)** — new in the section "How a run
   works". After every step, the orchestrator uses `ls` on the
   absolute path to check that every `writes:` file exists. If one is
   missing, the run doesn't move on: the step is repeated, or the gap
   is reported at the next Hold. A wrong location shows up right away
   instead of weeks later.
2. **Source Workbench and home Workbench** — new subsection "Where a
   run lives" under "The three Zones". Two anchors: `<Source>` is the
   Workbench the workflow lives in (read only); `<Home>` is the
   personal Workbench of the person who starts the run (that's where
   the logs live). If you only work with one Workbench, the two
   coincide — nothing changes for you here.
3. **Home determination in five stages.** A candidate is every
   connected folder with a `CONTEXT.md` in its root. (1) Exactly one
   candidate → `<Home>`. (2) Candidates without write access drop out
   (`test -w`). (3) The personal one is the one whose root CONTEXT.md
   describes the person themselves (matched against name/email from
   the user context) — a heuristic. (4) Several personal ones and
   `<Source>` is among them → `<Source>`. (5) Otherwise ask before
   anything gets written. No marker in the CONTEXT.md is needed for
   this. The deciding stage is recorded in `run.md`.
4. **New run folder.** Before:

   ```
   Workbench/tmp/runs/<run>-<YYYY-MM-DDThh-mm-ss>/
   └── scratch/
   ```

   After:

   ```
   <Home>/Workbench/logs/<run>-<YYYY-MM-DDThh-mm-ss>/
   ├── run.md       ← home determination (stage), start, steps
   ├── scratch/     ← intermediate files
   └── result/      ← the result, if the workflow declares no Target of its own
   ```

   No more `tmp` in the path — the logs aren't throwaway material,
   they're the traceable record of a run.
5. **Path handover (mandatory for the orchestrator).** The timestamp
   always comes from `date '+%Y-%m-%dT%H-%M-%S'`, never set by hand.
   The orchestrator creates the run folder before the first step
   starts. Subagents get absolute paths only; a relative path in a
   subagent's instruction is a format error. Other connected folders
   with a similar name are never the place for a run.
6. **Target for shared workflows.** A workflow doesn't know `<Home>`.
   It declares its Target as `result/` in the run folder, or
   explicitly as a data store in its own Workbench (`<Source>/…`; not
   writable → Hold). Relative paths without a placeholder mean
   `<Source>/…`.

The Workbench rule and the Sparring Partner are unchanged. In the
build guide, only the folder `Workbench/logs/` has been added for new
installs, in STEP 1 and in the CONTEXT.md directory structure.

Directory / CONTEXT.md changes:

**Existing run folders stay untouched, where they are. The new rule
applies from the next run on.**

The steps in this section are **recommended, not required**. Your
existing workflows keep running without changes: from now on,
`scratch/…` automatically means the new run folder. Only workflows
that literally name `Workbench/tmp/runs/` keep writing to the old
place until you switch them over.

1. **Create the folder.** Create `Workbench/logs/`. (If it's
   missing, the orchestrator creates it on the first run.)

2. **Switch references in your own workflows.** Search
   `Workbench/Workflows/` and `Projects/*/Workflows/` for `tmp/runs`.
   Where a workflow uses it to set its Scratch path — typically in the
   `## Zones` section — replace `Workbench/tmp/runs/` with
   `Workbench/logs/`. That way new runs land in the new place.

   **Important for the agent carrying this out:** change files in the
   Workbench with the Edit/Write tools, not with `perl -i` or `sed -i`
   in the terminal. Deleting is blocked in mounted folders; in-place
   replacement from the terminal leaves `.fuse_hidden` leftovers there
   that can't be removed.

3. **Check shared workflows.** If a workflow lives in a shared
   Workbench, its Target should be either `result/` in the run folder
   or explicitly `<Source>/…`. A Target that silently assumes the
   personal Workbench should be switched over.

4. **Extend the directory structure in your CONTEXT.md.** Before:

   ```
   Workbench/
     Rules/               Guardrails for agent behavior
     Roles/               Specialists with their own personality
     Workflows/           Reusable procedures (SOPs)
   ```

   After:

   ```
   Workbench/
     Rules/               Guardrails for agent behavior
     Roles/               Specialists with their own personality
     Workflows/           Reusable procedures (SOPs)
     logs/                Run folders of the workflows (scratch, result)
   ```

Runs that started before the update finish in the old place; from the
next run on, the new place applies. Nothing gets moved.

Version after:

> Bootstrap info: This Workbench was created with the
> Holderbaum Workbench build guide v3.4 (28.09.2026).
> Current version and updates:
> https://holderbaum.io/werkstatt/en/bauanleitung.txt

===== HOLDERBAUM WERKSTATT · FILE FULLY LOADED =====
