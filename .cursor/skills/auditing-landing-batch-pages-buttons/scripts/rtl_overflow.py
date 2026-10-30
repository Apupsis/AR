#!/usr/bin/env python3
"""RTL direction + contact-page horizontal overflow probe for a landing batch."""
from __future__ import annotations

import subprocess
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _common import free_port, parse_batch_arg, write_json

CONTACT_CANDIDATES = (
    "reach-us/",
    "support/",
    "help/",
    "get-started/",
    "say-hello/",
    "message-us/",
    "contact/",
    "feedback/",
)


def main() -> None:
    batch = parse_batch_arg()
    results = []
    site_dirs = sorted(
        d
        for d in batch.iterdir()
        if d.is_dir() and not d.name.startswith("_") and not d.name.startswith(".")
        and (d / "public" / "index.html").exists()
    )

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        for site_dir in site_dirs:
            public = site_dir / "public"
            po = free_port()
            proc = subprocess.Popen(
                [sys.executable, "-m", "http.server", str(po), "--bind", "127.0.0.1"],
                cwd=str(public),
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
            time.sleep(0.25)
            try:
                page.goto(f"http://127.0.0.1:{po}/", wait_until="domcontentloaded", timeout=15000)
                page.wait_for_timeout(100)
                home = page.evaluate(
                    """() => {
                  const h = document.documentElement;
                  const b = document.body;
                  return {
                    htmlDir: getComputedStyle(h).direction,
                    bodyDir: getComputedStyle(b).direction,
                    htmlSW: h.scrollWidth,
                    bodySW: b.scrollWidth,
                    clientW: h.clientWidth,
                  };
                }"""
                )
                contact_overflow = None
                for cand in CONTACT_CANDIDATES:
                    try:
                        resp = page.goto(
                            f"http://127.0.0.1:{po}/{cand}",
                            wait_until="domcontentloaded",
                            timeout=8000,
                        )
                    except Exception:
                        continue
                    if not resp or resp.status >= 400:
                        continue
                    probe = page.evaluate(
                        """() => {
                          const html = document.documentElement;
                          const body = document.body;
                          let maxRight = 0, maxLeft = 0, worst = null;
                          for (const el of document.body.querySelectorAll('*')) {
                            const r = el.getBoundingClientRect();
                            if (r.right > maxRight + 50) {
                              maxRight = r.right;
                              worst = {
                                tag: el.tagName, id: el.id,
                                cls: String(el.className).slice(0, 80),
                                right: Math.round(r.right), left: Math.round(r.left),
                                w: Math.round(r.width)
                              };
                            }
                            if (r.left < maxLeft - 50) maxLeft = r.left;
                          }
                          return {
                            htmlSW: html.scrollWidth,
                            bodySW: body.scrollWidth,
                            clientW: html.clientWidth,
                            maxRight: Math.round(maxRight),
                            maxLeft: Math.round(maxLeft),
                            worst
                          };
                        }"""
                    )
                    overflow = (
                        probe["htmlSW"] > probe["clientW"] + 2
                        or probe["bodySW"] > probe["clientW"] + 20
                        or probe["maxLeft"] < -100
                        or probe["maxRight"] > probe["clientW"] + 40
                    )
                    if overflow:
                        contact_overflow = {
                            "path": cand,
                            "sw": probe["htmlSW"],
                            "bodySW": probe["bodySW"],
                            "cause": {
                                "maxRight": probe["maxRight"],
                                "maxLeft": probe["maxLeft"],
                                "worst": probe["worst"],
                                "scrollW": probe["htmlSW"],
                            },
                        }
                        break
                results.append(
                    {"site": site_dir.name, "home": home, "contact_overflow": contact_overflow}
                )
                print(
                    site_dir.name,
                    "dir=",
                    home["htmlDir"],
                    "/",
                    home["bodyDir"],
                    "homeSW=",
                    home["htmlSW"],
                    "overflow=",
                    contact_overflow is not None,
                    flush=True,
                )
            finally:
                proc.terminate()
                try:
                    proc.wait(timeout=2)
                except Exception:
                    proc.kill()
        browser.close()

    path = batch / "_qa-rtl-overflow.json"
    write_json(path, results)
    print(f"WROTE {path}")


if __name__ == "__main__":
    main()
