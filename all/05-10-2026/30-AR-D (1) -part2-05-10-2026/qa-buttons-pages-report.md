# QA Report: part-2 pages & buttons (2026-10-08)

Batch: `all/05-10-2026/30-AR-D (1) -part2-05-10-2026`  
Sites: **10** | Pages: **170** (17 × 10)

## Summary

| Check | Result |
|-------|--------|
| Pages load + body RTL | **170/170** PASS |
| Visual layout (1280 full + mobile spot) | **page_fails=[]** |
| Contact / RTL overflow | **10/10** `contact_overflow: null` |
| Static CSS hover risks (pre-scan) | **60** → patched via CTA hover rules |
| Button contrast default+hover (Playwright) | **unique_btn_fails=0** |
| Sites with zero button FAIL | **10/10** |

Evidence JSON: `_qa-contrast-results.json`, `_qa-visual-results.json`, `_qa-rtl-overflow.json`.

## Re-verify (full, sequential `--workers 1`)

Fresh `phase final` without `--from-fails`: full contrast on all pages + visual full (17×10 @1280) + rtl/contact.

| Pass | Result |
|------|--------|
| 1st re-verify | visual/rtl clean; **1** contrast fail — `drivetable.space` `.k862e036:hover` (washed pink on solid) |
| After CSS | `a.k862e036:hover { color:#fff; text-decoration:none }` |
| 2nd re-verify | **unique_btn_fails=0**, **page_fails=[]**, **contact_overflow_sites=0** |

## Fixes applied (CSS only, `public/assets/css/style.css`)

### Tokens (mid-tone primary → darker + white on-accent)
- **apexride.space**: `#ea580c` → `#c2410c` / hover `#9a3412`; on-accent `#ffffff`
- **drivetable.space**: `#ec4899` → `#be185d` / hover `#9d174d`; on-accent `#ffffff`
- **equestrian-arena.space**: `#f97316` → `#c2410c` / hover `#9a3412`; on-accent `#ffffff`
- **labtime.space**: `#0284c7` → `#0369a1` / hover `#075985`; on-accent `#ffffff`
- **speed-track.space**: `#c084fc` → `#7e22ce` / hover `#6b21a8`; on-accent `#ffffff`

### RTL (`html, body { direction: rtl }`)
- alchampions, drivetable, roquet-mastery, starnet-volleyball (computed `body_dir` was LTR)

### Honeypot clip (beat inline `left:-9999`)
- alchampions, labtime, roquet-mastery, shaheen-sports, starnet-volleyball — `[aria-hidden][style*="-9999"]` clip pattern

### CTA hover / contrast
- Solid fills: per-class `a.cls:hover { color:#fff; text-decoration:none }` to beat global `a:hover` wash + `solid_underline`
- Outline/ghost on dark or light bands: site-specific ink colors (peach on dark equestrian, pink on dark drivetable, purple light on speed-track dark cards, etc.)
- Notable classes: elshams `.ifff1` / `.if5`, shaheen `.lf8da` / `.k1f8`, apexride `.c2e7` / `.j9c378`, roquet `.g3b` / `.jc3ea21c` / `.ib70f`, labtime inverted CTAs, FAQ/accordion readable text
- **Re-verify residual:** drivetable `.k862e036` solid CTA hover white
- **Targeted 2026-10-08 (alchampions / shaheen):** solid multi-class hover wash locks + shaheen outline `.p10cc4:hover` uses primary fill (not mid-tone `#d4845c`); fresh `contrast_scan --sites` → `unique_btn_fails=0`

## Sites (re-verify counters)

| Site | Contrast | Visual ok1280 | Notes |
|------|----------|---------------|-------|
| alchampions.space | 0 | 17 | RTL + honeypot + solid multi-class hover white (`.ab1af` / `.ae1afd`) |
| apexride.space | 0 | 17 | primary AA + outline/solid hover |
| drivetable.space | 0 | 17 | primary AA + RTL + `.k862e036` hover fix |
| elshams-training.space | 0 | 17 | sky CTA darken + outline hover |
| equestrian-arena.space | 0 | 17 | primary AA + FAQ/outline peach |
| labtime.space | 0 | 17 | primary AA + honeypot + solid CTA |
| roquet-mastery.space | 0 | 17 | RTL + honeypot + solid white hover |
| shaheen-sports.space | 0 | 17 | orange CTA AA + honeypot + `.m48e250`/`.e726c74` hover white; `.p10cc4:hover` fill primary |
| speed-track.space | 0 | 17 | purple primary AA + glass CTA |
| starnet-volleyball.space | 0 | 17 | RTL + honeypot + pink CTA hover |

## Final gate

**unique_btn_fails = 0**  
**visual page_fails = []** (full mode, 170/170 @1280 + mobile spots)  
**contact_overflow_sites = 0**
