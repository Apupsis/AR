# QA Report: part-2 pages & buttons (2026-09-14)

Batch: `all/08-09-2026/30-AR-D 08-09-2026 part-2`  
Sites: **5** | Pages: **85** (17 × 5)

## Summary

| Check | Result |
|-------|--------|
| Pages load + body RTL | **85/85** PASS |
| Visual layout (1280 + spot 390) | **85/85** PASS |
| Contact / RTL overflow | **5/5** clean (`contact_overflow` null / homeSW==clientW) |
| Static hover risks (pre-fix) | **8** found → patched where CTA-related |
| Button contrast default+hover | **0** unique FAIL |

## Fixes applied (`public/assets/css/style.css` only)

- **RTL**: `direction: rtl` on `html`/`body` (almohannada, backhand, darba, loob)
- **Primary AA**: darken mid-tone primaries + `--color-text-on-accent: #ffffff` (almohannada lime, backhand emerald, darba cyan)
- **Honeypot**: clip pattern (elite `.apex-honeypot`; inline `-9999` override on contact forms)
- **Targeted CTAs**: secondary `.p08`, outline `.md4`/`o7f`, solid underline hovers, header `.ca9` + flex overflow (almohannada)

## Sites

| Site | Pages | Notes |
|------|-------|-------|
| academy-almohannada.space | 17/17 | primary darken; header flex; honeypot |
| academy-backhand.space | 17/17 | primary darken; outline `.md4` |
| darba-pro.space | 17/17 | primary darken; solid CTA white |
| eliteendurance.space | 17/17 | honeypot; services-cta hover color |
| loob-elgezira.space | 17/17 | RTL; underline/outline CTA |

## Artifacts

- `_qa-inventory.json`, `_qa-static-risks.json`, `_qa-contrast-results.json`, `_qa-visual-results.json`, `_qa-rtl-overflow.json`
