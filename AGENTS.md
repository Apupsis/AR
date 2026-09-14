# AGENTS.md — AR landing intake repo

This repository **receives** Arabic/RTL static landing batches from AR. It is **not** the site generator. There is no upstream template code here.

## Layout

```text
all/<DD-MM-YYYY>/<batch-name part-N>/<domain>/public/
  index.html          (~17 pages per site typical)
  assets/css/style.css
```

Partner language may be Russian («добивай» = finish to **zero** scan fails with evidence).

## What to edit

| Task | Where |
|------|--------|
| Button/page contrast, hover, RTL, `can_scroll_x` | Prefer CSS-only: `public/assets/css/style.css` |
| Domain rename, move into `public/`, sitemaps, slug emails | landing-domain-mapper skills / scripts |
| Generator token/honeypot/header prevention | Document only — generator is **outside** this repo |

Do **not** invent batch-local `_qa_*.py` scanners. Do **not** HTML-edit for color/overflow unless asked. Do **not** push, zip, or commit probe JSON unless asked.

## QA routing (pages & buttons)

Use Cursor skill **`auditing-landing-batch-pages-buttons`** (user skills dir):

```bash
SKILL=~/.cursor/skills/auditing-landing-batch-pages-buttons/scripts
# Windows: %USERPROFILE%\.cursor\skills\auditing-landing-batch-pages-buttons\scripts

python "$SKILL/run_batch_qa.py" --batch "/path/to/… part-1" --phase scan --workers 4
python "$SKILL/run_batch_qa.py" --batch "/path/to/… part-1" --phase final --workers 4
```

Phases: `scan` (fast visual spot) → fix CSS → `final` (full contrast + visual + rtl) until clean.

Project rules under `.cursor/rules/` add hard constraints; the skill owns commands and checklists.

## Done means

- Contrast `unique_btn_fails=0`
- Visual `page_fails=[]` (full mode on final)
- RTL / contact overflow clean
- `qa-*-report.md` synced to latest JSON when shipping a batch claim
