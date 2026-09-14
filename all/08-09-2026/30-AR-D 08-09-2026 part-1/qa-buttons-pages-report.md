# QA Report: part-1 pages & buttons (2026-09-14)

Batch: `all/08-09-2026/30-AR-D 08-09-2026 part-1`  
Sites: **25** | Pages: **425** (17 × 25) | CTA classes inventoried: **560**

## Summary

| Check | Result |
|-------|--------|
| Pages load + body RTL | **425/425** PASS |
| Visual layout (1280 + spot 390) | **425/425** PASS |
| Contact / RTL overflow re-scan | **25/25** `contact_overflow: null` |
| Static CSS hover risks (pre-scan) | **10** found → patched |
| Button contrast default+hover (Playwright) | **0** unique FAIL / **0** page fails |
| Sites with zero button FAIL | **25/25** |

## Fixes applied (CSS only, `public/assets/css/style.css`)

### All sites
- **RTL**: `direction: rtl` on `html`/`body` for 15 sites where computed direction was LTR (8 body + 7 html-only).
- **Hover CTA** (from prior + this pass): explicit `color` + `text-decoration: none` on solid/outline CTAs so global `a:hover` does not wash out text.

### Semantic cohort (4)
- **akhdaralmaale.space, driftpromotion.space, masmaralsuraa.com, tritonkart.eg**: honeypot off-screen fix (`clip` pattern instead of `left: -9999px`) — removes false horizontal overflow on contact pages.
- **masmaralsuraa.com**: mobile header CTA hover; wet-cta-band contrast preserved.
- **tritonkart.eg**: secondary portfolio CTA explicit transparent/blue styling.
- Re-scan: contact pages no longer inflate `documentElement.scrollWidth`; mobile drawers open correctly via toggle (`.is-open`).

### Obfuscated cohort — targeted
- **voltennisacademy.com**: `.je75d5:hover` color (prior pass).
- **Static-risk CTAs**: missing `:hover` rules added (akhdaralmaale mobile CTA, haraka-risha, liberodefense, powerserve outline, racketpro, alphadriver, equestrian-care, masmaralsuraa mobile CTA).
- **FAQ accordion buttons**: `color: var(--color-text-primary)` on `.me79` (alresha), `.ac59` (nileacademy).
- **Cookie decline**: croquet `.od41`, liberodefense `.ida5d` — readable on dark/light bands.
- **Hero outline**: liberodefense `.h82` white border/text, solid white fill + ink text on hover; `transition: none` to avoid mid-transition false fails.
- **melabalnzilaq.space**: lighter primary tokens + `.lcc768` / `.ibeb4` contrast.
- **liberodefense.space**: primary indigo darkened (`#6366f1` → `#4f46e5`) for AA with white CTA text.
- **aldawaran.online**: `--color-text-on-accent: #ffffff`; primary darkened `#059669` → `#047857` (hover `#065f46`); **header flex overflow** — `.m24c94` / `.i1e91` `min-width: 0`, tighter 1024+ gaps/margins, `.ed8 { overflow-x: clip }` (CTA `.ce4b8` no longer sits at `left: -26`).
- **croquet-eg.space**: `--color-text-on-accent: #ffffff`; primary darkened `#0d9488` → `#0f766e` (hover `#115e59`).
- **Teal/purple/green accent CTAs** (alresha, strategy-hoop, nilstable, nileacademy, shams-table, etc.): per-class `#ffffff` text + darker fills where mid-tone accents failed AA (~3.5–4.4:1).

## Sites — page QA

| Site | Pages OK | Notes |
|------|----------|-------|
| academyelnahm.site | 17/17 | RTL fixed |
| akhdaralmaale.space | 17/17 | honeypot overflow fixed |
| aldawaran.online | 17/17 | header flex overflow fixed; primary AA |
| alphadriver.space | 17/17 | html RTL |
| alresha-academy.space | 17/17 | RTL + FAQ `.me79` + purple CTA white |
| counterattack.space | 17/17 | RTL |
| croquet-eg.space | 17/17 | cookie `.od41`; teal primary AA |
| driftpromotion.space | 17/17 | honeypot; link-style hero CTAs OK |
| equestrian-care.com | 17/17 | |
| equestrian-club.com | 17/17 | RTL |
| equestrian-trail.space | 17/17 | |
| haraka-risha.space | 17/17 | outline hover colors |
| liberodefense.space | 17/17 | hero `.h82`, cookie `.ida5d`, palette |
| malaabtfaradi.info | 17/17 | |
| masmaralsuraa.com | 17/17 | honeypot + mobile CTA |
| melabalnzilaq.space | 17/17 | grey palette + CTA contrast |
| nileacademy.space | 17/17 | accent CTA colors restored |
| nilstable.space | 17/17 | |
| powerserve.com | 17/17 | RTL |
| racketpro.com | 17/17 | |
| rimalshataa.space | 17/17 | |
| shams-table.space | 17/17 | |
| strategy-hoop.space | 17/17 | |
| tritonkart.eg | 17/17 | honeypot + secondary CTA |
| voltennisacademy.com | 17/17 | RTL |

## Button contrast — final

**unique_btn_fails = 0**, **page_fails = 0** (full Playwright re-scan after primary token darken on aldawaran + croquet).

## Layout / overflow — final

**visual `page_fails` = 0** (425/425 @1280 + mobile spots).  
**RTL overflow**: all sites `homeSW == clientW`, `contact_overflow: null`.

## Artifacts

- `_qa-inventory.json` — pages + CTA matrix  
- `_qa-static-risks.json` — pre-scan hover gaps  
- `_qa-contrast-results.json` — CDP contrast (final clean)  
- `_qa-visual-results.json` — layout probes  
- `_qa-rtl-overflow.json` — RTL + contact overflow re-scan  
- `_qa_contrast_scan_v2.py`, `_qa_visual_scan.py`, `_qa_rtl_overflow.py` — scanners  
