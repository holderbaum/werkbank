<!-- HOLDERBAUM-WERKSTATT · format · v4.0 -->
# Workflow format

This is the **grammar** every workflow (SOP) is written in. Once you've read the format, you can
read any workflow — the individual workflow doesn't explain the format all over again.

A workflow is a **human-readable Markdown file** and, at the same time, the instruction by which an
agent drives the run. No compiler, no YAML, no second layer — the agent reads the file
directly.

---

## How a run works

A lean **orchestrator** reads the workflow and works through the steps in order. It runs each
step in a **fresh subagent** — which sees only what's in the step's `reads:`, and files its results
as files (`writes:`). Nothing leaks between steps that isn't explicitly handed over — `reads:`
and `writes:` are the **contract**.

The orchestrator itself does no domain work; it sequences, drives the loop-backs at
CHECK STEP points and puts the Holds in front of the human. Only the orchestrator needs the
full format text — the subagents of the individual steps get their instruction plus their
input files.

**Step acceptance (mandatory):** After every step, the orchestrator uses `ls` on the absolute path
to check that every `writes:` file of the step exists. If one is missing, the run doesn't move on —
the step is repeated, or the gap is reported at the next Hold.

## The three Zones

| Zone | Called | Who may write into it |
|------|--------|------------------------|
| **Source** | Material that is only read (engagement folder, templates, application data). | no one |
| **Scratch** | The working area of *this* run. Intermediate results are real, readable files — no invisible variables. | every step |
| **Target** | The finished result (e.g. a `Deliverables/` folder). | only the last steps, **and only after human sign-off** |

### Where a run lives: source Workbench and home Workbench

A workflow isn't necessarily defined and run in the same Workbench. A shared workflow lives in a
shared Workbench, but runs for a person who works in their own. That's why there are two anchors:

- **`<Source>`** — the Workbench the workflow lives in. Templates, references and the workflow
  itself are resolved relative to it. Read only.
- **`<Home>`** — the personal Workbench of the person who starts the run. That's where the logs live.

**Determining `<Home>`** — at run start, the orchestrator checks in this order; the first
unambiguous result wins. A candidate is every connected folder with a `CONTEXT.md` in its root.

1. Exactly one candidate → that's `<Home>`.
2. Candidates without write access drop out (`test -w` on the folder, writes nothing). Exactly one left → `<Home>`.
3. Among the remaining ones, the personal one is the one whose root CONTEXT.md describes the person
   themselves (matched against name/email from the session's user context). Exactly one match → `<Home>`. Heuristic.
4. Several personal ones and `<Source>` is among them → `<Source>`.
5. Otherwise: ask the human before anything gets written.

Which stage decided is recorded in `run.md` in the run folder (see below). Never fall back: if
writing to `<Home>` fails, the run stops.

**Run folder.** Every run gets its own folder with a second-precise timestamp, so that multiple
runs on the same day don't overwrite each other:

```
<Home>/Workbench/logs/<run>-<YYYY-MM-DDThh-mm-ss>/   ← home of the run
├── run.md                                          ← home determination (stage), start, steps
├── scratch/                                        ← the scratchpad (intermediate files)
└── result/                                         ← the run's result, if the workflow declares no Target of its own
```

If `<Home>/Workbench/` is missing, the orchestrator creates it.

**Mandatory for the orchestrator (path handover):**

- The timestamp comes from `date '+%Y-%m-%dT%H-%M-%S'` — never set it yourself.
- The orchestrator creates the run folder itself before the first step starts.
- Subagents get **absolute paths only** (run folder, Scratch, Source, Target). A relative path in a
  subagent's instruction is a format error.
- Other connected folders with a similar name (e.g. a separately connected exchange folder that also
  ends in `Workbench/tmp`) are never the place for a run.

**Target for shared workflows.** A workflow doesn't know `<Home>`. So it declares its Target either
as `result/` in the run folder or as a data store in its own Workbench (`<Source>/…`, only when
explicitly declared; not writable → Hold). Where a result ultimately belongs in `<Home>` is settled
by the home Workbench through its own CONTEXT.md, or by the human.

In a workflow, `scratch/…` means a file in this run's `scratch/` folder. Relative paths in a
workflow without a placeholder mean `<Source>/…`; in a Workbench that is both Source and Home, the
two coincide.

## Anatomy of a step

Every step consists of a **heading** (plain-text name), an **intent sentence** (what happens
— for the human) and an *italic line* (for execution):

> ### 1. Review master data
> Pulls the company data together from the Sources.
> *Rigor: Reflex · uses: Web (only for gaps)*
> - **reads:** …
> - **writes:** `scratch/master-data.md` — *Form:* …
> - **Task / Rules / Watch for:** … (as needed, in plain text)

At `writes:`, the file is followed by a brief note of its **Form** (table with columns X|Y|Z; data
sheet with fields …), so the next step knows what it's getting.

### Rigor (what the step demands → drives the model strength)

- **Reflex** — simple action: run a tool, file a document, tick off against a fixed list.
- **Judgment** — genuine synthesis: take in a lot of context, weigh it, produce quality text.
- **Expert judgment** — expert judgment with low error tolerance and high consequence (e.g. law, External effect).

### uses (optional — what the subagent picks up)

A script, a connector, the web, or **another workflow** (also multiple in parallel, see
fan-out). If nothing is stated, the subagent works only with its inputs.

### Role (optional)

A step can run **in a defined role** — the subagent loads it and works from its stance.
Stated as its own entry on the step (`Role: …`) or, if the whole workflow
runs in a role, in the frontmatter (`role: …`).

## Three kinds of steps

- **Normal step** — creates or updates a file.
- **CHECK STEP** — checks a result, renders a judgment and can **loop back** ("on defects → back into the Correction loop"). See below.
- **Hold — YOUR TURN** — a human decides. The run halts and waits. Marked **(critical)** = never skipped (e.g. before External effect or an official document). **A Hold outputs its content in the chat first** — for small artifacts in full (the table, the warnings in plain text), for large ones a decision-ready summary plus a pointer to the file. *Only then* the question. `presents:` means "show it in the conversation," not "name the filename" — the human must be able to decide without opening a file. The sequence is **mandatorily two-stage and in this order**: (1) **one** chat message with the full decision-relevant content (for large artifacts the decision-ready summary) — *not a mere short version as a placeholder*; (2) **only after that** the question. A question or a selection pop-up before the full content is in the chat is a format break. If a pop-up is used, it comes exclusively after stage (1) — never before, never in place of the content.

## Correction loop

When one or more CHECK STEP steps have the same block corrected, the block is declared a
**Correction loop** — with *one shared* budget and a fixed exit. Notation:
a dedicated line right before the first step of the block:

```
↻ Correction loop: Steps 4–7 · at most 2 passes · then → Hold 2
```

Rules:

- Every CHECK STEP in the block that loops back consumes **one** pass of the shared budget — no matter which CHECK STEP. That way nested loops don't multiply.
- Once the budget is exhausted, nothing loops back anymore; all open findings go to the named Hold.
- If a human sends the work back into the block at a Hold, a **fresh** budget begins — the human is the backstop.
- CHECK STEP steps carry **no** limit of their own; they only point into the loop: "on defects → back into the Correction loop (step N)."

## Parallel execution (fan-out)

A step may split its work across multiple subagents that run **in parallel** — typically
one per element (e.g. per session). That's stated in the `uses` line ("multiple subagents in
parallel, one per …"). The step then describes two things: what *one* partial agent does, and how the
partial results are merged. **Each partial agent writes into its own partial file; the
step merges them at the end** — multiple agents never write into the same file at once.

## External effect

Anything that acts **outside the files** — writing to a foreign system, an email, an entry in
a tool — is marked with **⚠**. That way it's clear at a glance where a step changes the world
and not just the Scratch.

## Self-contained

A workflow stands on its own — everything it relies on is **visibly named**:

- **Allowed:** named inputs (templates, data, knowledge sources), tools (scripts, connectors), running *in a role*, and instantiating other workflows (also in parallel as fan-out).
- **Forbidden:** relying on Workbench *operating rules* (the ambient rule system that fires in the background). Such rules live on a different layer; the workflow instead carries what it needs inline.

FORMAT.md itself is the grammar, not a dependency.

## The human reading layer

Every workflow carries two short, **task-specific** sections at the top for the owner:

- **"What your agent does"** — the run in plain text, names the Holds and what never happens without the human.
- **"What matters"** — the few things the quality hinges on.

Everything **generic** (this text here) does not belong in the individual workflow — it lives here, once.

## Skeleton of a workflow

```
---
name: …
version: …
status: …
role: …             (if the whole workflow runs in a role)
template: …          (if the workflow fills a fixed template)
---

# Title
One-sentence purpose.

## What your agent does       (plain-text overview, names the Holds)
## What matters               (the quality levers)
## Trigger
## Before you start           (prerequisites)
## Zones                      (this workflow's concrete Source/Scratch/Target paths)

## The steps
### 1. …                      (intent sentence · italic Rigor line · reads/writes/Task)
### Hold 1 — … · YOUR TURN
↻ Correction loop: …          (if CHECK STEP steps loop back)
### 2. …
…

## Reference                  (task-specific checklists, sources)
```
===== HOLDERBAUM WERKSTATT · FILE FULLY LOADED =====
