# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (uses Turbopack)
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite is configured. There is no `npm test` command.

## Architecture

This is a **Next.js 15** app (App Router) with **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

### Data sources

All content lives in two places:

- `data/lab-data.json` — the canonical JSON source: `areas[]` (each with `topics[]` and `personaIntros`), global `personas[]`, and global `problems[]`
- `data/prompts/` — one `.ts` file per prompt (e.g. `user-story-tutor.ts`), exported via `data/prompts/index.ts` as a `PROMPTS` record keyed by prompt file name

`data/index.ts` reads both and exports:
- `GAMES` — flat array of `Lab` objects (built from `areasData.areas[].topics[].games[]`), with `promptFile` references resolved to full prompt strings
- `LABS` — array of `LabCategory` objects (`{ area, topic, labs, problems }`), one per (area, topic) pair that has at least one game
- `PROBLEMS`, `AREAS`, `PERSONAS` — convenience flat exports
- `getPersonaIntro(area, persona)` — returns the per-area persona intro string from `lab-data.json`

### Prompt template system

Setup steps in `lab-data.json` reference prompts via `promptFile: "some-key"`. During the `GAMES` build in `data/index.ts`, this is replaced with the actual prompt string from `PROMPTS["some-key"]`. Prompt strings contain `{{PERSONA_INTRO}}` as a placeholder, which `LabStep` replaces at render time using `getPersonaIntro(area, persona)`.

### Lab rendering mechanics

`lib/lab-utils.ts` provides helpers (`getAreas`, `getTopics`, `getPersonas`, `getProblems`, `filterLabs`) that query `LABS`.

The `/labs` page (`app/labs/page.tsx`) is a client component that:
1. Reads `area`, `topic`, `persona`, `problemId`, `userStoryId`, `acceptanceCriteriaIds` from URL search params
2. Uses `filterLabs(area, topic, problemId)` to get the active labs and selected `Problem`
3. Renders each `Lab.steps[]` via `LabStep`

**Critical**: Steps have `type: "setup" | "interaction"`. The `setup` step holds the `prompt` (from `promptFile`). The `interaction` step has no prompt — instead, `LabStep` renders the user-selected context (problem statement, user story, acceptance criteria) as a copyable block when `isSecondStep=true`. The interaction step is gated: it shows an amber warning until a problem + user story + acceptance criteria are selected.

### Adding a new lab

1. Add a `games[]` entry to the relevant topic in `data/lab-data.json`. Each game step uses either `promptFile` (to reference a file in `data/prompts/`) or inline `prompt`.
2. Add problem ids to `topic.problemIds` and ensure those `Problem` objects exist in `data/lab-data.json`'s top-level `problems[]`.
3. If a new prompt file is needed, create `data/prompts/<name>.ts` and register it in `data/prompts/index.ts`.

Topic strings in `lab-data.json` use `snake_case`. `formatTopicForDisplay` in `lib/lab-utils.ts` converts them to title case for the UI.

### URL-based filtering

Deep links work via query params: `?area=requirements%20engineering&topic=use_cases&persona=tutor&problemId=reset-password-problem&userStoryId=...&acceptanceCriteriaIds=...`. Changing `area` resets `topic`; filter state is synced bidirectionally between `useState` and the URL.

### Pages

- `/` — Landing page
- `/labs` — Main lab explorer (client component, search-param driven)
- `/about` — About page
- `/talks` — Talks/slides page (links to PDF in `public/slides/`)
