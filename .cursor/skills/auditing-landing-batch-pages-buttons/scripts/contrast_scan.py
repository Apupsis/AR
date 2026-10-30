#!/usr/bin/env python3
"""Playwright CTA contrast scan (default + hover) for a landing batch."""
from __future__ import annotations

import argparse
import json
import re
import sys
import time
from concurrent.futures import ProcessPoolExecutor, as_completed
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _common import load_inventory, page_url, start_site_server, stop_proc, write_json

MIN_RATIO = 4.5

JS = r"""
() => {
  const parse = (s) => {
    const m = String(s).match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?/);
    if (!m) return null;
    return [+m[1], +m[2], +m[3], m[4] !== undefined ? +m[4] : 1];
  };
  const isVisible = (el) => {
    const st = getComputedStyle(el);
    if (st.display === 'none' || st.visibility === 'hidden' || Number(st.opacity) === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 2 && r.height > 2;
  };
  const looksCta = (el) => {
    const tag = el.tagName.toLowerCase();
    if (tag === 'button') return true;
    if (el.getAttribute('type') === 'submit') return true;
    const cls = (typeof el.className === 'string') ? el.className : '';
    if (/btn|cta|submit|cookie|mobile-cta/i.test(cls)) return true;
    const st = getComputedStyle(el);
    const bg = parse(st.backgroundColor);
    const hasGrad = st.backgroundImage && st.backgroundImage !== 'none';
    const pad = parseFloat(st.paddingTop) + parseFloat(st.paddingBottom);
    if (tag === 'a' && ((bg && bg[3] > 0.5) || hasGrad) && pad >= 8) return true;
    if (tag === 'a' && st.borderStyle !== 'none' && parseFloat(st.borderWidth) > 0 && pad >= 6) return true;
    return false;
  };
  const resolveBg = (el, st) => {
    const own = parse(st.backgroundColor);
    if (own && own[3] > 0.5) return { bg: st.backgroundColor, via: 'own', solid: true, grad: false };
    if (st.backgroundImage && st.backgroundImage !== 'none' && /gradient/i.test(st.backgroundImage)) {
      return { bg: st.backgroundImage, via: 'gradient', solid: true, grad: true, bgImage: st.backgroundImage };
    }
    let cur = el.parentElement;
    while (cur) {
      const cst = getComputedStyle(cur);
      const p = parse(cst.backgroundColor);
      if (p && p[3] > 0.5) return { bg: cst.backgroundColor, via: 'ancestor', solid: false, grad: false };
      if (cst.backgroundImage && cst.backgroundImage !== 'none' && /gradient/i.test(cst.backgroundImage)) {
        return { bg: cst.backgroundImage, via: 'ancestor-grad', solid: false, grad: true, bgImage: cst.backgroundImage };
      }
      cur = cur.parentElement;
    }
    return { bg: 'rgb(255,255,255)', via: 'fallback', solid: false, grad: false };
  };

  const nodes = Array.from(document.querySelectorAll('a, button, [type=submit], [role=button]'));
  const out = [];
  const seen = new Set();
  for (const el of nodes) {
    if (!looksCta(el) || !isVisible(el)) continue;
    const cls = (typeof el.className === 'string') ? el.className.trim() : '';
    const text = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60);
    const key = el.tagName + '|' + cls + '|' + text;
    if (seen.has(key)) continue;
    seen.add(key);
    const st = getComputedStyle(el);
    const resolved = resolveBg(el, st);
    out.push({
      tag: el.tagName.toLowerCase(),
      className: cls,
      text,
      color: st.color,
      background: resolved.bg,
      bgImage: resolved.bgImage || st.backgroundImage,
      solid: resolved.solid,
      grad: resolved.grad,
      textDecorationLine: st.textDecorationLine || st.textDecoration,
    });
  }
  return { ctas: out };
}
"""

HOVER_JS = r"""(sel) => {
  const el = document.querySelector(sel);
  if (!el) return null;
  const st = getComputedStyle(el);
  const parse = (s) => {
    const m = String(s).match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?/);
    if (!m) return null; return [+m[1], +m[2], +m[3], m[4] !== undefined ? +m[4] : 1];
  };
  let bg = st.backgroundColor; let grad = false; let bgImage = st.backgroundImage;
  const own = parse(bg);
  if (!(own && own[3] > 0.5)) {
    if (bgImage && bgImage !== 'none' && /gradient/i.test(bgImage)) { grad = true; bg = bgImage; }
    else {
      let cur = el.parentElement;
      while (cur) {
        const cst = getComputedStyle(cur);
        const p = parse(cst.backgroundColor);
        if (p && p[3] > 0.5) { bg = cst.backgroundColor; break; }
        cur = cur.parentElement;
      }
    }
  }
  return { color: st.color, background: bg, bgImage, grad, solid: !!(own && own[3] > 0.5) || grad,
    textDecorationLine: st.textDecorationLine || st.textDecoration };
}"""


def parse_rgb(s: str):
    if not s:
        return None
    m = re.match(r"rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)", s)
    if not m:
        return None
    r, g, b = float(m.group(1)), float(m.group(2)), float(m.group(3))
    a = float(m.group(4)) if m.group(4) is not None else 1.0
    if a <= 0.01:
        return None
    return (r, g, b, a)


def parse_gradient_first(bg_image: str):
    if not bg_image or bg_image == "none":
        return None
    m = re.search(r"rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)", bg_image)
    if not m:
        return None
    a = float(m.group(4)) if m.group(4) is not None else 1.0
    return (float(m.group(1)), float(m.group(2)), float(m.group(3)), a)


def rel_lum(rgb):
    def f(c):
        c = c / 255.0
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    return 0.2126 * f(rgb[0]) + 0.7152 * f(rgb[1]) + 0.0722 * f(rgb[2])


def contrast(fg, bg):
    if not fg or not bg:
        return None
    if fg[3] < 0.99:
        a = fg[3]
        fg = (fg[0] * a + bg[0] * (1 - a), fg[1] * a + bg[1] * (1 - a), fg[2] * a + bg[2] * (1 - a), 1.0)
    L1, L2 = rel_lum(fg), rel_lum(bg)
    lighter, darker = max(L1, L2), min(L1, L2)
    return (lighter + 0.05) / (darker + 0.05)


def ratio_for(cta):
    fg = parse_rgb(cta["color"])
    if cta.get("grad"):
        bg = parse_gradient_first(cta.get("bgImage") or cta.get("background") or "")
    else:
        bg = parse_rgb(cta["background"])
    return contrast(fg, bg)


def _scan_site(args: tuple) -> dict:
    """Worker: scan one site. args = (batch_str, site_dict, pages_per_site)."""
    from playwright.sync_api import sync_playwright

    batch_str, site, pages_per_site = args
    batch = Path(batch_str)
    name = site["site"]
    public = batch / name / "public"
    pages = list(site["pages"])
    if pages_per_site and pages_per_site > 0:
        pages = pages[:pages_per_site]

    fails = []
    site_btn = 0
    proc = None
    try:
        proc, port = start_site_server(public)
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(viewport={"width": 1280, "height": 800}, locale="ar")
            page = context.new_page()
            for rel in pages:
                try:
                    page.goto(page_url(port, rel), wait_until="domcontentloaded", timeout=20000)
                    page.wait_for_timeout(120)
                except Exception:
                    continue
                data = page.evaluate(JS)
                for cta in data["ctas"]:
                    ratio = ratio_for(cta)
                    if ratio is not None and ratio < MIN_RATIO:
                        fails.append(
                            {
                                "site": name,
                                "page": rel,
                                "state": "default",
                                "class": cta["className"],
                                "text": cta["text"],
                                "ratio": round(ratio, 2),
                                "color": cta["color"],
                                "bg": str(cta["background"])[:120],
                                "solid": cta["solid"],
                                "grad": cta["grad"],
                            }
                        )
                        site_btn += 1
                    try:
                        first = (cta["className"].split() or ["__none__"])[0]
                        if first == "__none__":
                            continue
                        loc = page.locator(f"{cta['tag']}.{first}").first
                        loc.hover(timeout=1500, force=True)
                        page.wait_for_timeout(40)
                        h = page.evaluate(HOVER_JS, f"{cta['tag']}.{first}")
                        if not h:
                            continue
                        hcta = {
                            "color": h["color"],
                            "background": h["background"],
                            "bgImage": h.get("bgImage"),
                            "grad": h.get("grad"),
                        }
                        hratio = ratio_for(hcta)
                        if hratio is not None and hratio < MIN_RATIO:
                            fails.append(
                                {
                                    "site": name,
                                    "page": rel,
                                    "state": "hover",
                                    "class": cta["className"],
                                    "text": cta["text"],
                                    "ratio": round(hratio, 2),
                                    "color": h["color"],
                                    "bg": str(h["background"])[:120],
                                    "solid": h.get("solid"),
                                    "grad": h.get("grad"),
                                }
                            )
                            site_btn += 1
                        if h.get("solid") and "underline" in (h.get("textDecorationLine") or ""):
                            fails.append(
                                {
                                    "site": name,
                                    "page": rel,
                                    "state": "hover",
                                    "class": cta["className"],
                                    "text": cta["text"],
                                    "issue": "solid_underline",
                                    "ratio": round(hratio, 2) if hratio else None,
                                }
                            )
                            site_btn += 1
                    except Exception:
                        pass
                try:
                    page.mouse.move(0, 0)
                except Exception:
                    pass
            context.close()
            browser.close()
    finally:
        stop_proc(proc)

    return {"site": name, "fails": fails, "btn_fails": site_btn}


def _uniq_fails(fails: list) -> list:
    uniq = {}
    for f in fails:
        key = (f["site"], f.get("class"), f["state"], f.get("issue", "contrast"))
        if key not in uniq:
            uniq[key] = dict(f)
            uniq[key]["pages"] = [f["page"]]
        else:
            if f["page"] not in uniq[key]["pages"]:
                uniq[key]["pages"].append(f["page"])
    return list(uniq.values())


def main() -> None:
    ap = argparse.ArgumentParser(description="CTA contrast scan (default + hover)")
    ap.add_argument("--batch", required=True, type=Path)
    ap.add_argument("--sites", default="", help="Comma-separated site folder names")
    ap.add_argument("--from-fails", action="store_true")
    ap.add_argument("--pages-per-site", type=int, default=0)
    ap.add_argument("--workers", type=int, default=4, help="Parallel site workers (1=serial)")
    ap.add_argument("--out", type=Path, default=None)
    args = ap.parse_args()
    batch = args.batch.resolve()
    if not batch.is_dir():
        raise SystemExit(f"batch not found: {batch}")

    inv = load_inventory(batch)
    by_name = {s["site"]: s for s in inv["sites"]}
    selected = list(inv["sites"])
    targeted = False

    if args.from_fails:
        targeted = True
        results_path = batch / "_qa-contrast-results.json"
        if not results_path.exists():
            raise SystemExit(f"missing {results_path} for --from-fails")
        prev = json.loads(results_path.read_text(encoding="utf-8-sig"))
        names = sorted({f["site"] for f in prev.get("button_fail_unique") or []})
        if not names:
            print("no button_fail_unique — nothing to rescan")
            out_path = args.out or (batch / "_qa-contrast-targeted.json")
            write_json(
                out_path,
                {
                    "min_ratio": MIN_RATIO,
                    "button_fail_instances": 0,
                    "button_fail_unique": [],
                    "summary": [],
                    "targeted": True,
                    "sites": [],
                },
            )
            print(f"unique_btn_fails=0 wrote={out_path}")
            return
        missing = [n for n in names if n not in by_name]
        if missing:
            raise SystemExit(f"sites from fails not in inventory: {missing}")
        selected = [by_name[n] for n in names]

    if args.sites.strip():
        targeted = True
        names = [x.strip() for x in args.sites.split(",") if x.strip()]
        missing = [n for n in names if n not in by_name]
        if missing:
            raise SystemExit(f"unknown --sites: {missing}")
        selected = [by_name[n] for n in names]

    workers = max(1, int(args.workers or 1))
    work = [(str(batch), site, args.pages_per_site) for site in selected]
    n = len(selected)
    fails: list = []
    summary: list = []
    t0 = time.perf_counter()

    if workers == 1 or n <= 1:
        for i, w in enumerate(work):
            r = _scan_site(w)
            fails.extend(r["fails"])
            summary.append({"site": r["site"], "btn_fails": r["btn_fails"]})
            print(f"[{i+1}/{n}] {r['site']}: btn_fail={r['btn_fails']}", flush=True)
    else:
        done = 0
        with ProcessPoolExecutor(max_workers=min(workers, n)) as ex:
            futs = {ex.submit(_scan_site, w): w[1]["site"] for w in work}
            for fut in as_completed(futs):
                r = fut.result()
                fails.extend(r["fails"])
                summary.append({"site": r["site"], "btn_fails": r["btn_fails"]})
                done += 1
                print(f"[{done}/{n}] {r['site']}: btn_fail={r['btn_fails']}", flush=True)

    # stable summary order
    order = {s["site"]: i for i, s in enumerate(selected)}
    summary.sort(key=lambda x: order.get(x["site"], 999))

    uniq = _uniq_fails(fails)
    out = {
        "min_ratio": MIN_RATIO,
        "button_fail_instances": len(fails),
        "button_fail_unique": uniq,
        "summary": summary,
        "targeted": targeted,
        "sites": [s["site"] for s in selected],
        "workers": workers,
        "elapsed_s": round(time.perf_counter() - t0, 2),
    }
    if args.out:
        path = args.out if args.out.is_absolute() else batch / args.out
    elif targeted:
        path = batch / "_qa-contrast-targeted.json"
    else:
        path = batch / "_qa-contrast-results.json"
    write_json(path, out)
    print(f"unique_btn_fails={len(uniq)} workers={workers} elapsed_s={out['elapsed_s']} wrote={path}")


if __name__ == "__main__":
    main()
