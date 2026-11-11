<!-- HOLDERBAUM-WERKSTATT · werkbank-regel · v5.0 -->
# Workbench

Meta-rule of the Starter Workbench. The central point of contact for every
change to the system — whether it's a correction, praise, feedback, or an
explicit request for a rule, role, or workflow.

## Trigger

**Explicit:** "remember this", "that was a mistake", "not like that",
"from now on always like this", "never again", "make a rule out of it",
"create a rule", "add a role", "new role", "add a workflow",
"write an SOP", "make that a workflow"

**Correction:** "That doesn't belong here", "that's too much",
"you're doing too much X", "that wasn't what I wanted",
"stop doing that"

**Praise:** "exactly like that", "perfect, remember this", "that's how I
always want it", or context: the user explicitly confirms a behavior
as permanently desired

**Implicit:** the user corrects the agent's behavior, the user
repeats an instruction the agent ignored, the user
phrases a generalization after a correction
("in general", "always", "from now on")

**Meta-feedback:** "The system is overreacting", "you're doing too
much X", the user gives feedback about the behavior of the agent
or of the system itself

## Process

When a trigger fires:

1. **Pause.** Don't immediately create a rule, don't open a role,
   don't write a workflow. Think first.

2. **Read the context.** Which role is currently active? Is a
   workflow being processed? Or is it a general case?

3. **Educated Guess.** Decide where the change belongs:

   - **Rule** — the feedback applies to all roles and
     situations. Example: "No emojis." → Global rule.
   - **Role** — the feedback applies only in the context of the active
     role. Example: "You're asking too many follow-up questions" while
     the copywriter is active → Fix in the SYSTEM.md of the
     copywriter role.

     **Exception — the Sparring Partner:** The Sparring Partner must
     never be changed — workbench updates overwrite its folder
     `Workbench/Roles/SparringPartner/` (as well as this rule,
     the shipped FORMAT files and the workflow
     `workbench-update.md`). If a
     behavior change concerns the Sparring Partner, it CANNOT land
     in one of its files. Instead it must be created as a
     standalone **rule** — with a trigger, an action, and
     **explicit precedence over the active role** ("overrides the
     verbosity / the behavior of any active role, incl. the
     Sparring Partner"). An Always rule in CONTEXT.md is NOT
     enough here: it is loaded before the role and gets overridden
     by the role's behavior. This has been tested — the soft Always
     line stayed ineffective, the explicit rule with precedence
     took hold.
   - **Workflow** — the feedback concerns a specific process.
     Example: "You keep forgetting the last step when filing things"
     → Fix in the workflow file.
   - **Always rules** — a style or tone preference
     that applies across the board AND that has no active role
     working against it. Example: a file-naming convention → Fix in
     CONTEXT.md under Always rules.

     **Careful, common trap:** "Answer more briefly" looks like a
     classic Always-rule case, but it is NOT one. An active
     role with a verbose style (e.g. the Sparring Partner)
     overrides the soft Always line — it stays ineffective.
     As soon as a preference has to cut through the behavior of an
     active role, it does NOT belong in the Always rules,
     but in a **standalone rule with explicit
     precedence** (see "Exception — the Sparring Partner" above).

   **Rule of thumb:** The more specific, the better. If it only affects
   this role → role fix. Only this process →
   workflow fix. Everything → rule. The most common mistake: a global
   rule for something that only applies in one context.

   **Order of checks (smallest Blastradius first):**
   Workflow active → check for a fix in the workflow.
   Role active → check for a fix in the role (exception: if the active
   role is the Sparring Partner, it is immutable → instead create a
   standalone rule with explicit precedence, not an Always rule).
   Existing rule affected → extend the rule.
   None of the above → only then a new rule.

   **With multiple Workbenches — where does the change belong?**
   If the session pulls in multiple Workbenches, a second
   dimension comes into play: in WHICH Workbench should the
   change land?

   - Identify which Workbench the affected
     artifact lives in.
   - If it lives at a higher level (e.g. company),
     offer two paths: change it there directly (affects everyone)
     or create a local override in the personal
     Workbench (affects only the user).
   - If the artifact doesn't exist yet: ask the user
     at which level it should be created.

4. **Propose.** Tell the user:
   - What you understood ("You want [X].")
   - Where you're placing it ("This belongs in [target], because [reason].")
   - What exactly you would change.

   Frame it as a proposal. The user decides.

5. **Implement.** Only after confirmation. Carry out the change
   according to the format specifications below. If a new
   rule, role, or workflow is created: update the index in CONTEXT.md
   — without an index entry, no agent will find it.

---

## Context budget

Every file that gets loaded costs context and money in every
session — CONTEXT.md always, roles whenever used, workflows on
every run. Limits in characters (`wc -m`) for the user's files —
the package's tool files are exempt:

| File | Limit |
|---|---|
| `CONTEXT.md` (root) | 10,000 |
| Project `CONTEXT.md` | 6,000 |
| Rule | 6,000 |
| Role (`SYSTEM.md`) | 12,000 |
| Workflow | 15,000 |

**Before every write** to one of these files: estimate the new
size. Stays under the limit → write. Would go over → don't
append, move content out and tell the user in one sentence where:

- CONTEXT.md: details that only one project, role or workflow
  needs move there; CONTEXT.md keeps one line with a reference.
- Role or workflow: rarely used parts (examples, special cases,
  reference lists) go into a file next to it that is only read
  when needed — like the Sparring Partner.
- Never in loaded files: histories, change logs, "as of …" notes.
  They belong in `Workbench/logs/` or the project files.

**Measure:** `npx holderbaum-werkbank@latest check` reports every
file over its limit. If the user says "my CONTEXT.md is too big"
or "tidy up the workbench": measure, one proposal per file over
its limit, apply after approval.

## What's what — a quick distinction

- **Rule:** A guardrail. "Not like this. Like this instead." Applies
  always, to all roles.
- **Role:** A working mode. "Who does the work?" Its own expertise,
  its own principles, its own delivery form.
- **Workflow:** A process. "What gets done, in what
  order?" An SOP with a clear result.

When in doubt: rule first. If the rule gets too complex →
workflow. If the type of workflow needs its own specialist →
role.

---

## Format: Rules

### Where rules live

Workbench/Rules/[name].md — one file per rule, filename
in lowercase with hyphens, no umlauts.

### What a rule file contains

1. A heading with the rule name
2. A one-line short description
3. Trigger: when the rule kicks in (keywords and
   context descriptions, complete)
4. Action: what the rule does — reject, propose,
   or execute
5. At least one example

### After creating it

1. Write the rule file to Workbench/Rules/.
2. Update the index in CONTEXT.md — enter the rule with all its triggers
   into the table. Without an index entry, the rule
   is not active.

### Example

Input: "The agent always says 'holistic'. Never again."

Output:
- New file: Workbench/Rules/no-corporate-speak.md
- Trigger: "create text", "newsletter", or context:
  the agent writes text for external communication
- Action: reject "holistic", propose alternatives
- Index entry in CONTEXT.md

---

## Format: Roles

### What a role is

A preconfigured working mode. More powerful than a rule:
it changes expertise, working style, priorities, limits. Examples:
copywriter, tech lead, marketing strategist.

### Where roles live

Workbench/Roles/[RoleName]/SYSTEM.md — one subdirectory
per role. Role name in PascalCase.

### What a SYSTEM.md contains

1. Identity: Who is this role? Which school of thought?
2. Mandate: What does it do? What does it not do?
3. Principles: 3-7 guiding statements
4. Voice: What does it sound like?
5. Trigger: When is it activated?
6. Required reading: Which files does it read first?

Optional: a subfolder Workbench/Roles/[RoleName]/Reference/
with style examples or templates.

### After creating it

1. Create the directory.
2. Write the SYSTEM.md.
3. Update the index in CONTEXT.md — enter the role with all its triggers.
   Without an index entry, the agent won't find it.

### Example

Input: "Set me up a copywriter role for my newsletters."

Output:
- New directory: Workbench/Roles/Copywriter/
- SYSTEM.md with identity, voice, newsletter principles
- Trigger: "write newsletter", "text in my style"
- Index entry in CONTEXT.md

---

## Format: Workflows

A workflow is a recurring sequence with a fixed result. It lives
as `Workbench/Workflows/<name>.md` (lowercase, hyphens) and is
listed with its trigger in CONTEXT.md § Workflows. It is always
built per [[Workbench/Workflows/FORMAT-writing.md]] — skeleton,
steps, halts and size are there.
If the workbench learns something about the format itself (a
duty, a marker, a path), it goes into
`Workbench/Workflows/FORMAT-local.md` — never into a shipped
FORMAT file. FORMAT.md always loads the local file too; on
conflict it wins. The Sparring Partner guides the
conversation
([[Workbench/Roles/SparringPartner/workflows-and-automation.md]]).

===== HOLDERBAUM WERKSTATT · FILE FULLY LOADED =====
