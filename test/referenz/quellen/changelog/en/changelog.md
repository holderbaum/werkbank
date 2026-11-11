# Workbench — Changelog Index

This is the index of all versioned changes to the Workbench
artifacts (Sparring Partner, Workbench rule, workflow format, and
accompanying recommendations for CONTEXT.md / account instructions
/ project instructions).

**For the Sparring Partner (update flow):** Read the current
version from the bootstrap block in CONTEXT.md. From the table
below, determine the delta between your version and the newest
one. Fetch **only** the intermediate entries — one after another
— and work through them in **ascending** order (oldest first).
Every entry is self-contained and describes exactly what to do.
Never load the whole changelog at once.

The newest version is at the top.

| Version | Date | What | Entry |
|---------|------|------|-------|
| **v4.0** | 2026-09-28 | De-personification: Sparring Partner and rule without first person, roles are working modes, verifiable rule block in CONTEXT.md. Versioned, immutable tool files; downloads via the terminal, no cache busters. New install built from sources (website, documents, ChatGPT/Claude memory) instead of an interview, brand values only from documents, `Sources/` next to CONTEXT.md. Prerequisite: holderbaum.io on the domain allowlist. **Not breaking.** | [changelog-v4.0.md](https://holderbaum.io/werkstatt/en/bauanleitung/changelog-v4.0.md) |
| v3.4 | 2026-09-28 | Workflow runs get a fixed place in your personal Workbench: `Workbench/logs/<run>-<timestamp>/` with `run.md`, `scratch/` and `result/` — replaces `Workbench/tmp/runs/`. FORMAT.md distinguishes a source and a home Workbench, determines the home Workbench in five stages, requires absolute paths for subagents and checks with `ls` after every step that the files exist. **Not breaking** — existing run folders stay where they are; the new place applies from the next run on. | [changelog-v3.4.md](https://holderbaum.io/werkstatt/en/bauanleitung/changelog-v3.4.md) |
| v3.3 | 2026-09-20 | The project instruction is cut down to the essentials and sits directly in the build guide again (STEP 5b) instead of in its own file. It now reads the `CONTEXT.md` of **every** connected directory and calls `date` including time and weekday. **Not breaking** — only the block in your project instructions gets replaced. | [changelog-v3.3.md](https://holderbaum.io/werkstatt/en/bauanleitung/changelog-v3.3.md) |
| v3.2 | 2026-09-20 | Bootstrap split into two blocks in two places: About Me into the account instructions (applies in regular chats too), session start sequence into the project instructions as the project's self-description. Cowork's global instructions are no longer the intended place. Project instruction as its own file with a URL. The Sparring Partner now presents the reading order as an extension instead of a replacement. **Not breaking** — existing Workbenches keep working unchanged, switching over is optional. | [changelog-v3.2.md](https://holderbaum.io/werkstatt/en/bauanleitung/changelog-v3.2.md) |
| v3.1 | 2026-07-12 | Sparring Partner exception in the diagnosis logic: behavior changes concerning the (immutable) Sparring Partner are created as a standalone rule with explicit precedence — not in his SYSTEM.md, not as an Always rule. Always-rules branch sharpened ("answer more briefly" trap). | [changelog-v3.1.md](https://holderbaum.io/werkstatt/en/bauanleitung/changelog-v3.1.md) |
| v3.0 | 2026-07-06 | Initial English release — full parity with the German v3.0: the "talk with it or run it?" role/workflow diagnosis + sidecar role; automation model (scheduler as a thin layer); fetch-based install; changelog index. | [changelog-v3.0.md](https://holderbaum.io/werkstatt/en/bauanleitung/changelog-v3.0.md) |
