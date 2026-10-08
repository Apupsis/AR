# QA Report: part-1 pages & buttons (2026-10-08)

Batch: `all/05-10-2026/30-AR-D (1) -part1-05-10-2026`  
Sites: **20** | Pages: **340** (17 × 20)

## Summary

| Check | Result |
|-------|--------|
| Pages load + body RTL | **340/340** PASS |
| Visual layout (1280 full + mobile spot) | **page_fails=[]** |
| Contact / RTL overflow | **20/20** `contact_overflow: null` |
| Static CSS hover risks (pre-scan) | **151** → patched via tokens + CTA hover |
| Button contrast default+hover (Playwright) | **unique_btn_fails=0** |
| Sites with zero button FAIL | **20/20** |

Evidence JSON: `_qa-contrast-results.json`, `_qa-visual-results.json`, `_qa-rtl-overflow.json`.

## Re-verify (full, sequential `--workers 1`)

Fresh `phase final` without `--from-fails`: full contrast on all pages + visual full (17×20 @1280) + rtl/contact.

| Pass | Result |
|------|--------|
| 1st re-verify | visual/rtl clean; **2** contrast fails — `aynalkhail.com` thank page `.eb23:hover` + `.a6a8.f6d6e8e5:hover` (global `a:hover` wash → same brown as fill) |
| After CSS | `a.eb23:hover` / `a.f6d6e8e5:hover { color:#fff; text-decoration:none }` |
| 2nd re-verify | **unique_btn_fails=0**, **page_fails=[]**, **contact_overflow_sites=0** |

## Fixes applied (CSS only, `public/assets/css/style.css`)

### Tokens (mid-tone primary → darker + white on-accent)
- **academy-grip / equine-care / faresalaman / pyramidequestrian / tableacademy**: amber `#d97706` → `#92400e`–`#b45309` / hover darker; on-accent `#ffffff`
- **elite-croquet / alqemma-sports**: cyan `#06b6d4` → `#0e7490` / `#155e75`
- **daqat-resha**: cyan `#22d3ee` → `#155e75` / `#164e63` (white-on-fill AA)
- **sharakaalmadrab**: `#0284c7` + gray on-accent → `#0369a1` / `#075985` + `#ffffff`
- **ribataldarbah**: pink `#ec4899` → `#be185d` / `#9d174d`
- **gripetrack**: purple `#a855f7` → `#7e22ce` / `#6b21a8`
- **gridstart / quwwa-risha**: indigo `#6366f1` → `#4f46e5` / `#4338ca` (was 4.47:1)
- **alhojoom**: `#a16207` → `#713f12` / `#422006`
- **ahlyvolley**: `#2563eb` → `#1d4ed8` / `#1e40af`
- **croquet-strategy / risha-aldars**: rose → `#be123c` / `#9f1239`
- **beach-signals**: `#7e22ce` → `#6b21a8` / `#581c87`
- **aynalkhail / malaeb-dqi**: ensured dark primary + white on-accent

### RTL (`html, body { direction: rtl }`)
- alqemma-sports, beach-signals, elite-croquet, equine-care, gripetrack (computed `body_dir` was LTR)

### Honeypot clip (beat inline `left:-9999`)
- ahlyvolley, croquet-strategy, daqat-resha, elite-croquet, faresalaman, malaeb-dqi, quwwa-risha, sharakaalmadrab, tableacademy

### CTA hover / contrast
- Solid fills: per-class `a.cls:hover { color:#fff; text-decoration:none }` to beat global `a:hover` wash + `solid_underline`
- Outline on dark bands: force `#ffffff` (alqemma / daqat / gripetrack / ribatal / elite)
- Outline on light bands: dark ink / darkened primary (croquet `.l3a`, quwwa `.ia477086`, FAQ links)
- Hardcoded amber fills (equine `.c8f2`, pyramid `.ab44738` / `.j85`) remapped to `var(--color-primary)` + white
- **Re-verify residual:** aynalkhail `.eb23` + `.f6d6e8e5` solid CTA hover white (thank page)

## Sites (re-verify counters)

| Site | Contrast | Visual ok1280 | Notes |
|------|----------|---------------|-------|
| academy-grip.com | 0 | 17 | amber AA + CTA hover |
| ahlyvolley.com | 0 | 17 | blue darken + honeypot |
| alhojoom.com | 0 | 17 | brown darken + hover |
| alqemma-sports.com | 0 | 17 | cyan AA + RTL + dark-band white |
| aynalkhail.com | 0 | 17 | CTA hover + thank `.eb23` / `.f6d6e8e5` |
| beach-signals.info | 0 | 17 | purple darken + RTL |
| croquet-strategy.com | 0 | 17 | rose AA + honeypot + `.l3a` |
| daqat-resha.com | 0 | 17 | cyan deep AA + honeypot |
| elite-croquet.com | 0 | 17 | cyan AA + RTL + honeypot |
| equine-care.com | 0 | 17 | amber AA + RTL |
| faresalaman.com | 0 | 17 | amber AA + honeypot |
| gridstart.com | 0 | 17 | indigo AA |
| gripetrack.com | 0 | 17 | purple AA + RTL |
| malaeb-dqi.eg | 0 | 17 | slate + honeypot |
| pyramidequestrian.eg | 0 | 17 | amber AA + fill overrides |
| quwwa-risha.com | 0 | 17 | indigo AA + honeypot |
| ribataldarbah.eg | 0 | 17 | pink AA + dark-band links |
| risha-aldars.com | 0 | 17 | rose AA + hover |
| sharakaalmadrab.com | 0 | 17 | blue AA + white on-accent + honeypot |
| tableacademy.eg | 0 | 17 | amber AA + honeypot |

## Final gate

**unique_btn_fails = 0**  
**visual page_fails = []** (full mode, 340/340 @1280 + mobile spots)  
**contact_overflow_sites = 0**
