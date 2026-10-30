#!/usr/bin/env python3
"""Find horizontal overflow offenders on one site page (scrollWidth + out-of-viewport)."""
from __future__ import annotations

import argparse
import subprocess
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _common import free_port, write_json


def main() -> None:
    ap = argparse.ArgumentParser(description="Overflow offender probe for one page")
    ap.add_argument("--batch", required=True, type=Path)
    ap.add_argument("--site", required=True, help="Site folder name, e.g. aldawaran.info")
    ap.add_argument(
        "--path",
        default="/",
        help="URL path under public/ (default /). Examples: reach-us/, capabilities/",
    )
    ap.add_argument("--width", type=int, default=1280)
    args = ap.parse_args()

    batch = args.batch.resolve()
    public = batch / args.site / "public"
    if not (public / "index.html").exists():
        raise SystemExit(f"site public missing: {public}")

    path = args.path.strip() or "/"
    if not path.startswith("/"):
        path = "/" + path
    url_path = path if path.endswith("/") or path == "/" else path + "/"
    if url_path == "//":
        url_path = "/"

    po = free_port()
    proc = subprocess.Popen(
        [sys.executable, "-m", "http.server", str(po), "--bind", "127.0.0.1"],
        cwd=str(public),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    time.sleep(0.3)
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page(viewport={"width": args.width, "height": 800})
            page.goto(f"http://127.0.0.1:{po}{url_path}", wait_until="domcontentloaded", timeout=20000)
            page.wait_for_timeout(300)
            info = page.evaluate(
                """() => {
                  const html = document.documentElement;
                  const body = document.body;
                  html.scrollLeft = 80; body.scrollLeft = 80;
                  const canScrollX = html.scrollLeft > 0 || body.scrollLeft > 0;
                  html.scrollLeft = 0; body.scrollLeft = 0;
                  const cw = html.clientWidth;
                  const offenders = [];
                  for (const el of document.body.querySelectorAll('*')) {
                    const r = el.getBoundingClientRect();
                    const st = getComputedStyle(el);
                    const wide = el.scrollWidth > cw + 20;
                    const oob = r.right > cw + 1 || r.left < -1;
                    if (!wide && !oob) continue;
                    if (r.width < 1 && r.height < 1 && !wide) continue;
                    offenders.push({
                      tag: el.tagName,
                      id: el.id,
                      cls: String(el.className).slice(0, 100),
                      left: Math.round(r.left),
                      right: Math.round(r.right),
                      w: Math.round(r.width),
                      sw: el.scrollWidth,
                      cw: el.clientWidth,
                      pos: st.position,
                      transform: st.transform.slice(0, 60),
                      overflow: st.overflow + '/' + st.overflowX,
                      reason: wide && oob ? 'wide+oob' : (wide ? 'wide' : 'oob')
                    });
                  }
                  offenders.sort((a, b) => {
                    const score = (o) => Math.max(Math.abs(o.left), Math.abs(o.right - cw), o.sw - cw);
                    return score(b) - score(a);
                  });
                  return {
                    canScrollX,
                    docSW: html.scrollWidth,
                    bodySW: body.scrollWidth,
                    clientW: cw,
                    htmlOverflowX: getComputedStyle(html).overflowX,
                    bodyOverflowX: getComputedStyle(body).overflowX,
                    offenders: offenders.slice(0, 25)
                  };
                }"""
            )
            browser.close()
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=2)
        except Exception:
            proc.kill()

    out = {
        "site": args.site,
        "path": url_path,
        "viewport": args.width,
        **info,
    }
    out_path = batch / "_qa-overflow-probe.json"
    write_json(out_path, out)
    print(
        f"{args.site}{url_path} canScrollX={info['canScrollX']} "
        f"docSW={info['docSW']} bodySW={info['bodySW']} offenders={len(info['offenders'])}"
    )
    for o in info["offenders"][:10]:
        print(
            f"  [{o['reason']}] .{o['cls'][:40] or o['tag']} "
            f"L={o['left']} R={o['right']} sw={o['sw']} pos={o['pos']}"
        )
    print(f"WROTE {out_path}")


if __name__ == "__main__":
    main()
