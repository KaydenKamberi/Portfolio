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

Each page also needs this in `<head>` (fonts, tokens, shared CSS, and `main.js` for the header border and scroll reveal):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap">
<link rel="stylesheet" href="/assets/css/tokens.css">
<link rel="stylesheet" href="/assets/css/base.css">
<link rel="stylesheet" href="/assets/css/components.css">
<script>document.documentElement.classList.add("js");</script>
<script src="/assets/js/main.js" defer></script>
```

Put `<main id="main">` between the header and footer so the skip link works. Form fields can use the `.field`, `.field__label`, `.field__input` and `.field__error` classes from `components.css` (markup example in section 11 of that file).

```html
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header" data-site-header>
  <div class="container site-header__inner">
    <a class="site-header__brand" href="/">BRAND_NAME</a>
    <nav class="site-nav" aria-label="Main">
      <a href="/#work">Work</a>
      <a href="/#services">Services</a>
      <a href="/#process">Process</a>
      <a class="btn btn--primary btn--sm" href="/contact/">Contact</a>
    </nav>
  </div>
</header>
```

```html
<footer class="site-footer">
  <div class="container">
    <div class="site-footer__inner">
      <div>
        <a class="site-footer__brand" href="/">BRAND_NAME</a>
        <p class="site-footer__tagline">Fast, good-looking websites for small businesses that want more calls, bookings and walk-ins.</p>
      </div>
      <nav aria-labelledby="footer-site">
        <h2 id="footer-site">Site</h2>
        <ul>
          <li><a href="/#work">Work</a></li>
          <li><a href="/#services">Services</a></li>
          <li><a href="/#process">Process</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
      </nav>
      <div>
        <h2 id="footer-contact">Get in touch</h2>
        <ul aria-labelledby="footer-contact">
          <li><a href="mailto:BRAND_EMAIL">BRAND_EMAIL</a></li>
          <li><a href="/contact/">Start a project</a></li>
        </ul>
      </div>
    </div>
    <div class="site-footer__base">
      <p>&copy; 2026 BRAND_NAME</p>
      <p>Demo sites are concept work for fictional businesses.</p>
    </div>
  </div>
</footer>
```
