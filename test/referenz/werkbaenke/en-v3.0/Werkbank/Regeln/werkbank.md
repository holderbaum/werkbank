# Werkbank

Meta-rule of the Starter Werkbank. The central point of contact for every
change to the system — whether it's a correction, praise, feedback, or an
explicit request for a rule, role, or workflow.

## Trigger

**Explicit:** "remember this", "that was a mistake", "not like that",
"always do it this way from now on", "never again", "turn that into a rule",
"create a rule", "add a role", "new role", "add a workflow",
"write an SOP", "make that a workflow"

**Correction:** "That doesn't belong here", "that's too much",
"you're doing too much X", "that wasn't what I wanted",
"stop doing that"

**Praise:** "Exactly like that", "perfect, remember this", "that's how I
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
     the Sparring Partner is active → Fix in the SYSTEM.md of the
     Sparring Partner role.
   - **Workflow** — the feedback concerns a specific process.
     Example: "You keep forgetting the last step when filing things"
     → Fix in the workflow file.
   - **Always-Regeln** — a style or tone preference
     that applies across the board. Example: "Answer more briefly."
     → Fix in KONTEXT.md under Always-Regeln.

   **Rule of thumb:** The more specific, the better. If it only affects
   this role → role fix. Only this process →
   workflow fix. Everything → rule. The most common mistake: a global
   rule for something that only applies in one context.

   **Order of checks (smallest Blastradius first):**
   Workflow active → check for a fix in the workflow.
   Role active → check for a fix in the role.
   Existing rule affected → extend the rule.
   None of the above → only then a new rule.

   **With multiple Werkbänke — where does the change belong?**
   If the session pulls in multiple Werkbänke, a second
   dimension comes into play: in WHICH Werkbank should the
   change land?

   - Identify which Werkbank the affected
     artifact lives in.
   - If it lives at a higher level (e.g. company),
     offer two paths: change it there directly (affects everyone)
     or create a local override in the personal
     Werkbank (affects only the user).
   - If the artifact doesn't exist yet: ask the user
     at which level it should be created.

4. **Propose.** Tell the user:
   - What you understood ("You want [X].")
   - Where you're placing it ("This belongs in [target], because [reason].")
   - What exactly you would change.

   Frame it as a proposal. The user decides.

5. **Implement.** Only after confirmation. Carry out the change
   according to the format specifications below. If a new
   rule, role, or workflow is created: update the index in KONTEXT.md
   — without an index entry, no agent will find it.

---

## What's what — a quick distinction

- **Rule:** A guardrail. "Not like this. Like this instead." Applies
  always, to all roles.
- **Role:** A specialist. "Who does the work?" Its own personality,
  its own principles, its own voice.
- **Workflow:** A process. "What gets done, in what
  order?" An SOP with a clear result.

When in doubt: rule first. If the rule gets too complex →
workflow. If the type of workflow needs its own specialist →
role.

---

## Format: Rules

### Where rules live

Werkbank/Regeln/[name].md — one file per rule, filename
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

1. Write the rule file to Werkbank/Regeln/.
2. Update the index in KONTEXT.md — enter the rule with all its triggers
   into the table. Without an index entry, the rule
   is not active.

### Example

Input: "The agent always says 'holistic'. Never again."

Output:
- New file: Werkbank/Regeln/kein-corporate-deutsch.md
- Trigger: "create text", "newsletter", or context:
  the agent writes text for external communication
- Action: reject "holistic", propose alternatives
- Index entry in KONTEXT.md

---

## Format: Roles

### What a role is

A pre-configured personality. More powerful than a rule:
it changes voice, way of working, priorities, boundaries. Examples:
copywriter, tech lead, marketing strategist.

### Where roles live

Werkbank/Rollen/[Rollenname]/SYSTEM.md — one subdirectory
per role. Role name in PascalCase.

### What a SYSTEM.md contains

1. Identity: Who is this role? Which school of thought?
2. Mandate: What does it do? What does it not do?
3. Principles: 3-7 guiding statements
4. Voice: What does it sound like?
5. Trigger: When is it activated?
6. Required reading: Which files does it read first?

Optional: a subfolder Werkbank/Rollen/[Rollenname]/Referenz/
with style examples or templates.

### After creating it

1. Create the directory.
2. Write the SYSTEM.md.
3. Update the index in KONTEXT.md — enter the role with all its triggers.
   Without an index entry, the agent won't find it.

### Example

Input: "Set me up a copywriter role for my newsletters."

Output:
- New directory: Werkbank/Rollen/Texter/
- SYSTEM.md with identity, voice, newsletter principles
- Trigger: "write newsletter", "text in my style"
- Index entry in KONTEXT.md

---

## Format: Workflows

### What a workflow is

A defined process with a clear result — an SOP.
Examples: filing a meeting transcript, drafting a newsletter from
notes, building a report from numbers.

### Where workflows live

Werkbank/Workflows/[name].md — one file per workflow,
lowercase with hyphens.

### When a workflow comes into being

When a process runs the same way for the third time. Before that:
just do it.

### What a workflow file contains

1. A heading
2. Trigger: when is it triggered?
3. Role: which role executes it? (optional)
4. Input: what does the agent need to start?
5. Process: numbered steps
6. Result: what do you end up with?

### After creating it

1. Write the workflow file to Werkbank/Workflows/.
2. Update the index in KONTEXT.md.

### Example

Input: "I file transcripts regularly. Turn that into a
workflow."

Output:
- New file: Werkbank/Workflows/transkript-einpflegen.md
- Trigger: "file transcript", or context: a message
  in transcript format
- Process: read transcript → stakeholders → history →
  update KONTEXT
- Index entry in KONTEXT.md
