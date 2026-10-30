#!/usr/bin/env python3
"""Probe computed default/hover styles for classes in _qa-contrast-results.json fails."""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _common import free_port, page_url, write_json


def main() -> None:
    ap = argparse.ArgumentParser(description="Probe FAIL CTA classes from contrast results")
    ap.add_argument("--batch", required=True, type=Path)
    ap.add_argument(
        "--results",
        type=Path,
        default=None,
        help="Path to _qa-contrast-results.json (default: BATCH/_qa-contrast-results.json)",
    )
    args = ap.parse_args()
    batch = args.batch.resolve()
    results_path = (args.results or (batch / "_qa-contrast-results.json")).resolve()
    if not results_path.exists():
        raise SystemExit(f"missing contrast results: {results_path}")

    data = json.loads(results_path.read_text(encoding="utf-8-sig"))
    fails = data.get("button_fail_unique") or []
    if not fails:
        print("no button_fail_unique entries — nothing to probe")
        write_json(batch / "_qa-fail-probe.json", [])
        return

    by: dict[str, set[str]] = {}
    for f in fails:
        cls = (f.get("class") or "").split()[0] if f.get("class") else ""
        if cls:
            by.setdefault(f["site"], set()).add(cls)

    out = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for site, classes in sorted(by.items()):
            public = batch / site / "public"
            if not public.exists():
                out.append({"site": site, "classes": {}, "missing": sorted(classes), "error": "no public/"})
                continue
            port = free_port()
            proc = subprocess.Popen(
                [sys.executable, "-m", "http.server", str(port), "--bind", "127.0.0.1"],
                cwd=str(public),
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
            time.sleep(0.3)
            page = browser.new_page(viewport={"width": 1280, "height": 800})
            try:
                pages = sorted(public.rglob("index.html"))
                found = {}
                for html in pages:
                    rel = str(html.relative_to(public)).replace("\\", "/")
                    try:
                        page.goto(page_url(port, rel), wait_until="domcontentloaded", timeout=15000)
                    except Exception:
                        continue
                    for cls in list(classes):
                        if cls in found:
                            continue
                        loc = page.locator(f".{cls}").first
                        if loc.count() == 0:
                            continue
                        try:
                            if not loc.is_visible(timeout=500):
                                continue
                        except Exception:
                            continue
                        info = loc.evaluate(
                            """e => {
                          const st = getComputedStyle(e);
                          return {
                            tag: e.tagName,
                            className: e.className,
                            color: st.color,
                            bg: st.backgroundColor,
                            bgImage: st.backgroundImage.slice(0,120),
                            text: (e.textContent||'').trim().replace(/\\s+/g,' ').slice(0,40)
                          };
                        }"""
                        )
                        loc.hover(force=True, timeout=1500)
                        page.wait_for_timeout(40)
                        hinfo = loc.evaluate(
                            """e => {
                          const st = getComputedStyle(e);
                          return {
                            color: st.color, bg: st.backgroundColor,
                            bgImage: st.backgroundImage.slice(0,120),
                            td: st.textDecorationLine || st.textDecoration
                          };
                        }"""
                        )
                        found[cls] = {"page": rel, "default": info, "hover": hinfo}
                        page.mouse.move(0, 0)
                    if len(found) == len(classes):
                        break
                out.append({"site": site, "classes": found, "missing": sorted(classes - set(found))})
                print(site, "found", len(found), "missing", sorted(classes - set(found)), flush=True)
            finally:
                proc.terminate()
                try:
                    proc.wait(timeout=2)
                except Exception:
                    proc.kill()
                page.close()
        browser.close()

    path = batch / "_qa-fail-probe.json"
    write_json(path, out)
    print(f"WROTE {path}")


if __name__ == "__main__":
    main()
