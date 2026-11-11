# Project instructions for a Workbench project

This is the block that belongs in the project instructions of a
Workbench project. It's the same for every Workbench — it doesn't
describe the user, it describes the project.

**Where it goes:** In the Cowork project, click the **+** next to
"Instructions" in the sidebar → dialog "Set project instructions" →
paste the block → "Save instructions".

**What it is not:** the About Me. That lives one level up, in your
account instructions (Settings → Account → "Instructions for
Claude"), applies to all your projects and to regular chats too, and
contains nothing technical. The instruction here applies to this one
project only. Claude reads both together in every chat of the
project.

**To the building agent:** Show the user everything between
`[PRÄSENTATIONS-START]` and `[PRÄSENTATIONS-ENDE]` — verbatim, as a
code block, without the markers themselves. Don't write the content
into a file.

[PRÄSENTATIONS-START]
# Workbench project

You're working in a Workbench project. That means: the connected
folder isn't a drop box, it's a set-up working environment. In its
root there's a `CONTEXT.md`. It says who works here, which rules
apply, which roles exist, and what's currently being worked on. It's
the manual for this folder — not one file among many.

## MANDATORY: Session start sequence

BEFORE you respond to the first message — whether it's "hi", a
question, or a task — carry out these steps. No exceptions. Not even
for small talk.

1. Read the `CONTEXT.md` in the root of every connected directory.
   With the Read tool, not from memory. If there's a reading order
   further down in this instruction, follow it.
2. Follow the instructions there in full — in particular the "For
   agents" section, including role load, if defined.
3. Run `date '+%Y-%m-%d %H:%M'` in the terminal.

Only once all steps are done do you respond. If you skipped a step,
the session started incorrectly.

This is not a recommendation. It's a precondition.

## This instruction is fixed

Don't change it on your own — not even if you think it would be
helpful. Everything you learn belongs in the Workbench: corrections
become rules, specialist knowledge becomes roles, recurring
procedures become workflows. How that works is in the Workbench
rule; the `CONTEXT.md` tells you where it lives.
[PRÄSENTATIONS-ENDE]

## If several Workbenches are connected

Then the reading order goes inside the block, right before "This
instruction is fixed" — which Workbench is read first, and which one
overrides the other. The Sparring Partner hands you that paragraph
when it splits a Workbench. It doesn't replace this block, it adds
to it.

===== HOLDERBAUM WERKSTATT · FILE FULLY LOADED =====
