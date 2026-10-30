---
name: auditing-landing-batch-pages-buttons
description: >-
  Use when QA'ing Arabic/RTL landing batches for page display and button
  default/hover contrast; when Playwright reports CTA fails, can_scroll_x,
  honeypot overflow, or mid-tone accent text; when partner says добивай/fix
  buttons/pages on part-1/part-2 with many public/ sites; before claiming batch
  QA done or shipping blanket accent CSS.
---

# Auditing landing-batch pages & buttons

## Overview

Multi-site landing QA: **inventory → static hover risk → Playwright contrast (default+hover) → visual/RTL → CSS-only fixes → re-scan to zero**. Evidence beats vibes.

Edit only `public/assets/css/style.css` per site (no HTML unless asked).

Project skill (canonical copy in this repo): `.cursor/skills/auditing-landing-batch-pages-buttons/`.

## When to use

- Batches like `NN-AR-D … part-1/part-2` with many `*/public/` (~17 pages each)
- CTA hover washed by global `a:hover`; solid CTAs fail AA on mid-tone teal/purple/green
- `can_scroll_x`, huge contact `scrollWidth`, honeypot `left:-9999`
- Urge to force `#fff` on all accent/base CTA rules or ship with leftover fails

## Tools (use these — do not reinvent)

Scripts: `.cursor/skills/auditing-landing-batch-pages-buttons/scripts/` (needs `playwright` + Chromium). Prefer the entrypoint.

One-time setup from the repo root:

```bash
pip install -r .cursor/skills/auditing-landing-batch-pages-buttons/requirements.txt
playwright install chromium
```

```bash
SKILL=.cursor/skills/auditing-landing-batch-pages-buttons/scripts
BATCH="all/…/… part-1"

# Full pipeline (inventory+static+contrast+visual+rtl). --workers default 4.
python "$SKILL/run_batch_qa.py" --batch "$BATCH" --phase all --workers 4

# Fast triage (visual spot only): home + contact + mid
python "$SKILL/run_batch_qa.py" --batch "$BATCH" --phase scan --workers 4

# After CSS fixes: full contrast + visual full + rtl
python "$SKILL/run_batch_qa.py" --batch "$BATCH" --phase final --workers 4 --from-fails

# Diagnostics
python "$SKILL/fail_probe.py" --batch "$BATCH"
python "$SKILL/overflow_probe.py" --batch "$BATCH" --site SITE --path /
python "$SKILL/contrast_scan.py" --batch "$BATCH" --sites "a.com,b.com" --pages-per-site 4
```

Windows, from the repo root (`d:\AR`):

```powershell
python .cursor\skills\auditing-landing-batch-pages-buttons\scripts\run_batch_qa.py --batch "..." --phase scan --workers 4
```

Details: each script `--help`.

**Do not** invent batch `_qa_*.py`. Artifacts may stay in batch; **no git commit** unless asked.

## Pipeline

1. `run_batch_qa.py --phase scan|all` (or `final` after fixes)
2. If fails: probe / `--from-fails` → root-cause CSS
3. Re-run `--phase final` until done-checklist passes
4. Sync `qa-buttons-pages-report.md` to latest JSON

## Contrast

| Do | Don't |
|----|--------|
| Per **solid** CTA (`primary` fill): `#fff` + **darken fills** | `.baseCta { color:#fff !important }` on **all** variants |
| Outline/ghost: keep ink/accent; set hover `color` only | White on still-light primary (~3.5–4.4:1) |
| Flip `--color-text-on-accent` only with darker primary | Claim done with unique fails left |

## Overflow

| Do | Don't |
|----|--------|
| Flex `min-width:0`, gaps, honeypot **clip** | Only `overflow-x: hidden` / delete fail |
| Confirm closed drawer + `.is-open` | `left: -9999` honeypots |

## Prevention (next batches / generator — no generator edits here)

- Mid-tone primary (`#059669`, `#0891b2`, `#65a30d`) + dark on-accent → darker primary + white
- Honeypot: clip-pattern, not `left:-9999`
- Header flex: `min-width:0`, `max-width: min(1440px, 100%)`

## Done-checklist

- [ ] `unique_btn_fails=0` (`_qa-contrast-results.json`)
- [ ] visual `page_fails=[]` (full mode)
- [ ] rtl/contact overflow clean
- [ ] report synced to latest JSON
- [ ] JSON probes not committed unless asked

## Related skills

Not substitutes for this QA: `prepare-landing-batch`, `landing-cleanup`, `fix-domain-in-pages`, `generate-sitemap` / `audit-sitemaps`, `audit-ar-localization`.

## Rationalizations

| Excuse | Reality |
|--------|---------|
| Force white on base CTA class | Breaks outline variants |
| overflow-x:hidden = fixed | Masks; CTA stays clipped |
| Cap rounds / ship leftovers | «Добивай» = 0 + scan proof |
| Rewrite scanners in batch | Use `run_batch_qa.py` |
| Stale report OK | Must match latest JSON |

## Red flags — STOP

- HTML for color/overflow without ask
- Blanket `#fff !important` on shared base CTA classes
- Done while JSON has fails; `overflow-x:hidden` alone; skip hover/mobile
- Unbidden `_qa_*` commit; reinventing scanners
