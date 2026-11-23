---
name: workbench-update
version: 5.0
status: active
---
<!-- HOLDERBAUM-WERKSTATT · workflow-werkbank-update · v5.0 -->

# Workbench update
Brings this workbench to the latest version of the package `holderbaum-werkbank`.

## What your agent does

It asks the package whether there is a newer version and asks you once whether to apply it (**halt 1**). After that it does everything itself: new tools, your CONTEXT.md in the new structure — your content, rules, roles, workflows and projects stay as they are. At the end a short report. Everything is backed up and can be reverted with "undo the update".

## What matters

- The user wants a current workbench and to lose nothing. No technical questions, no file paths in the chat. Where something needs deciding: the obvious solution, when in doubt keep what is the user's own.
- The instructions come from the package (`UPDATE.md`), not from memory.

## Trigger

"Update the workbench", "workbench update", "undo the update" (→ reference).

## Before it starts

- The package finds the workbench among the connected folders by itself. If it lists several, ask the user which one is meant and run again with `--dir <path>`.
- If a command fails: say in one sentence that the update doesn't work right now, error message below. Rebuild nothing by hand.

## Zones

- **Source:** the package `holderbaum-werkbank`.
- **Scratch:** run folder `Workbench/logs/workbench-update-<timestamp>/` (created by the package: `UPDATE.md`, `run.md`, backup `alt/` and file list `before.txt`).
- **Target:** tool files and CONTEXT.md of the workbench.

## The steps

### 1. Look
*Handgrip*
`npx holderbaum-werkbank@latest update --check`. Changes nothing.
Already current → "Your workbench is up to date." End.

### Halt 1 — Apply? · YOUR TURN
The agent presents, in two sentences of everyday language: "There is an update for your workbench. Your own content, rules, roles, workflows and projects are kept." If the package reported own changes to tool files, a third one follows: "Your own adjustments to the Sparring Partner or the workbench rule are carried over." Then the question: "Apply?"

### 2. Apply and work through
*Judgment*
`npx holderbaum-werkbank@latest update`, then read `UPDATE.md` from the run folder (path is in the output) completely with the Read tool and follow it. No further questions except those `UPDATE.md` explicitly provides.

### 3. Report
*Handgrip*
As in `UPDATE.md` step D: three to five lines, everyday language.

## Reference

**Undo the update:** First one sentence to the user: "The files the update changed go back to their old state — including the workbench description; what was changed in it since then is lost. Whatever was newly created since the update stays." Then `npx holderbaum-werkbank@latest update --undo` in the root directory. The command deletes only what the package created during the update. If it names files created since the update that were kept: if one of them is listed in the update's `run.md` as created during the update (e.g. an own rule from step A), offer the user to remove it; all others stay without asking. If it reports files it was not allowed to delete: remove them after approval. One-sentence report.
===== HOLDERBAUM WERKSTATT · FILE FULLY LOADED =====
