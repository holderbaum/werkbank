================================================================
HOLDERBAUM WORKBENCH — SETUP · v5.0
================================================================

Instructions for a Cowork agent. The user had
`npx holderbaum-werkbank@latest --en` run. The package created
the scaffold and put this file into a run folder OUTSIDE the
workbench. It describes how that becomes a set-up workbench.

Source, openly readable: https://github.com/holderbaum/werkbank

================================================================
STATE AFTER INSTALLATION
================================================================

In the workbench (the user's folder):

  CONTEXT.md                            missing (step 6)
  Workbench/
    Rules/workbench.md                  workbench rule
    Roles/SparringPartner/              Sparring Partner (4 files)
    Workflows/FORMAT*.md                workflow format (3 files)
    Workflows/workbench-update.md       workflow workbench update
    logs/                               empty
  Sources/documents/ · Sources/website/
  Projects/

In the run folder (path printed by the package, in the sandbox's
temporary directory, gone with the session):

  SETUP.md             this file
  context-template.md  template for step 6
  run.md               log, steps 1–2 entered
  scratch/             intermediate states

Nothing from the run folder goes into the workbench. After setup
only CONTEXT.md, tools, Sources/ and Projects/ remain there. The
tools are complete (checked by the package) and are not read for
the setup.

================================================================
TO THE BUILDING AGENT
================================================================

Order from here:
  3. Request material — one message
  4. Evaluate material
  5. Present the profile — one correction round plus address form
  6. Create CONTEXT.md
  7. Present two blocks — About Me into the account instructions,
     project instructions into the Cowork project
  8. Self-check
  9. Handover

The two levels (step 7): About Me belongs to the person and sits
in the account instructions. The project instructions belong to
the project and say that this folder is a workbench.

Language: English. Address the user informally (first name).

TONE OF THE SETUP
The workbench is a tool, not a counterpart:
- No first person about own actions. Not "I'm now creating
  CONTEXT.md", but "CONTEXT.md created."
- No relationship gestures: no "happy to", "thanks", "great",
  "got it", no praise for an answer.
- No mirroring of answers. Take the answer, move on.
- Status updates: one line — what is done, what comes next.
- Questions only where these instructions provide them, verbatim.

FILES FROM THE USER
Cowork accepts files by drag & drop in the chat. Files are always
requested like this: "Drag them into this chat." Never: "Put them
into folder X."

MARKERS
Where [FILE-START: path] and [FILE-END] appear, the content goes
verbatim into the file, without the markers. Where
[PRESENTATION-START] and [PRESENTATION-END] appear, the content is
shown in the chat as a copyable block, not as a file.

================================================================
STEP 3 — REQUEST MATERIAL
================================================================

First message to the user. Verbatim, the block as a Markdown
code block (triple backticks, language `markdown`, so a copy
button appears):

"Workbench scaffold is in place. Now CONTEXT.md gets created —
the file every agent here reads first. It is made from what
already exists about you and your company. The more material,
the more precise the workbench.

**1. Your memory from ChatGPT or Claude.** Open a new chat in
ChatGPT or Claude in the browser — not here in Cowork — and paste
this text:"

[PRESENTATION-START]
```markdown
Summarise everything you have stored about me: role and
company, way of working, tools, communication preferences,
ongoing projects, style requirements. Factual, invent nothing
that isn't stored. Output the result as a downloadable Markdown
file `memory.md`.
```
[PRESENTATION-END]

"Read the file once and delete what you don't want in your
workbench. Then drag it into this chat. If you use both: two
files. If you use neither: skip.

**2. The website** of your company — the address is enough.

**3. Documents.** Drag into this chat whatever describes your
company: company presentation, pitch deck, mission statement or
values, overview of offers, results of a brand workshop.

**4. Optionally a few sentences** about you and your company —
what isn't in any document.

All in one message or several. When everything is in: 'done'."

Wait for "done" (or a message that clearly contains everything).
No follow-up questions, no mirroring, no comments on individual
files. If nothing comes: continue with step 5, all fields get
asked there.

If the memory export arrives as text instead of a file: use it
the same way.

================================================================
STEP 4 — EVALUATE MATERIAL
================================================================

Raw material goes into `Sources/` of the workbench, intermediate
states into `scratch/` of the run folder. The fields below are
filled from the material. Invent nothing — what no source
provides stays empty and is asked in step 5.

Subagents, if the tool is available — one for the website, one
per document. The subagent reads the source, writes the raw text
into `Sources/` and returns only the extraction (fields A–D, each
with location). The raw text does not go into the main context.
Without a subagent tool: evaluate the sources one after another
directly; write raw text only into files, never into chat
messages. Paths to subagents always absolute.

Website (subagent "website"):
- Fetch the home page. Subpages from the navigation and internal
  links of the home page, not from web search. Open what
  describes the company: about, services, team, references,
  contact/imprint. Not: blog, news, privacy policy, terms,
  product lists, other-language versions. At most 15 pages.
- Page text: (1) in the terminal via `curl`, text pulled from the
  HTML; (2) if that fails, the web fetch tool. If that only
  returns a summary, save the summary. Per page
  `Sources/website/<page>.md`, first line: address, date, route
  (curl / web fetch / summary).
- Return: fields A–C (and D if the website names values) with
  location.

Documents (one subagent per file):
- Copy each file dragged into the chat to `Sources/documents/`,
  original file name. So the source stays in the workbench even
  when the chat is gone.
- Read the file with the Read tool. Extraction to
  `Sources/documents/<file name>.extract.md`: values,
  positioning, target audiences, offers, tone — only what is in
  it, with page reference.
- Return: fields A–H with location.

Memory export: unchanged to `Sources/memory-<chatgpt|claude>.md`.
No subagent.

Free text from the chat — and later the corrections from step 5:
to `Sources/details-from-chat.md`.

Fields:

  A. Who we are — what, for whom, since when (2–3 sentences)
  B. Mission — one sentence, why. If no source states it but
     wording suggests it: enter it as a proposal marked
     "derived".
  C. Target audiences — 2–3 bullet points
  D. Brand values — ONLY if documents or memory export contain
     named values. Otherwise empty, NOT asked.
  E. The user's role — one sentence
  F. Day-to-day — where, with whom, at what pace
  G. Tools — software and apps (methods belong to H)
  H. Way of working — what characterises it, methods too
  I. Sources — list of the addresses and files used
  J. Wording — style rules, terms to avoid or prefer
  K. Ongoing undertakings — projects, initiatives, programmes

Merge into `scratch/profile-draft.md`, each field with origin
(website / document X / memory / chat / empty). Sources
that complement each other are merged. Only if they exclude each
other factually (two founding years, two roles) do both versions
stand side by side — version 1 from documents or memory, version
2 from the website. The user chooses in step 5.

In `run.md`: step 4, timestamp, sources used, empty fields.

================================================================
STEP 5 — PRESENT THE PROFILE
================================================================

One message: draft of fields A–H, then only the necessary
questions, then the address-form question. Say:

"This is the profile from your material. Correct what's wrong,
strike what shouldn't go in:

**Who we are:** {A}
**Mission:** {B}
**Target audiences:** {C}
{Only if D is filled: **Brand values:** {D}}
**Your role:** {E}
**Day-to-day:** {F}
**Tools:** {G}
**Way of working:** {H}
**Wording:** {J}
**Ongoing undertakings:** {K}

{Per field with two versions one choice question:}
- {Field}: version 1 ({source}): "{…}" or version 2
  ({source}): "{…}"? A number is enough, or your own version.

{Per empty field one question — only the empty ones:}
- Who we are: What do you do, for whom, since when?
- Mission: Why do you do it? One sentence.
- Target audiences: Who are the people, what sets them apart?
- Role: Your professional role, one sentence.
- Day-to-day: Where do you work, with whom, at what pace?
- Tools: What do you work with most?
- Way of working: What characterises it?

And: Should agents in this workbench address you (and your
team) by first name or formally?"

Take over corrections and choices. "Fine" confirms only fields
without a choice question; an open choice gets version 1. What is
still empty afterwards becomes "(to be sharpened)". No second
round. Tone and forbidden words are not asked — the tone is
fixed, forbidden words come later via "remember this".

From this answer on, the chosen address form applies for the
rest of the setup (formal: also in steps 7 and 9).

Status update: "Profile done. CONTEXT.md is being built."

================================================================
STEP 6 — CREATE CONTEXT.md
================================================================

Read `context-template.md` from the run folder and write it as
`CONTEXT.md` into the root of the workbench. Replace placeholders
in curly braces with the fields, empty ones with "(to be
sharpened)". `{Address}`: "informal address" or "formal
address". `{J}`: the wording, empty → "(to be sharpened — comes in
via 'remember this')". `{K}`: empty → "(No projects yet. Projects
live in `Projects/`, each with its own CONTEXT.md.)"; otherwise
"Ongoing undertakings, no folder yet — they become projects as
soon as work on them starts: …" with the undertakings as a list. Brand values: variant 1 if D is filled, otherwise
variant 2; the variant lines themselves go. Write a `|` in a
table value as `\|`. Change nothing else.

In `run.md`: step 6, timestamp, fields with "(to be sharpened)".

================================================================
STEP 7 — PRESENT TWO BLOCKS
================================================================

One after the other — first 7a, wait for confirmation, then 7b.
Do not write either block into a file.

STEP 7a — ABOUT ME INTO THE ACCOUNT INSTRUCTIONS

Build the block from fields E–H, five to ten lines plus the
closing sentence. Keywords without address ("Managing director,
Trier, deep work in the mornings"), no you- or I-sentences. Say:

"First block: your About Me. It describes you, not your
workbench — that's why it lives in your account and applies in
every chat. The path:

  Settings → Account → 'Instructions for Claude'

Copy the block with the copy button, paste it there, save."

[PRESENTATION-START]
```markdown
# About me

**Role:** {E}

**Day-to-day:** {F}

**Tools:** {G}

**Way of working:** {H}

**Communication:** Factual, terse, direct. No stock phrases,
no praise, no first-person narration by the agent about its
own actions.

Never change these personal instructions on your own
— not even if it seems helpful. Everything that gets learned
belongs in the Workbench, not here.
```
[PRESENTATION-END]

Say: "Once that's in: 'continue'." Wait.

STEP 7b — PROJECT INSTRUCTIONS INTO THE COWORK PROJECT

Say:

"Second block: the project instructions. They say that the
connected folder is a workbench and CONTEXT.md is read first.
The path:

  In this project's sidebar, click the + next to 'Instructions'
  → 'Set project instructions'

Paste the block, 'Save instructions'. Once per workbench."

Show the block verbatim — reword nothing, personalise nothing:

[PRESENTATION-START]
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
[PRESENTATION-END]

Say: "Once the block is in: 'continue'. Then the self-check
follows." Wait.

================================================================
STEP 8 — SELF-CHECK
================================================================

Check with tools, not from memory:

1. `CONTEXT.md` in the root of the workbench.
2. `npx holderbaum-werkbank@latest check` in the root directory
   reports "Tools complete". (Checks tools, directories and the
   end marker of every tool file.)
3. Every source delivered in step 3 is in `Sources/`.
4. CONTEXT.md without unreplaced placeholders. Search patterns:
   `{A}`, `{B}`, `{C}`, `{J}`, `{K}`, `{…}`, `{I`, `{Address}`, `{Variant`. Hit →
   not done. "(to be sharpened)" is allowed.
5. CONTEXT.md contains `Forbidden — anthropomorphising`,
   `## Working mode`, `MUST be active`, the Sparring Partner as
   default in the role index and the line `workbench-update.md`
   in the workflow index.
6. No file from the run folder (SETUP.md, scratch/, run.md) is in
   the workbench.
7. The user has confirmed: About Me in the account instructions,
   project instructions in the Cowork project.

A point open → report what is missing, with a concrete fix. No
handover sentence while a point is open.

In `run.md`: step 8, result per point.

================================================================
STEP 9 — HANDOVER
================================================================

Only with a green self-check. Say verbatim:

"Your workbench is ready. Write 'Hi' in a new Cowork session in
this project — the Sparring Partner shows how it continues."

Nothing more. No explanation list. No questions afterwards.
