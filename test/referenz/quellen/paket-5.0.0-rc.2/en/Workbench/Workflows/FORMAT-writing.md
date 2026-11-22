<!-- HOLDERBAUM-WERKSTATT · format-schreiben · v5.0 -->
# Workflow format — writing

Read only when a workflow is built or changed. What a run needs for running is in
[[Workbench/Workflows/FORMAT.md]] — together they are the grammar. A single workflow does not
explain the format again.

## Skeleton

```
---
name: …
version: …
status: …
role: …             (if the whole workflow runs in one role)
template: …         (if the workflow fills a fixed template)
---

# Title
One-sentence purpose.

## What your agent does       plain overview for the owner: the run, the halts,
                              what never happens without the human
## What matters               the few things quality depends on
## Trigger
## Before it starts           prerequisites
## Zones                      concrete source, scratch and target paths

## The steps
### 1. …
### Halt 1 — … · YOUR TURN
↻ Correction loop: …          (if check steps jump back)
### 2. …

## Reference                  task-specific checklists, sources
```

"What your agent does" and "What matters" are task-specific and short. Everything generic lives in
the format, not in the single workflow.

## A step

Heading (plain name), **intent sentence** (what happens — for the human), then the italic line with
demand, optionally `uses` and `Role`, then `reads`, `writes`, task.

- Several result files: one `writes:` line per file.
- Files the user supplies (lists, templates) live in the project folder and are listed under
  Zones → Source; the workflow names the path.
- After every `writes:` file comes its **form** (table with columns X | Y | Z; data sheet with
  fields …), so the next step knows what it gets.
- Choose **demand** honestly: handgrip for filing, ticking off, running a tool; judgment for
  synthesis and text; expert judgment only with low error tolerance and high stakes.
- **Fan-out:** `uses` says "several subagents in parallel, one per …". The step describes what *one*
  sub-agent does and how the partial files are merged. Never several writing into the same file.

## Check steps and correction loops

A check step carries no limit of its own; it only points into the loop ("on defects → back into
the correction loop, step N"). The limit is stated once, as its own line right before the block's
first step (in the skeleton: before step 2): block, number of passes, fixed exit (a halt). That way nested loops don't multiply.

## External effect

Everything that acts outside the files — mail, entry in a tool, publication — gets ⚠ and a halt
before it. That shows at a glance where a step changes the world.

## Self-contained

Everything a workflow relies on is named visibly.

- **Allowed:** named inputs (templates, data, knowledge sources), tools (scripts, connectors),
  running in a role, other workflows (also in parallel).
- **Forbidden:** relying on workbench operating rules that fire in the background. What the workflow
  needs of them, it carries itself.

## Plan mode and local additions

- If a workflow should be able to run without a chat (scheduled task, caller without a human), its
  § Zones carries the sentence "Plan mode possible: data paths go to `scratch/plan/`."
  Details: [[Workbench/Workflows/FORMAT-plan-mode.md]].
- If the workbench learns something about the format, it goes into
  `Workbench/Workflows/FORMAT-local.md`, never into one of the shipped FORMAT files — every update
  replaces those.

## Size

A workflow is loaded on every run: guide value 15,000 characters (workbench rule → context budget). No
change history in the workflow; run logs go into `run.md`. Rare parts (long checklists, examples)
go into a file next to it that a step reads when needed.
===== HOLDERBAUM WERKSTATT · FILE FULLY LOADED =====
