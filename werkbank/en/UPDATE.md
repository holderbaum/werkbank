================================================================
HOLDERBAUM WORKBENCH — UPDATE
================================================================

Instructions for the agent after `npx holderbaum-werkbank@latest
update`. The package has already replaced the tool files and
backed up the old versions including CONTEXT.md in `alt/` of this
run folder.

THE USER WANTS TWO THINGS: a current workbench, and to lose
nothing they customised. They don't care about the technology.
Therefore:
- No technical questions. Where a decision is needed: make the
  obvious one (when in doubt: keep what is the user's own) and
  name it in one sentence in the report.
- No checklists, file paths, version details or jargon in the
  chat — unless the user asks. Only exception: the version sentence
  in the report (step D).
- Everything is reversible: `alt/` holds the files the update
  touches, `before.txt` the list of all files before it; "undo the
  update" restores the state before the update with them.
- `CLAUDE.md` in the root is a tool file for Claude Code (it loads
  CONTEXT.md). Do nothing, don't mention it in the chat.
- These instructions take precedence over the currently loaded role
  and the old workbench rule. The user's approval was given with
  the update request — including the changes to CONTEXT.md.

================================================================
FINDINGS OF THE PACKAGE (for the agent, not for the chat)
================================================================

{BEFUND}

================================================================
STEP A — OWN CHANGES TO TOOL FILES
================================================================

{GEAENDERT}

If a FORMAT.md is in the list of adjusted files above — exception: own lines from an old FORMAT.md don't go into a rule
but into `Workbench/Workflows/FORMAT-local.md` (create it with the heading
"# Workflow format — local additions"). What v5 already covers goes. If no FORMAT.md is
in that list (or there is no list): skip this paragraph.

================================================================
STEP B — BRING CONTEXT.md TO THE NEW STRUCTURE
================================================================

{KONTEXT_MODUS}

Without asking. Read CONTEXT.md and `context-template.md` (in this
run folder) with the Read tool. Goal: the template's structure
with the user's content.

Stays as it is: who we are, mission, target audiences, brand
values, sources, all of the user's own always rules, all entries
for own rules, roles, workflows and projects, a reading order,
anything the template doesn't know.

Gets aligned (only what differs):
 1. Bootstrap block (lines with "> Bootstrap info") as in the
    template. Old versions name a build guide or holderbaum.io —
    both go.
 2. The paragraph "This workbench is an agentic system …" right
    after it.
 3. § Always rules: blocks "Language" and "Forbidden —
    anthropomorphising" from the template; `{Address}` from the
    previous address line (informal / formal). The previous lines
    (e.g. "Tone", "Avoid", own ones — where present) go under
    "Further"; an old line on the form of address goes, because
    `{Address}` replaces it.
 4. Under "Further" the lines "Files from the user" and "Keep it
    lean" from the template, if missing. The size of CONTEXT.md plays
    no role in the update — don't trim, don't mention.
 5. "## Working mode" from the template; a section "## Role
    mandate" (or "## Rollenzwang") is replaced by it.
 6. Role index: Sparring Partner row as in the template.
 7. "## Workflows" (formerly "## Aufgaben") with the row
    "Workbench update"; an empty note "(No … yet)" becomes the
    table.
 8. "## Directory structure" matching the folders that exist.
 9. "## For agents" as in the template; own additions there stay.
10. No reference to holderbaum.io as the source for updates or the
    build guide. Other mentions (website, mail, links) stay.
11. Rule index: the workbench rule row as in the template. Not own
    triggers but from old templates — they leave the row, the
    workbench rule itself knows them: "add a workflow", "write
    an SOP", "make that a workflow", "exactly like that", "perfect,
    remember this", "gives feedback" (and their German forms in old
    German-structured workbenches). Any other trigger that stood
    there in addition is the user's own and stays; old terms in it
    ("task", "Aufgabe", "SOP") become "workflow".
12. If a topic is in both template and existing file (e.g. file
    names, references), the template's version applies; what the
    user had added to it stays as an own sentence.
13. Add missing template lines under "Further" (e.g. "Projects").
    The section "## Sources" only if the folder `Sources/` exists.
14. Language: the language line names the language in which the
    user writes their content — not automatically the template's;
    mixed: the language of most of their own content.
    Template headings in the template's language; the user's own
    sections and terms (e.g. "Operative Ressourcen") stay as they
    are.
15. References to files that don't exist: remove them and don't
    mention them in the report, unless it was the user's own file
    (then: one-sentence note). References into `Sources/` always
    stay.
16. Line "Time zone" under "Further": derive the zone from the
    workbench's content (company seat, address); nothing found →
    `Europe/London`. Don't ask.

Then read CONTEXT.md again: is every piece of the user's content
from `alt/` still there? Something missing → put it back.

{UMZUG_HINWEIS}

================================================================
STEP C — WHAT THE USER HAS TO DO THEMSELVES
================================================================

{ANWEISUNGEN}

If something has to be done above: explain it in one sentence of
everyday words, show the line or the block, name the path, wait for the user's answer — "done",
"yes" or "ok" count the same. If nothing has to be done: mention
nothing.

================================================================
STEP D — WRAP-UP
================================================================

In `run.md` of this folder: what happened in steps A–C and which
files were newly created in steps A–B (e.g. an own rule).

Report to the user, three to five lines, everyday language, no
file names or paths:
- If the workbench came from a version before v5.0 (findings:
  installed version): "Workbench is on v5.0." and in one sentence
  what's new: leaner roles, files by drag & drop into the chat,
  future updates with "update the workbench". If it was already on
  v5.0: "Workbench is updated."
- If step C asked for something and the user confirmed it: in one
  sentence what it brings (e.g. "The time is now right
  everywhere.").
- That own rules, roles, workflows, projects and everything the
  workbench says about you and your company are kept — and if own
  additions were carried over in step A, in one sentence what
  became of them.
- "Undoing works any time: 'undo the update'."

If the user later says "undo the update": the workflow
`workbench-update`, reference.
