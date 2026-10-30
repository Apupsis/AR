#!/usr/bin/env python3
"""Visual/page-health QA: RTL, can_scroll_x, broken imgs @1280 + mobile spot."""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _common import (
    contact_rel_for_site,
    load_inventory,
    page_url,
    start_site_server,
    stop_proc,
    write_json,
)

JS = """() => {
  const html = document.documentElement;
  const body = document.body;
  html.scrollLeft = 80; body.scrollLeft = 80;
  const canScrollX = html.scrollLeft > 0 || body.scrollLeft > 0;
  html.scrollLeft = 0; body.scrollLeft = 0;
  const broken = Array.from(document.images)
    .filter(i => i.complete && i.naturalWidth === 0)
    .map(i => (i.currentSrc || i.src || '').slice(-80));
  return {
    bodyDir: getComputedStyle(body).direction,
    htmlDir: getComputedStyle(html).direction,
    lang: html.getAttribute('lang') || '',
    canScrollX,
    scrollWidth: html.scrollWidth,
    clientWidth: html.clientWidth,
    brokenImgs: broken.slice(0, 5),
    hasMain: !!document.querySelector('main, [role=main], header'),
  };
}"""


def pages_for_mode(site_pages: list[str], mode: str) -> list[str]:
    if mode == "full" or not site_pages:
        return list(site_pages)
    # spot: home + contact-like + mid page
    out = []
    home = "index.html" if "index.html" in site_pages else site_pages[0]
    out.append(home)
    contact = contact_rel_for_site(site_pages)
    if contact and contact not in out:
        out.append(contact)
    mid = site_pages[min(5, len(site_pages) - 1)]
    if mid not in out:
        out.append(mid)
    return out


def check_page(page, rel: str, port: int, viewport: int, name: str, fails: list) -> bool:
    """Returns True if page OK."""
    try:
        page.goto(page_url(port, rel), wait_until="domcontentloaded", timeout=20000)
        page.wait_for_timeout(80)
    except Exception as e:
        fails.append({"site": name, "page": rel, "viewport": viewport, "issue": f"load:{e}"})
        return False
    data = page.evaluate(JS)
    issues = []
    if data["bodyDir"] != "rtl":
        issues.append(f"body_dir:{data['bodyDir']}")
    if data["canScrollX"]:
        issues.append("can_scroll_x")
    if viewport == 1280:
        if data["brokenImgs"]:
            issues.append(f"broken_imgs:{len(data['brokenImgs'])}")
        if not data["hasMain"]:
            issues.append("missing_main_header")
    if issues:
        fails.append({"site": name, "page": rel, "viewport": viewport, "issue": ";".join(issues)})
        return False
    return True


def main() -> None:
    ap = argparse.ArgumentParser(description="Visual page-health scan")
    ap.add_argument("--batch", required=True, type=Path)
    ap.add_argument(
        "--mode",
        choices=("full", "spot"),
        default="full",
        help="full=all pages@1280; spot=home+contact+mid (faster)",
    )
    args = ap.parse_args()
    batch = args.batch.resolve()
    if not batch.is_dir():
        raise SystemExit(f"batch not found: {batch}")

    inv = load_inventory(batch)
    fails = []
    summary = []
    n = len(inv["sites"])

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for si, site in enumerate(inv["sites"]):
            name = site["site"]
            public = batch / name / "public"
            proc, port = start_site_server(public)
            site_fail = 0
            site_ok = 0
            try:
                context = browser.new_context(viewport={"width": 1280, "height": 800}, locale="ar")
                page = context.new_page()
                for rel in pages_for_mode(site["pages"], args.mode):
                    if check_page(page, rel, port, 1280, name, fails):
                        site_ok += 1
                    else:
                        site_fail += 1

                page.set_viewport_size({"width": 390, "height": 844})
                mobile_pages = [site["pages"][0], site["pages"][min(5, len(site["pages"]) - 1)]]
                for rel in mobile_pages:
                    if not check_page(page, rel, port, 390, name, fails):
                        site_fail += 1
                context.close()
            finally:
                stop_proc(proc)
            summary.append(
                {
                    "site": name,
                    "ok_pages_1280": site_ok,
                    "fail_entries": site_fail,
                    "mode": args.mode,
                }
            )
            print(f"[{si+1}/{n}] {name}: ok1280={site_ok} fails={site_fail} mode={args.mode}", flush=True)

        browser.close()

    out = {"page_fails": fails, "summary": summary, "mode": args.mode}
    path = batch / "_qa-visual-results.json"
    write_json(path, out)
    print(f"TOTAL_FAIL_ENTRIES={len(fails)} mode={args.mode} wrote={path}")


if __name__ == "__main__":
    main()
