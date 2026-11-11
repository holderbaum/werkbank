<!-- HOLDERBAUM-WERKSTATT · format · v5.0 -->
# Workflow format — running

The grammar by which an agent runs a workflow. A workflow is a Markdown file the agent reads
directly. Additionally, when needed:
- **writing** or changing workflows → [[Workbench/Workflows/FORMAT-writing.md]]
- run in **plan mode** → [[Workbench/Workflows/FORMAT-plan-mode.md]]
- **more than one workbench** connected → [[Workbench/Workflows/FORMAT-multiple-workbenches.md]]
- If `Workbench/Workflows/FORMAT-local.md` exists: always read it too; on conflict it wins.

`<Zone>` is the time zone from CONTEXT.md (always rules). Every time a run writes or compares is
created with `TZ=<Zone>`.

## How a run works

An **orchestrator** works through the steps in order. Each step is carried out by a **fresh
subagent**: it sees only what is in the step's `reads:` and leaves its results as files
(`writes:`). `reads:` and `writes:` are the contract.

**No step in the orchestrator.** The orchestrator creates the run folder and keeps `run.md`, hands
over inputs, accepts, presents halts and passes on chat output. Nothing else — not even a fix to a
`writes:` file: correcting is a new pass of the step in a fresh subagent, with the finding in
`reads:`. A step whose result is a chat message writes it as a scratch file; the orchestrator
outputs it unchanged.

**Inputs from the chat.** If an input exists only in the conversation (pasted text, correction,
change request at a halt), the orchestrator stores it verbatim as `scratch/input-<name>.md` and
passes the absolute path to the step that needs it.

**No subagent startable → halt.** At start, check whether subagents with model choice can be
started. No — or a start fails later: the run halts before the step, row in the step table
`not started — no subagent startable`, message to the human (in plan mode under `## Questions`). No
substitute by running it yourself, no self-review in the check step. Continue only in an
environment with subagents or on the human's explicit instruction for exactly this run — quote the
instruction in the step table.

**Role.** If the workflow names one (frontmatter `role:` or at the step), the subagent loads it. If
it names none, none is loaded — the workflow is the working mode.

**Demand → model.** Handgrip → fast model (e.g. haiku). Judgment → standard (sonnet). Expert
judgment → strongest (opus). Deviation only on the human's instruction, with quote.

## Run folder

```
Workbench/logs/<workflow>-<YYYY-MM-DDThh-mm-ss>-<6 chars>/
├── run.md        start, plan mode on/off, step table, result
├── scratch/      intermediate files, inputs
└── result/       result, if the workflow names no target of its own
```

- Timestamp: `TZ=<Zone> date '+%Y-%m-%dT%H-%M-%S'`. Six chars:
  `LC_ALL=C tr -dc 'a-z0-9' </dev/urandom | head -c 6`. Create with `mkdir` **without** `-p` — if the
  folder exists, draw new chars.
- The orchestrator creates it before the first step. Start time in `run.md` as
  `TZ=<Zone> date '+%Y-%m-%d %H:%M:%S'`. At the end one line `Result: <one sentence>`.
- Subagents get **absolute paths only**. `scratch/…` in a workflow means this run's scratch.

**Step table** in `run.md`, one row per started step, right after it ends:

| Step | Demand | Model | Subagent ID | writes: files | Acceptance |
|---|---|---|---|---|---|

The subagent ID is the identifier from starting the subagent. Empty, "orchestrator", "self" or the
same ID in two rows are format errors. Fan-out: all IDs in the row. Repeats get their own row
(`2 (2)`).

## Changing files

Only in place: read-modify-write on the same file or `sed -i`. No `*.tmp`, `*.new`, `*.bak*`
copies, no swapping via `mv`. **Nothing is deleted** (deleting in a workbench is final): if a step
needs a deletion, it reports it as a question. This line goes verbatim into every subagent task that
writes into the workbench:

> Change files only in place (read-modify-write or `sed -i`); no `*.tmp`/`*.new`/`*.bak*` copies, no swapping via `mv`, delete nothing — report any deletion need as a question.

## Step acceptance

After every step the orchestrator checks:
1. Every `writes:` file exists (`ls` on the absolute path).
2. The row in the step table: present, subagent ID valid, model matches demand.
3. No leftover files: per folder of a `writes:` file,
   `TZ=<Zone> find "<folder>" -maxdepth 1 -newermt "<start>" \( -name '*.tmp' -o -name '*.new' -o -name '*.bak*' \)`
   returns nothing.
4. In plan mode: no original touched (check in [[Workbench/Workflows/FORMAT-plan-mode.md]]).

If (1) or (2) fails: repeat the step in a fresh subagent (uses no correction-loop budget) or report
the gap at the next halt. A hit in (3) or (4) is neither deleted nor fixed by repeating: acceptance
`✗ <finding> <path>`, the run halts, report as a question. All passed: `✓`.

## Zones

| Zone | Means | Who writes |
|------|-------|------------|
| **Source** | material that is only read | nobody |
| **Scratch** | this run's working area | every step |
| **Target** | the finished result | only the last steps, only after approval |

## Step types

- **Normal step** — creates or updates a file.
- **CHECK STEP** — judges and can jump back.
- **Halt — YOUR TURN** — a human decides, the run waits. **(critical)** = never skipped. Two
  stages: first **one** message with all content relevant to the decision (small in full, large as a
  decision-ready summary plus reference), then the question. `presents:` means show in the chat. A
  question before the content is a format break.

**Correction loop.** `↻ Correction loop: steps 4–7 · at most 2 passes · then → halt 2`. Every
loop-back of a check step in the block uses one pass of the shared budget; used up → all open
findings go to the named halt. If the human sends the work back, a fresh budget starts.

**External effect and target (⚠).** A step marked ⚠ acts outside the scratch — into the target, a
mail, another system — and runs only after the halt that approves it. If the target folder is
missing, the step creates it.

## Called workflow

If a step calls another workflow (`uses:` …), the caller's orchestrator steers its steps itself:
each in a fresh subagent, own run folder, own step table. The calling step's row is the bracket:
subagent ID `Bracket → <run folder of the called workflow>`; accepted when its `run.md` shows `✓` or a
halt for each step. What the step does itself before or after the call runs in its own subagent
each (`2 (before)`, `2 (after)`). If the caller runs in plan mode, the called workflow does too. A
subagent never starts a workflow.
===== HOLDERBAUM WERKSTATT · FILE FULLY LOADED =====
