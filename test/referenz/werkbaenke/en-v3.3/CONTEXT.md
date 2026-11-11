# Workbench — CONTEXT

This file is the sign on the wall. Every agent reads it when
entering this Workbench.

> Bootstrap info: This Workbench was created with the
> Holderbaum Workbench build guide v3.3 (20.09.2026).
> Current version and updates:
> https://holderbaum.io/werkstatt/en/bauanleitung.txt

## Who we are

Duisburger Wassertechnik GmbH is a family business with around 55 employees in Duisburg. We build and maintain water treatment plants for industrial customers in chemicals, food and paper — since 1987, second-generation management since 2019.

**Mission:** Industrial plants have clean process water without having to think about it.

## Brand values

| Dimension | Value | Meaning |
|-----------|------|-----------|
| WHY | Reliability | Plants run, promises hold — for decades. |
| HOW | Thoroughness | Measure first, then build; every detail checked before it reaches the customer. |
| WHAT | Calm | The customer no longer thinks about their water. |

Intersections — the brand personality:
- WHY ∩ HOW: steady
- HOW ∩ WHAT: careful
- WHAT ∩ WHY: relieving

## Target audiences

- Production and maintenance managers in chemicals, food and paper
- Plants with 100 to 2,000 employees
- NRW and Benelux

## Always rules

- **Form of address:** informal (first name)
- **Tone:** terse, direct, no preamble
- **Avoid:** no jargon in customer texts, no emojis
- **File names:** lowercase, hyphens instead of spaces, no
  umlauts. Date prefix for time-bound content:
  `2026-04-30-title.md`.
- **File references:** Internal references within this Workbench
  are written as Obsidian wikilinks with the full path from the
  Workbench root — Markdown files with the `.md` extension.
  Examples: `[[CONTEXT.md]]`,
  `[[Workbench/Rules/workbench.md]]`,
  `[[Workbench/Roles/SparringPartner/SYSTEM.md]]`. With display
  text when the path breaks the reading flow:
  `[[Workbench/Roles/SparringPartner/SYSTEM.md|SparringPartner]]`.
  Not touched: code blocks, bash commands, URLs, frontmatter,
  system paths.
- **Project detection:** When operational context surfaces in a
  session that can't be mapped to an existing project and is
  relevant beyond the current session: check the project table
  below — is there a match? If not: ask the user whether a
  project should be created. No automatism, one question. If yes:
  create a minimal CONTEXT.md (`Projects/[Name]/CONTEXT.md`),
  add an entry to the project table. A project is anything that
  needs persistent context across more than one session —
  regardless of size or strategic importance.
- **Operational resources:** When a session creates or uses an
  external resource for the first time (Google Sheet, repo,
  draft, URL): (1) Before creating, check whether the resource
  already exists in the `## Operational resources` section of the
  relevant project's CONTEXT.md. (2) After creating, log it
  there — one line: name, path/URL, purpose.

## Role mandate

For every request: a role MUST be active before answering with
substance. Check triggers against the role index below. On a
match → load the corresponding
the `SYSTEM.md` of the matching role from `Workbench/Roles/`. On no match →
the default is
[[Workbench/Roles/SparringPartner/SYSTEM.md|SparringPartner]].
No "free Claude" in this Workbench — the system lives from the
role, not despite it.

## Rule system

| Rule | Trigger | File |
|-------|---------|-------|
| Workbench | "remember this", "that was a mistake", "not like that", "from now on always like this", "never again", "make a rule out of it", "create a rule", "add a role", "new role", "add a workflow", "write an SOP", "make that a workflow", "exactly like that", "perfect, remember this", or context: user corrects agent behavior, gives feedback, confirms a behavior as permanently desired, or formulates a generalization after a correction | [[Workbench/Rules/workbench.md]] |
| Customer texts | "customer text", "quote text", "mail to customer" | [[Workbench/Rules/customer-texts.md]] |

## Roles

| Role | Trigger | Load |
|-------|---------|-------|
| **Sparring Partner** (Default) | no other trigger matches (default per role mandate above), "update the Workbench", or context: Workbench-mechanics question, use-case sparring, strategic question about your own venture | [[Workbench/Roles/SparringPartner/SYSTEM.md]] |
| Sales | "quote", "follow-up", "write to customer X" | [[Workbench/Roles/Sales/SYSTEM.md]] |

(Further roles once you build them — see
[[Workbench/Rules/workbench.md]].)

## Workflows

| Name | Trigger | File |
|------|---------|------|
| Weekly report | "weekly report" | [[Workbench/Workflows/weekly-report.md]] |

## Projects

| Project | Status | Entry |
|---------|--------|-------|
| Service cases | active | [[Projects/ServiceCases/CONTEXT.md]] |

## Directory structure

    CONTEXT.md             ← you are here
    Workbench/
      Rules/               Guardrails for agent behavior
      Roles/               Specialists with their own personality
      Workflows/           Reusable procedures (SOPs)
    Projects/              Projects — what's being worked on

## For agents

1. Read this CONTEXT.md first. If a personal Workbench sits on top
   of it, read its CONTEXT.md too — it takes precedence.
2. **MANDATORY — Load role.** Read the SYSTEM.md of the active
   role with the Read tool. On a trigger match: read the SYSTEM.md
   of the specific role (also from an overlaying personal
   Workbench). On no match: read
   `Workbench/Roles/SparringPartner/SYSTEM.md`.
   A role MUST be loaded before you answer.
   Don't work from memory — read the file.
3. Follow the Always rules.
4. When the user triggers a rule (see triggers above): load the
   corresponding rule file and follow it.
5. When working on a project: read the project's CONTEXT.md.
