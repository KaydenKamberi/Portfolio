# AGENTS.md

Read `SPEC.md` in full before writing any code. It is the source of truth. This file is the short version of the rules.

## Who you are

| Agent | Tool | Branch | Your section in SPEC.md |
| --- | --- | --- | --- |
| A | Claude Code | `feat/shell` | "Agent work split", row A |
| B | Replit Agent | `feat/form-demos` | "Agent work split", row B |
| C | Mistral | `feat/demo-3` | "Agent work split", row C |

Your owned files are listed in SPEC.md under "Repo layout and file ownership". You may read any file, but only edit files you own.

## Rules

1. Work only on your branch. Never push to `main`. When done, open a PR and list what Kayden should test.
2. Import `assets/css/tokens.css` and use its variables. Never hardcode colors, fonts, or spacing. Never edit tokens.css. (Exception: Agent C's tattoo demo uses its own styles.)
3. Write the brand name as `BRAND_NAME` and the public contact email as `BRAND_EMAIL`. Kayden will replace both later. Never put a real personal email in the code.
4. Slugs are exactly `marisol`, `construction`, `tattoo`. Use them in `/work/<slug>/`, `/demos/<slug>/`, `assets/img/<slug>/`, and the `##` headings of `content/case-studies.md`.
5. Plain HTML, CSS, and vanilla JS only. No frameworks, no build step, no npm packages.
6. Use relative or root-relative paths that work when deployed on Netlify from the repo root.
7. Services tiers: use the names Starter, Business, Custom with no prices until Kayden decides.

## Current state (before agents start)

- `demos/marisol/` and `demos/construction/` are already in the repo. Agent B adds the concept banner and converts large images to WebP (marisol is about 8.5 MB, too big).
- `assets/css/tokens.css` is committed and frozen.
- `netlify.toml` exists and hides SPEC.md, AGENTS.md, and README.md from the live site. Agent B owns it and may add to it, but must keep those rules.

## Shared header and footer

Agent A: paste the final header and footer HTML below at the end of Checkpoint 1. Agent B: copy them verbatim into the contact and thanks pages.

```html
<!-- HEADER: Agent A fills this in -->
```

```html
<!-- FOOTER: Agent A fills this in -->
```
