# Workflow-Format

This is the **grammar** every workflow (SOP) is written in. Once you've read the format, you can
read any workflow — the individual workflow doesn't explain the format all over again.

A workflow is a **human-readable Markdown file** and, at the same time, the instruction by which an
agent drives the run. No compiler, no YAML, no second layer — the agent reads the file
directly.

---

## How a run works

A lean **orchestrator** reads the workflow and works through the steps in order. It runs each
step in a **fresh subagent** — which sees only what's in the step's `liest:`, and files its results
as files (`schreibt:`). Nothing leaks between steps that isn't explicitly handed over — `liest:`
and `schreibt:` are the **contract**.

The orchestrator itself does no domain work; it sequences, drives the loop-backs at
PRÜFSCHRITT points and puts the Halte in front of the human. Only the orchestrator needs the
full format text — the subagents of the individual steps get their instruction plus their
input files.

## The three Zonen

| Zone | Called | Who may write into it |
|------|--------|------------------------|
| **Quelle** | Material that is only read (engagement folder, templates, application data). | no one |
| **Kladde** | The working area of *this* run. Intermediate results are real, readable files — no invisible variables. | every step |
| **Ziel** | The finished result (e.g. a `Deliverables/` folder). | only the last steps, **and only after human sign-off** |

The Kladde lives in its own run folder with a second-precise timestamp, so that multiple runs
on the same day don't overwrite each other:

```
Werkbank/tmp/runs/<lauf>-<YYYY-MM-DDThh-mm-ss>/   ← home of the run
├── kladde/                                        ← the scratchpad (intermediate files)
└── (room for other run material, e.g. a run log)
```

In a workflow, `kladde/…` means a file in this run's `kladde/` folder.

## Anatomy of a step

Every step consists of a **heading** (plain-text name), an **intent sentence** (what happens
— for the human) and an *italic line* (for execution):

> ### 1. Stammdaten sichten
> Pulls the company data together from the Quellen.
> *Anspruch: Handgriff · nutzt: Web (only for gaps)*
> - **liest:** …
> - **schreibt:** `kladde/stammdaten.md` — *Form:* …
> - **Auftrag / Regeln / Achte auf:** … (as needed, in plain text)

At `schreibt:`, the file is followed by a brief note of its **Form** (table with columns X|Y|Z; data
sheet with fields …), so the next step knows what it's getting.

### Anspruch (what the step demands → drives the model strength)

- **Handgriff** — simple action: run a tool, file a document, tick off against a fixed list.
- **Urteil** — genuine synthesis: take in a lot of context, weigh it, produce quality text.
- **Fachurteil** — expert judgment with low error tolerance and high consequence (e.g. law, Außenwirkung).

### nutzt (optional — what the subagent picks up)

A script, a connector, the web, or **another workflow** (also multiple in parallel, see
fan-out). If nothing is stated, the subagent works only with its inputs.

### Rolle (optional)

A step can run **in a defined role** — the subagent loads it and works from its stance.
Stated as its own entry on the step (`Rolle: …`) or, if the whole workflow
runs in a role, in the frontmatter (`rolle: …`).

## Three kinds of steps

- **Normal step** — creates or updates a file.
- **PRÜFSCHRITT** — checks a result, renders a judgment and can **loop back** ("on defects → back into the Korrekturschleife"). See below.
- **Halt — DU BIST DRAN** — a human decides. The run halts and waits. Marked **(kritisch)** = never skipped (e.g. before Außenwirkung or an official document). **A Halt outputs its content in the chat first** — for small artifacts in full (the table, the warnings in plain text), for large ones a decision-ready summary plus a pointer to the file. *Only then* the question. `legt vor:` means "show it in the conversation," not "name the filename" — the human must be able to decide without opening a file. The sequence is **mandatorily two-stage and in this order**: (1) **one** chat message with the full decision-relevant content (for large artifacts the decision-ready summary) — *not a mere short version as a placeholder*; (2) **only after that** the question. A question or a selection pop-up before the full content is in the chat is a format break. If a pop-up is used, it comes exclusively after stage (1) — never before, never in place of the content.

## Korrekturschleife

When one or more PRÜFSCHRITT steps have the same block corrected, the block is declared a
**Korrekturschleife** — with *one shared* budget and a fixed exit. Notation:
a dedicated line right before the first step of the block:

```
↻ Korrekturschleife: Schritte 4–7 · höchstens 2 Durchläufe · danach → Halt 2
```

Rules:

- Every PRÜFSCHRITT in the block that loops back consumes **one** pass of the shared budget — no matter which PRÜFSCHRITT. That way nested loops don't multiply.
- Once the budget is exhausted, nothing loops back anymore; all open findings go to the named Halt.
- If a human sends the work back into the block at a Halt, a **fresh** budget begins — the human is the backstop.
- PRÜFSCHRITT steps carry **no** limit of their own; they only point into the loop: "on defects → back into the Korrekturschleife (step N)."

## Parallel execution (fan-out)

A step may split its work across multiple subagents that run **in parallel** — typically
one per element (e.g. per session). That's stated in the `nutzt` line ("multiple subagents in
parallel, one per …"). The step then describes two things: what *one* partial agent does, and how the
partial results are merged. **Each partial agent writes into its own partial file; the
step merges them at the end** — multiple agents never write into the same file at once.

## Außenwirkung

Anything that acts **outside the files** — writing to a foreign system, an email, an entry in
a tool — is marked with **⚠**. That way it's clear at a glance where a step changes the world
and not just the Kladde.

## Self-contained

A workflow stands on its own — everything it relies on is **visibly named**:

- **Allowed:** named inputs (templates, data, knowledge sources), tools (scripts, connectors), running *in a role*, and instantiating other workflows (also in parallel as fan-out).
- **Forbidden:** relying on Werkbank *operating rules* (the ambient rule system that fires in the background). Such rules live on a different layer; the workflow instead carries what it needs inline.

FORMAT.md itself is the grammar, not a dependency.

## The human reading layer

Every workflow carries two short, **task-specific** sections at the top for the owner:

- **"Was dein Agent tut"** — the run in plain text, names the Halte and what never happens without the human.
- **"Worauf es ankommt"** — the few things the quality hinges on.

Everything **generic** (this text here) does not belong in the individual workflow — it lives here, once.

## Skeleton of a workflow

```
---
name: …
version: …
status: …
rolle: …            (if the whole workflow runs in a role)
template: …          (if the workflow fills a fixed template)
---

# Titel
One-sentence purpose.

## Was dein Agent tut         (plain-text overview, names the Halte)
## Worauf es ankommt          (the quality levers)
## Trigger
## Bevor es losgeht           (prerequisites)
## Zonen                      (this workflow's concrete Quelle/Kladde/Ziel paths)

## Die Schritte
### 1. …                      (intent sentence · italic Anspruch line · liest/schreibt/Auftrag)
### Halt 1 — … · DU BIST DRAN
↻ Korrekturschleife: …        (if PRÜFSCHRITT steps loop back)
### 2. …
…

## Referenz                   (task-specific checklists, sources)
```
