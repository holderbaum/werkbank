<!-- HOLDERBAUM-WERKSTATT · format-mehrere · v5.0 -->
# Workflow format — multiple workbenches

Read only when more than one workbench is connected at run start. Supplements
[[Workbench/Workflows/FORMAT.md]].

A workflow does not necessarily live in the workbench it runs for — a shared workflow lives in the
shared workbench but runs for one person. Hence two anchors:

- **`<Source>`** — the workbench the workflow lives in. Templates, references and the workflow
  itself are resolved relative to it. Read only.
- **`<Home>`** — the personal workbench of the person starting the run. The run folder lives there
  (`<Home>/Workbench/logs/…`).

**Determine `<Home>`** — in this order, the first unambiguous result wins. Candidate is every
connected folder with a CONTEXT.md at its root.

1. Exactly one candidate → that one.
2. Candidates without write access drop out (`test -w`). Exactly one left → that one.
3. Personal is the one whose CONTEXT.md describes the person (name/mail from the user context).
   Exactly one hit → that one.
4. Several personal ones and `<Source>` among them → `<Source>`.
5. Otherwise: ask the human before writing anything.

Which stage decided goes into `run.md`. If writing to `<Home>` fails, the run halts. Other connected
folders with similar names are never the place of a run.

**Paths:** relative paths in a workflow without a placeholder mean `<Source>/…`; if a workbench is
source and home at once, it's the same.

**Target for shared workflows:** a workflow doesn't know `<Home>`. It names as target either
`result/` in the run folder or explicitly a resource of its own workbench (`<Source>/…`; not
writable → halt). Where a result finally belongs in `<Home>` is decided by the home workbench or
the human.
===== HOLDERBAUM WERKSTATT · FILE FULLY LOADED =====
