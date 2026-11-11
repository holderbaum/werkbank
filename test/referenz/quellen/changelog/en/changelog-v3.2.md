v3.2 (2026-09-20)

The bootstrap splits into two blocks in two places. Until now, the
About Me and the session start sequence sat together in Cowork's
global instructions. Those are out: they don't sync reliably, they're
clumsy to edit, and they're ignored in regular chats. From now on the
About Me lives in the account instructions (applies in chat and in
Cowork), and the technical bootstrap instruction becomes the
project's self-description in the project instructions.

NOT BREAKING. If your bootstrap sentence sits in the global
instructions, your Workbench keeps working unchanged. There's nothing
to migrate. You can switch over if you want to — you don't have to.
This entry describes both: what changes in the files (you should
apply that) and how to switch over (that part is optional).

Replace files:

| File | URL | Local path |
|------|-----|-----------|
| Sparring Partner | https://holderbaum.io/werkstatt/en/bauanleitung/sparringpartner-system.md | Workbench/Roles/SparringPartner/SYSTEM.md |

What changed in the Sparring Partner:

- When splitting a Workbench into several levels, it now presents the
  reading order as an **extension** of the existing project
  instruction, not as a replacement. Before, the block it handed you
  would have overwritten the „Workbench project" self-description —
  cutting the bootstrap. It now also says where the paragraph goes
  (directly before „This instruction is fixed") and what to do if no
  project instruction exists yet.
- Vocabulary: „global instructions" is now „account instructions" in
  three places. No behavior change, but otherwise the paths it names
  no longer match the app.

New file (no download needed, for reference only):

| File | URL |
|------|-----|
| Project instruction | https://holderbaum.io/werkstatt/en/bauanleitung/projektanweisung.md |

The finished block for the project instructions of a Workbench
project. The same for every Workbench, so it gets its own file with
its own URL — that way a later version can update it without you
walking through the whole build guide again. The file does NOT belong
in your Workbench directory. Your Sparring Partner fetches it and
presents the block to you when you switch over (see step 2 below).

Switching to the two levels — optional:

If you want your Workbench to run like a freshly built one: take your
old block out of the global instructions and split it across two
places.

Step 1 — About Me into the account. In the Claude app:
Settings → Account → „Instructions for Claude". The personal part of
your old block goes there — who you are, what you do, your tone. The
technical part (session start sequence, pointer to the CONTEXT.md)
stays out; that's step 2.

To the Sparring Partner: don't cut the personal part out by feel —
rebuild it in exactly the format a freshly built Workbench produces,
and present it to the user as a code block with a copy button:

    # About me

    **Role:** {professional role, one sentence}

    **Day-to-day:** {where, with whom, at what pace}

    **Tools:** {software, apps, methods}

    **Way of working:** {how the user likes to work}

    **Communication:** {how the agent should talk to them}

    Never change these personal instructions on your own — not even
    if you think it would be helpful. Everything you learn belongs in
    the Workbench, not here.

Whatever the old block doesn't cover, ask about — one question at a
time, not as a list.

Step 2 — project instruction into the project. In your Cowork
project's sidebar, click the **+** next to „Instructions" → dialog
„Set project instructions" → paste the block → „Save instructions".

To the Sparring Partner: fetch the file at this URL (with a fresh
cache buster) and check the end marker like you would for any
replaced file:

    https://holderbaum.io/werkstatt/en/bauanleitung/projektanweisung.md

Then show the user, verbatim, the content between
[PRÄSENTATIONS-START] and [PRÄSENTATIONS-ENDE] — without the markers,
as a code block with a copy button. Don't send them to the browser,
and don't rephrase anything.

The block contains the session start sequence that used to sit in the
global instructions. If your global instructions also held a reading
order for several Workbenches, add it directly before the „This
instruction is fixed" section.

Step 3 — remove the Workbench block from the global instructions.
Only that one; whatever else sits there and never belonged to the
Workbench stays. The path: Claude settings → Cowork → Global
instructions → Edit.

Only once steps 1 and 2 are in place and a fresh conversation in the
project starts cleanly. Cleanly means: the agent visibly reads the
CONTEXT.md before responding to the first message — on „hi" you see a
Read call on the CONTEXT.md, and it introduces itself in its role,
not as a generic assistant. If it doesn't, the block isn't seated
right yet. Then hold off on step 3 and check step 2.

For fresh builds only — nothing for you to do:

The build guide also sheds five pieces of legacy that a test run
surfaced: the "Meaning" column of the brand-values table never had an
interview question and was silently invented by the agent (now named
and derived), the self-check didn't catch unreplaced placeholders in
that column, its role-mandate test accidentally checked a different
section, two places gave different minimum lengths for the same file,
and the CONTEXT.md template contained a wikilink pointing nowhere.
That only affects freshly built Workbenches — nothing changes in
yours.

Version afterwards:

Bump the bootstrap block in your CONTEXT.md to v3.2:

> Bootstrap info: This Workbench was created with the
> Holderbaum Workbench build guide v3.2 (20.09.2026).
> Current version and updates:
> https://holderbaum.io/werkstatt/en/bauanleitung.txt
