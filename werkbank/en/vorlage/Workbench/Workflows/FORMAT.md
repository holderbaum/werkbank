<!-- HOLDERBAUM-WERKSTATT · format · v5.0 -->
# Workflow format — running

The grammar by which an agent runs a workflow. A workflow is a Markdown file the agent reads
directly. To **write** or change workflows, additionally read
[[Workbench/Workflows/FORMAT-writing.md]].

## How a run works

A lean **orchestrator** works through the steps in order. Each step is carried out by a **fresh
subagent**: it sees only what is in the step's `reads:` and leaves its results as files
(`writes:`). `reads:` and `writes:` are the contract — nothing else passes from step to step. The
orchestrator does no expert work: it sequences, runs loop-backs and presents the halts. Subagents
get their instruction and their input files, not this text.

**Without a subagent tool** the orchestrator runs the steps itself — each step based only on its
`reads:` files, not on memory of earlier steps. A check step then recomputes against the source.
Note it in `run.md`.

**Role:** if the workflow names one (frontmatter `role:`), it is loaded; if it names none, none is
loaded — the workflow is the working mode.

**Step acceptance (mandatory):** after every step check with `ls` on the absolute path that every
`writes:` file exists. One missing: repeat the step or report the gap at the next halt.

## Zones and run folder

| Zone | Means | Who writes |
|------|-------|------------|
| **Source** | material that is only read | nobody |
| **Scratch** | this run's working area, intermediate results as real files | every step |
| **Target** | the finished result | only the last steps, only after human approval |

Every run gets its own folder in the workbench:

```
Workbench/logs/<workflow>-<YYYY-MM-DDThh-mm-ss>/
├── run.md        start, steps, acceptances
├── scratch/      intermediate files
└── result/       result, if the workflow names no target of its own
```

- Timestamp from `date '+%Y-%m-%dT%H-%M-%S'`, never set by hand. The orchestrator creates the
  folder before the first step.
- Subagents get **absolute paths only**. `scratch/…` in a workflow means this run's scratch.
- If more than one workbench is connected: before creating the folder read
  [[Workbench/Workflows/FORMAT-multiple-workbenches.md]] — it says which workbench the run folder
  belongs in.

## Reading a step

```
### 1. Review master data
Pulls the company data together from the sources.
*Demand: handgrip · uses: web (only for gaps) · Role: …*
- reads: …
- writes: `scratch/master-data.md` — form: …
- Task / rules / watch out for: …
```

- **Demand** sets the subagent's model strength: **handgrip** (simple action) → fast model.
  **Judgment** (synthesis, quality text) → standard. **Expert judgment** (expert level, high
  stakes, e.g. legal or external effect) → strongest model.
- **uses:** script, connector, web or another workflow. If it says "several subagents in parallel,
  one per …", each sub-agent writes its own partial file; the step merges them.
- **Role:** the subagent loads this role. `role:` in the frontmatter applies to the whole workflow.

## Step types

- **Normal step** — creates or updates a file.
- **CHECK STEP** — judges and can jump back.
- **Halt — YOUR TURN** — a human decides, the run waits. **(critical)** = never skipped. Strictly two
  stages: first **one** message with all content relevant to the decision (small results in full,
  large ones as a decision-ready summary plus reference), then the question. `presents:` means show
  in the chat, not name the file. A question or choice pop-up before the content is a format break.
  Change requests at a halt are written verbatim by the orchestrator to `scratch/halt-<N>.md`; the
  step that implements them reads that file.

**Correction loop.** `↻ Correction loop: steps 4–7 · at most 2 passes · then → halt 2`. Every
loop-back of a check step in the block uses one pass of the shared budget. Once it is used up, all
open findings go to the named halt. If the human sends the work back into the block, a fresh budget
starts.

**External effect and target (⚠).** A step marked ⚠ acts outside the scratch — into the target, a
mail, another system — and runs only after the halt that approves it. If the target folder is
missing, the step creates it.
===== HOLDERBAUM WERKSTATT · FILE FULLY LOADED =====
