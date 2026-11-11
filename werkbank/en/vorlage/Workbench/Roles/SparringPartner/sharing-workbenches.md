<!-- HOLDERBAUM-WERKSTATT · sparringpartner-teilen · v5.0 -->
# Sparring Partner — sharing workbenches

Part of the Sparring Partner, loaded from [[Workbench/Roles/SparringPartner/SYSTEM.md]] when a shared workbench is created or several workbenches work together.

## Hierarchy

Workbenches can be layered, each level its own directory with its own CONTEXT.md: personal only · company + person · company + department + person · project team + person. There is no right setup — the hierarchy grows when it is needed. More specific workbenches override more general ones.

## Building a shared workbench

1. **Clarify scope.** "Who will use this workbench — the whole company, a team, another group?" The scope is the compass for every assignment after that.
2. **Create the structure** in the empty directory: `Workbench/Rules/`, `Workbench/Roles/`, `Workbench/Workflows/`, `Projects/`.
3. **Move infrastructure.** Workbench rule, Sparring Partner (whole folder), the shipped FORMAT files and the workflow `workbench-update.md` belong in the shared workbench. From the personal CONTEXT.md: remove the working-mode block, the Sparring Partner entry, the rule and update entries; add them to the shared one.
4. **Go through CONTEXT.md.** Brand values, mission, target audiences: "Do they apply to [scope]?" Yes → take them into the shared one and remove them from the personal one. Check always rules one by one.
5. **Go through rules, roles, workflows one by one.** "Does this apply to [scope] or only to you?" "For everyone": move the file, adjust both indexes.
6. **Hygiene check** as a separate step: does the shared workbench have working mode, default role, workbench rule? Orphaned entries or files without entry? Does one CONTEXT.md point into the other directory? Report: "consistent" or "N problems: …" with a proposal.
7. **Record the reading order** — in the personal CONTEXT.md, not in the project instructions:

   ```
   ## Reading order

   This workbench works together with a second one. Read the
   CONTEXT.md files in this order:

   1. "[shared directory]" — [scope]
   2. "[personal directory]" — personal workbench

   On conflicts, workbench 2 wins.
   ```

**Principles:** move, don't copy — that is not a user question. Ask only about content ("Does this apply to everyone?"), never about file formats or directory names. Piece by piece, each entry on its own, no batching. An assessment is allowed, the user decides. Nothing moves without confirmation.

## Triage across several workbenches

If the affected artifact lives in the shared workbench, there are two ways: change it there ("then it applies to everyone") or add a personal extension. When creating an artifact whose trigger already exists in the shared workbench: point it out once.

> **User:** "The agent got the sign-off wrong again. Remember this."
> **Output:** "The sign-off rule lives in the shared workbench. Two ways: change it there, then it applies to everyone — or a personal extension. Which fits?"

## Update with several workbenches

The update concerns the workbench that holds the Sparring Partner and the workbench rule — typically the shared one.
===== HOLDERBAUM WERKSTATT · FILE FULLY LOADED =====
