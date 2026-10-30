#!/usr/bin/env python3
"""Static CSS scan: solid/outline CTA-like rules missing :hover color."""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _common import discover_sites, write_json

RULE_RE = re.compile(r"(?ms)(^|\n)([^{}@/][^{]*)\{([^{}]*)\}")

SOLID_BG = re.compile(
    r"background(?:-color)?\s*:\s*(?!transparent|none)([^;]+)",
    re.I,
)
TRANSPARENT_BG = re.compile(
    r"background(?:-color)?\s*:\s*(transparent|none)\b",
    re.I,
)
HAS_BORDER = re.compile(r"border(?:-color|-width|-style|)\s*:", re.I)
HAS_PADDING = re.compile(r"padding(?:-top|-bottom)?\s*:", re.I)
INLINE_BTN = re.compile(r"display\s*:\s*inline-(?:block|flex)\b", re.I)
CTA_CLASS = re.compile(
    r"(?:^|[-_])(?:btn|cta|submit|cookie|mobile-cta)(?:$|[-_])|btn-|cta-|cookie|mobile-cta|services-cta",
    re.I,
)
# Section-ish names even if they contain "cta"
SECTIONISH = re.compile(
    r"(?:band|box|section|panel|wrap|area|hero|banner|block|card)(?:$|[-_])",
    re.I,
)
# Solid CTA fills: accent/primary (exclude -light decorative fills)
ACCENT_VAR = re.compile(
    r"var\(\s*--(?:color-)?(?:accent|primary|green|brand)(?:-hover|-dark)?\s*\)",
    re.I,
)
ACCENT_LIGHT_ONLY = re.compile(
    r"var\(\s*--(?:color-)?(?:accent|primary|green|brand)-light\s*\)",
    re.I,
)
DECORATIVE_SURFACE = re.compile(
    r"var\(\s*--(?:surface|card|color-bg|bg-|ink)",
    re.I,
)
ON_ACCENT_COLOR = re.compile(
    r"(?:var\(\s*--(?:color-)?(?:text-)?on-accent[^)]*\)|#fff(?:fff)?\b|white\b)",
    re.I,
)
# Large section padding: clamp starting at ≥1.5rem or padding: Nrem with N≥1.5 alone
LARGE_PAD = re.compile(
    r"padding(?:-top|-bottom)?\s*:\s*(?:clamp\(\s*1\.[5-9]|clamp\(\s*[2-9]|[2-9](?:\.\d+)?rem\b|1\.[5-9]\d*rem\b)",
    re.I,
)


def strip_comments(css: str) -> str:
    return re.sub(r"/\*.*?\*/", "", css, flags=re.S)


def simple_class_selectors(selector: str) -> list[tuple[str, bool, str]]:
    out = []
    for part in selector.split(","):
        part = part.strip()
        if not part or "@" in part:
            continue
        if any(c in part for c in " >+~"):
            continue
        m2 = re.search(r"\.([a-zA-Z_][\w-]*)(:hover)?\s*$", part)
        if not m2:
            continue
        if re.search(r"\s", part):
            continue
        out.append((m2.group(1), bool(m2.group(2)), part))
    return out


def is_decorative_bg(bg: str) -> bool:
    if DECORATIVE_SURFACE.search(bg) and not ACCENT_VAR.search(bg):
        return True
    if "radial-gradient" in bg.lower() and "transparent" in bg.lower():
        if not ACCENT_VAR.search(bg):
            return True
    return False


def is_buttonish(body: str, cls: str, color: str | None) -> bool:
    """True only for compact CTA-like controls, not section bands."""
    if SECTIONISH.search(cls) and not INLINE_BTN.search(body):
        return False
    if LARGE_PAD.search(body) and not INLINE_BTN.search(body):
        return False
    if INLINE_BTN.search(body):
        return True
    # CTA-named compact control with on-accent text
    if CTA_CLASS.search(cls) and color and ON_ACCENT_COLOR.search(color):
        return True
    return False


def analyze_css(css: str, site: str) -> list[dict]:
    css = strip_comments(css)
    defaults: dict[str, dict] = {}
    hovers: dict[str, dict] = {}

    for m in RULE_RE.finditer(css):
        sel, body = m.group(2).strip(), m.group(3)
        for cls, is_hover, raw in simple_class_selectors(sel):
            sb = SOLID_BG.search(body)
            bg = sb.group(1).strip() if sb else None
            if TRANSPARENT_BG.search(body):
                bg = "transparent"
            cm = re.search(
                r"(?<!background-)(?<!border-)(?<!outline-)color\s*:\s*([^;]+)",
                body,
                re.I,
            )
            color = cm.group(1).strip() if cm else None
            entry = {
                "selector": raw,
                "bg": bg,
                "color": color,
                "body": body,
                "has_border": bool(HAS_BORDER.search(body)),
                "has_padding": bool(HAS_PADDING.search(body)),
                "has_color": color is not None,
            }
            if is_hover:
                hovers[cls] = entry
            else:
                defaults[cls] = entry

    risks = []
    for cls, d in defaults.items():
        bg = d.get("bg")
        if not bg or not d["has_padding"]:
            continue
        ctaish = bool(CTA_CLASS.search(cls))
        body = d.get("body") or ""

        if bg != "transparent" and is_decorative_bg(bg) and not ctaish:
            continue

        # Skip light-only fills (badges / soft chips) unless CTA class + buttonish
        light_only = bool(ACCENT_LIGHT_ONLY.search(bg)) and not ACCENT_VAR.search(bg)

        solid = bg != "transparent" and (
            bool(ACCENT_VAR.search(bg)) or (ctaish and not light_only)
        )
        if light_only and not (ctaish and is_buttonish(body, cls, d.get("color"))):
            solid = False

        # Solid must look like a button (plan: skip non-CTA padding/sections)
        if solid and not is_buttonish(body, cls, d.get("color")):
            solid = False
        # Prefer real solid CTAs that set on-accent/white (skip tinted chips)
        if solid and d.get("color") and not ON_ACCENT_COLOR.search(d["color"]):
            if not ctaish:
                solid = False

        outline = (
            bg == "transparent"
            and d["has_border"]
            and is_buttonish(body, cls, d.get("color"))
            and (ctaish or (d.get("color") and ACCENT_VAR.search(d["color"])))
        )
        if not solid and not outline:
            continue

        h = hovers.get(cls)
        issues = []
        if solid and h is None:
            issues.append("solid_missing_hover_rule")
        elif solid and h is not None and not h["has_color"]:
            issues.append("solid_hover_missing_color")
        if outline and h is None:
            issues.append("outline_missing_hover_rule")
        elif outline and h is not None and not h["has_color"]:
            issues.append("outline_hover_inherits_a_hover_color")
        if not issues:
            continue

        cohort = "semantic" if ctaish else "obfuscated"
        risks.append(
            {
                "site": site,
                "cohort": cohort,
                "class": cls,
                "issues": ";".join(issues),
                "defaultBg": bg,
                "defaultColor": d.get("color"),
                "hoverBg": (h.get("bg") if h else None),
                "hoverColor": (h.get("color") if h else None),
                "hoverTextDec": None,
            }
        )
    return risks


def main() -> None:
    ap = argparse.ArgumentParser(description="Static hover risk scan for landing batch CSS")
    ap.add_argument("--batch", required=True, type=Path)
    args = ap.parse_args()
    batch = args.batch.resolve()
    sites = discover_sites(batch)
    all_risks = []
    for s in sites:
        css_path = batch / s["site"] / "public" / "assets" / "css" / "style.css"
        if not css_path.exists():
            continue
        css = css_path.read_text(encoding="utf-8", errors="ignore")
        risks = analyze_css(css, s["site"])
        for r in risks:
            r["pageCount"] = len(s["pages"])
        all_risks.extend(risks)
        if risks:
            print(f"{s['site']}: {len(risks)} risks", flush=True)

    out = batch / "_qa-static-risks.json"
    write_json(out, all_risks)
    print(f"TOTAL_RISKS={len(all_risks)} wrote={out}")


if __name__ == "__main__":
    main()
