# Portfolio Site + Lead Capture — Build Spec

Oct 2, 2026 · @Kayden

## Overview

Build a fast, good-looking static portfolio that shows three concept websites and turns visitors into leads through a contact form that emails Kayden instantly. Target cost is $0/month until the first paid client.

**In scope**

- Home page that sells the service: hero, featured work, services, process, call to action
- One case study page per demo site, plus the live demo itself hosted on the same domain
- Contact page with a form that stores every submission and emails it to Kayden's inbox
- The third demo site, built from scratch

**Out of scope for v1:** client login, blog, CMS, payments, SMS.

**Done means**

- A stranger on a phone can go from landing to a submitted form in under 60 seconds
- Every submission appears in the stored list and in Kayden's inbox within 1 minute
- Lighthouse scores of 90+ for Performance, Accessibility, Best Practices and SEO on mobile
- Each demo is clearly labeled as concept work for a fictional business

## Stack and hosting

Code on Replit, push to GitHub, host on Netlify's Free plan, and use Netlify Forms for both storage and email alerts. This costs $0 and needs no backend server.

| Layer | Choice | Why |
| --- | --- | --- |
| Code editing | Replit, synced to a GitHub repo | Where you already work; agents can also clone the repo |
| Site | Plain HTML, CSS, vanilla JS, no build step | Matches your two finished demos; nothing to compile, nothing to break |
| Hosting | Netlify Free (auto-deploys from GitHub `main`) | Free plan includes 300 credits/month; branch preview deploys are free |
| Form storage | Netlify Forms | Submissions stored in the Netlify dashboard, exportable to CSV; form submissions are now free and unlimited on credit plans |
| Notifications | Netlify Forms email notification to your inbox | Built-in, no API keys; Gmail app pushes it to your phone |
| Spam | Honeypot field + Netlify's built-in spam filter | Spam-flagged submissions are filtered out automatically |

**Why not the Replit database yet:** Replit DB is only reachable from a running Replit app, and keeping one online 24/7 means a paid deployment. Netlify Forms gives the same result (saved leads + instant email) for free. After the first paid client, you can move storage to a Replit deployment or Netlify DB without changing the form's HTML.

Sources: [Netlify credit plans](https://www.netlify.com/changelog/netlify-pricing-update-introducing-credit-based-plans/), [April 2026 update: free form submissions](https://www.netlify.com/changelog/2026-04-14-pricing-updates-april-2026/)

## Site structure

One Netlify site holds the portfolio, the case studies and the three live demos, so there is one domain and one deploy.

| URL | Page | Contents |
| --- | --- | --- |
| `/` | Home | Hero (one-line pitch + "Start a project" button), 3 featured work cards, services (3 tiers), 4-step process, short about, final CTA |
| `/work/<slug>/` | Case study (x3) | Browser-frame screenshot, the brief, what was built, 3 key features, mobile + desktop shots, "View live demo" button |
| `/demos/<slug>/` | Live demo (x3) | The demo site itself, with a slim top banner: "Concept site for a fictional business, designed by BRAND\_NAME" + back link |
| `/contact/` | Contact | The lead form, response-time promise, email fallback |
| `/thanks/` | Thank you | Confirmation, what happens next, link back to work |
| `/404.html` | Not found | On-brand 404 with links home and to work |

**Navigation:** Work, Services, Process, Contact. Sticky header; the Contact link is a filled button. Every page ends with a "Start a project" CTA pointing to `/contact/`.

**SEO basics:** unique `<title>` and meta description per page, Open Graph image per case study, `sitemap.xml`, `robots.txt`.

## Visual design system

The look is editorial and confident: big serif headlines, lots of whitespace, one bold accent color, and the work itself as the hero. These tokens are the contract every agent codes against, so nobody waits on anyone else.

```css
/* assets/css/tokens.css (committed by Kayden in CP0; nobody edits it) */
:root {
  --bg: #F4F1EA;        /* warm paper */
  --surface: #FFFFFF;
  --ink: #15140F;       /* text */
  --muted: #6B675E;
  --line: #DDD7CB;
  --accent: #E4572E;    /* tomato: buttons, links, highlights only */
  --accent-ink: #FFFFFF;

  --font-display: "Instrument Serif", Georgia, serif;
  --font-body: "Geist", system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;

  --step-0: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --step-1: clamp(1.25rem, 1.1rem + 0.6vw, 1.6rem);
  --step-2: clamp(1.75rem, 1.4rem + 1.5vw, 2.75rem);
  --step-3: clamp(2.5rem, 1.8rem + 3.5vw, 5rem);

  --space-1: 0.5rem; --space-2: 1rem; --space-3: 1.5rem;
  --space-4: 2.5rem; --space-5: 4rem;  --space-6: 6rem;
  --radius: 14px;
  --max: 1180px;
  --shadow: 0 20px 50px -20px rgb(21 20 15 / 0.25);
}
@media (prefers-color-scheme: dark) {
  :root { --bg:#12110E; --surface:#1C1B17; --ink:#F4F1EA; --muted:#A39E92; --line:#2E2C26; }
}
```

**Components (built once in `components.css`, reused everywhere):** button (filled + ghost), work card (screenshot in browser frame, title, one-line result, tag chips), section header (mono eyebrow label + serif headline), browser frame (CSS-only, 3 dots), form field (label above, 48px tall inputs, visible focus ring in `--accent`), site header, footer.

**Motion:** fade-and-rise on scroll via IntersectionObserver, 400ms, once per element; work card screenshots scroll slowly inside their frame on hover. All motion turns off under `prefers-reduced-motion`.

**Images:** WebP, max 1600px wide, under 200 KB each, `loading="lazy"` below the fold, explicit width and height. Whole home page under 1.5 MB.

**Accessibility:** text contrast 4.5:1 minimum, all inputs labeled, keyboard navigable, skip link.

## Contact form

The form is plain HTML that Netlify detects at deploy time, stores every submission, and emails you a copy. Keep it to 7 fields so it takes under a minute.

| Field | `name` attribute | Type | Required | Rule |
| --- | --- | --- | --- | --- |
| Your name | `name` | text | Yes | 2 to 80 characters |
| Email | `email` | email | Yes | Valid email format |
| Phone | `phone` | tel | No | 10 digits after stripping spaces, dashes, parentheses |
| Business name | `business` | text | No | Up to 100 characters |
| What do you need? | `project_type` | select | Yes | New website / Redesign / One-page site / Not sure yet |
| Best way to reach you | `contact_pref` | radio | Yes | Email / Text / Call |
| Tell me about it | `message` | textarea | Yes | 10 to 1,000 characters, live character counter |

If `contact_pref` is Text or Call, `phone` becomes required.

**Required markup (do not change these attributes):**

```html
<form name="contact" method="POST" action="/thanks/"
      data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact">
  <p hidden><label>Leave this empty <input name="bot-field"></label></p>
  <!-- fields from the table above -->
</form>
```

**Submit behavior (`assets/js/form.js`):**

1. Validate on blur and on submit; show the error under the field, never as an alert.
2. On valid submit, disable the button and show "Sending...".
3. POST the form as `application/x-www-form-urlencoded` to `/` with `fetch`.
4. On success, redirect to `/thanks/`. On failure, show "Something went wrong. Email me at \[address\] instead."
5. With JavaScript off, the form still works through the normal POST to `/thanks/`.

**Notifications:** In Netlify, open the site, go to Forms, then Form notifications, and add an email notification for the `contact` form sent to your inbox. In Gmail, create a filter for the sender and subject, apply a "Leads" label, and turn on notifications for it so leads ping your phone.

**Privacy line under the button:** "I'll only use this to reply to you. No spam, no sharing."

## Repo layout and file ownership

Every file has exactly one owner, so three agents can work at once without merge conflicts. An agent may read any file but only edits files it owns.

```text
portfolio/
├── index.html                 A
├── 404.html                   A
├── work/
│   ├── _template.html         A
│   └── <slug>/index.html      A  (x3, filled in Checkpoint 2)
├── contact/index.html         B
├── thanks/index.html          B
├── demos/
│   ├── marisol/               B  (already in repo; B adds banner, shrinks images)
│   ├── construction/          B  (already in repo; B adds banner, shrinks images)
│   └── tattoo/                C  (tattoo shop, built from scratch)
├── assets/
│   ├── css/tokens.css         Kayden  (frozen, do not edit)
│   ├── css/base.css           A
│   ├── css/components.css     A
│   ├── css/contact.css        B
│   ├── js/main.js             A
│   ├── js/form.js             B
│   └── img/                   shared, but each agent uses its own subfolder
├── content/case-studies.md    C  (copy for all 3 case studies)
├── netlify.toml               B
├── sitemap.xml, robots.txt    B
├── AGENTS.md                  Kayden
└── README.md                  Kayden
```

**Slugs (use exactly these everywhere):** `marisol`, `construction`, `tattoo`. They appear in `/work/<slug>/`, `/demos/<slug>/`, `assets/img/<slug>/`, and the `##` headings in `case-studies.md`.

`AGENTS.md` holds the rules every agent reads first: its owned files, its branch name, "import tokens.css, never hardcode colors or fonts", "write the brand name as BRAND\_NAME until it is chosen", and "open a PR to `main`, never push to it."

## Agent work split

Three agents run in parallel on separate branches; the only shared dependency is `tokens.css`, which is written in this spec and frozen before work starts. Kayden is the integrator who reviews preview deploys and merges.

| Agent | Branch | Job | Delivers | Waits on |
| --- | --- | --- | --- | --- |
| A: Claude Code | `feat/shell` | Design system and portfolio pages | base and component CSS, header/footer, home page, case study template, 3 case study pages, 404, `main.js` | Nothing for CP1; copy + screenshots from C and B for CP2 |
| B: Replit Agent | `feat/form-demos` | Lead capture, demos, deploy config | Contact + thanks pages, `form.js`, `netlify.toml`, sitemap, concept banners added to the marisol and construction demos (already in demos/), their images shrunk to WebP, screenshots of both | Nothing; uses tokens.css from the spec |
| C: Mistral | `feat/demo-3` | Tattoo shop demo, all case study copy, and About bio | Complete tattoo demo site, screenshots of it, `content/case-studies.md` | Nothing; demo 3 uses its own styles, not the portfolio tokens |

**Handoff contracts**

- **Case study copy** (C to A): `case-studies.md` has one `##` section per slug with exactly these fields: Title, One-line result, The brief (2 to 3 sentences), What I built (3 to 4 sentences), Key features (3 bullets), Tags (3 to 5). The file ends with an About section: a friendly 60 to 90 word bio for the home page, written as BRAND\_NAME's founder, no photo.
- **Screenshots** (B and C to A): saved as `assets/img/<slug>/desktop.webp` (1600x1000) and `assets/img/<slug>/mobile.webp` (780x1688).
- **Header and footer** (A to B): A pastes the final header and footer HTML into `AGENTS.md` at the end of CP1; B copies them into contact and thanks pages verbatim.

**Prompt starter for each agent:** "Read `AGENTS.md` and the spec section for Agent \[A/B/C\]. Work only on branch `[branch]`. Edit only the files you own. When done, open a PR and list what to test."

## Checkpoints and acceptance tests

Four checkpoints; CP1 and CP2 run all three agents at once. Nothing merges to `main` until its checklist passes on a Netlify branch preview.

**CP0: Setup (Kayden, about 30 minutes)**

- [ ] GitHub repo created and connected to Replit
- [ ] Netlify site created from the repo, branch deploys turned on
- [ ] `tokens.css` committed exactly as written in this spec
- [ ] `AGENTS.md` committed with ownership list and branch names
- [ ] Two finished demo folders added under `demos/`

**CP1: Build in parallel (A, B, C)**

- [ ] A: home page renders at 375px, 768px and 1280px with no horizontal scroll
- [ ] A: header and footer pasted into `AGENTS.md`
- [ ] B: contact form appears under Forms in the Netlify dashboard after the preview deploy
- [ ] B: test submission lands in the dashboard and in your inbox within 1 minute
- [ ] B: submitting with a blank email shows an inline error and sends nothing
- [ ] B: demos 1 and 2 load from `/demos/<slug>/` with the concept banner and working links
- [ ] C: demo 3 is complete, responsive, and passes the same 3-width check

**CP2: Fill in (A, B, C)**

- [ ] C: `case-studies.md` complete for all 3 slugs in the agreed format
- [ ] B and C: 6 screenshots saved at the agreed paths and sizes
- [ ] A: 3 case study pages built from the template with real copy and images
- [ ] B: contact and thanks pages use A's header and footer

**CP3: QA and launch (Kayden)**

- [ ] Lighthouse mobile 90+ in all four categories on home, one case study, and contact
- [ ] Every internal link works (no 404s except the 404 page)
- [ ] Full lead test from a phone on cellular data: fill form, get email, see it in dashboard
- [ ] Tab through the contact form with keyboard only
- [ ] Merge to `main` in this order: A, then B, then C; one production deploy

## Deployment and cost

The free plan's 300 monthly credits easily cover this site if you batch production deploys. Branch previews cost nothing, so do all testing there.

| Item | Credit cost | Budget for this site |
| --- | --- | --- |
| Production deploy (merge to `main`) | 15 each | Aim for 8 or fewer a month (120 credits) |
| Branch / preview deploys | Free | Unlimited testing |
| Bandwidth | 20 per GB | About 9 GB left after deploys, roughly 6,000 home page visits at 1.5 MB |
| Form submissions | Free | Unlimited |

**Rules to stay at $0:** merge agent PRs together instead of one at a time, keep images under budget, and check Usage in the Netlify dashboard once a month.

**Domain:** launch on the free `<name>.netlify.app` address. Buy a custom domain (roughly $10 to $15 a year, approximate) after the first paid client.

**After first profit:** if you want leads in a real database, add a Netlify Function or a Replit deployment that receives the same form fields. The form markup and field names in this spec stay the same.

## Open items before CP0

These answers fill the placeholders above; agents should not start until the first four are set.

- [ ] Brand name for the portfolio (used in title, banner, footer, and the `.netlify.app` address) \[Placeholder no name decided\]
- [ ] Which two demos are finished, and their slugs: Marisol, Jon Doe Construction as of now
- [ ] What business demo 3 is for, plus 2 or 3 sites you like as reference for it 3 is a tatoo shop
- [ ] Email address that receives lead notifications KaydenKamberi45@gmail.com
- [ ] Services section: show your pricing tiers with "starting at" prices, or tier names only Tier names only, prices not decided
- [ ] About section: short bio, and whether to include a photo short bio, have the ai write a short generic one
- [ ] Accent color: keep tomato `#E4572E`
